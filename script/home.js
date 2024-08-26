function initializePage(){

// 先做跳轉預備，強邏輯後續處理
var next = document.getElementById('next_page');
next.addEventListener('click',()=>loadPage('announcement'));

var checkout_change = document.getElementById('checkout_change');
checkout_change.addEventListener('click',()=>loadPage('employee_data'));

var checkout_leave = document.getElementById('checkout_leave');
checkout_leave.addEventListener('click',()=>loadPage('leave_except_detail'));

var checkout_salary = document.getElementById('checkout_salary');
checkout_salary.addEventListener('click',()=>document.getElementById('calender').style.display = 'block');
    // .0. 監聽iframe傳來的訊息 .3. 特定訊息就關掉，可能會受到雜訊影響呦！ .w. //
    window.addEventListener('message',(event)=>{
        if (event.data === 'closeIframe') {
            document.getElementById('calender').style.display = 'none';
        }   
    })

var checkout_attendance = document.getElementById('checkout_attendance');
checkout_attendance.addEventListener('click',()=>loadPage('attendance'));

//-----------------------------------------------------------------------
//先做嵌入，再做公告彈出檢視，後續再做強處理。
//有這東西好方便== 不用那邊fetch，真的是差點發瘋。
var tbodyAnuShow = JSON.parse(localStorage.getItem('announcements'));
tbodyAnuShow.sort((a,b)=>new Date(b.date)-new Date(a.date));
const maxCatchAnnounce = 6;
const tbodyAnuPaste = document.getElementById('anu_catch');
tbodyAnuPaste.innerHTML="";
tbodyAnuShow.forEach((item,index)=>{
    if(index<maxCatchAnnounce){
        
        
        const tbodyAnuNode = document.createElement('tbody');
        tbodyAnuNode.id = item['id'];
        tbodyAnuNode.innerHTML=`<td>
            <img src="./src/icon.png" id="icon">
            <span>${item['title']}</span>
            </td>`;
        tbodyAnuPaste.innerHTML += tbodyAnuNode.outerHTML;
        
        
    }
})
//透過event事件取得ID！((ㄏㄏㄏㄏ ":D"))
// console.log('anu',anu_catch);
anu_catch.addEventListener('click',(event)=>{
    if(event.target.closest('tbody')){
        let tbodyid = event.target.closest('tbody').id;
        showAnnounceDetail(tbodyid);
        const anuPopUp = document.getElementById('pop_search');
        anuPopUp.style.display='block';
        
    }
})
//關閉公告
const anuPopUp_close = document.getElementById('check');
anuPopUp_close.addEventListener('click',()=>document.getElementById('pop_search').style.display='none');

//串接資料到彈出視窗
function showAnnounceDetail(anu_id){
        //找到特殊的tbody元素
        tbodyAnuShow.forEach((item,index)=>{
            if(item["id"]===anu_id){
                const AnuPoptitleGet = item['title'];
                const AnuPopDateGet = item['date'];
                const AnuPopContentGet = item['content'];
                const AnuPoptitleSet = document.getElementById('anu_name');
                const AnuPopDateSet = document.getElementById('anu_date');
                const AnuPopContentSet = document.getElementById('anu_content');
                AnuPoptitleSet.value = AnuPoptitleGet;
                AnuPopDateSet.value = AnuPopDateGet;
                AnuPopContentSet.innerText = AnuPopContentGet;
            }
        })
    }

//下方資訊面板數值計算
    //1.當月異動
let employeeData = JSON.parse(localStorage.getItem('employeeData'));
let currentDate = new Date();
let thisMonth = currentDate.getMonth();
let thisYear = currentDate.getFullYear();

let emploeeNewThisMonth = 0;
let terminNewThisMonth = 0;
employeeData.forEach(item=>{
    let itemEmply = new Date(item.DateEmployed);
    
    if(itemEmply.getMonth() === thisMonth && itemEmply.getFullYear() === thisYear){
        emploeeNewThisMonth++;
    }
    let itemTermin = new Date(item.DateTerminated);
    
    if(itemTermin.getMonth() === thisMonth && itemTermin.getFullYear() === thisYear){
        terminNewThisMonth++;
    }
})


    //2.假勤處理
document.getElementById('emply_people').innerHTML = emploeeNewThisMonth;
document.getElementById('termin_people').innerHTML = terminNewThisMonth;

let leaveDetail = JSON.parse(localStorage.getItem('leaveDetail'));
let Processing = '表單申請中';
let notApply = '尚未處理';

let ProcessingNumbers = 0;
let notApplyNumbers = 0;
leaveDetail.forEach(item=>{
    if(item.ProcessedStatus === Processing){
        ProcessingNumbers++;
    }
    if(item.ProcessedStatus === notApply){
        notApplyNumbers++;
    }
})
document.getElementById('leave_handling').innerHTML = ProcessingNumbers;
document.getElementById('leave_not_do').innerHTML = notApplyNumbers;


    //3.薪資計時器

//取得當月計薪日，確認使否工作天
const thisDay = new Date();
const IstheSalaryDayWorkDay = new Date(thisDay.getFullYear(),thisDay.getMonth(),10);
let thisMonthSalaryDay = returnWeekdaySalaryDate(IstheSalaryDayWorkDay);
let thisMonthSalaryDate = new Date(thisDay.getFullYear(),thisDay.getMonth(),thisMonthSalaryDay);
let leftDay = 0;
//若是已過本月計薪日，則以下月計薪日計算
if(thisDay.getDate()<=thisMonthSalaryDay){
    var salaryDate = thisMonthSalaryDate;
    leftDay = Math.ceil((salaryDate - thisDay)/(1000*60*60*24));
}else{
    let nextMonthSalaryDate = new Date(thisDay.getFullYear(),thisDay.getMonth()+1,10);
    let nextMonthSalaryDay = returnWeekdaySalaryDate(nextMonthSalaryDate);
    var salaryDate = new Date(thisDay.getFullYear(),thisDay.getMonth()+1,nextMonthSalaryDay);
    leftDay = Math.ceil((salaryDate - thisDay)/(1000*60*60*24));
}
document.getElementById('left_day').innerHTML = (leftDay);

//這個是在判斷是不是周末呦，可能要提前出帳！
function returnWeekdaySalaryDate(date){
    if(date.getDay() === 6){
        return date.getDate()-1;
    }else if(date.getDay() === 0){
        return date.getDate()-2;
    }else{
        return date.getDate();
    }
}
//發新日結果，並指派給HTML。
let salary_date = document.getElementById('salary_date');
salary_date.innerHTML = salaryDate.getDate();


    //4.考勤管理
//leaveDetail

//LeaveType = '忘記打卡';
let forGetCkNumbers = 0;
leaveDetail.forEach(item=>{
    if(item.LeaveType == '忘記打卡'){
        forGetCkNumbers++;
    }
});

//leaveBrief
let leaveBrief = JSON.parse(localStorage.getItem('leaveBrief'));
let atn_errorNumbers = 0;
//出勤狀態 = 有異常;
leaveBrief.forEach(item=>{
    if(item['出勤狀態'] == '有異常'){
        atn_errorNumbers++;
    }
});

document.getElementById('atn_error').innerHTML = atn_errorNumbers;
document.getElementById('mth_forget_ck').innerHTML = forGetCkNumbers;

















};
initializePage();
