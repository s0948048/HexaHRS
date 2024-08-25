function initializePage(){
let getAttendance = JSON.parse(localStorage.getItem('attendance'));
let AttendanceColumn = ['Date','EmployeeID','Name','Position',
    'AttendanceDate','AttendanceStatus','AttendanceCondition',
    'ClockInTime','ClockOutTime']
let page = 0;
const pageNumbers = 15 ;
let colNumbers = 9;
var start;
var end;
const lastPage = document.getElementById('last');
const nextPage = document.getElementById('next');


//這裡是重要資料！
let attendanceData=[];
//因為薪資資料都在員工資料表裡所以設定欄位取值！
getAttendance.forEach(data=>{
    let individualAttendance = {};
    AttendanceColumn.forEach(column=>{
        individualAttendance[column] = data[column] || "none";
    });
    attendanceData.push(individualAttendance);
});
// console.log(attendanceData);

//所有出勤資料的變數 ==>  attendanceData

function displayAttendance(page){
    attendanceData.sort((a,b)=>{
        if (new Date(a.Date) > new Date(b.Date)) return -1;
        if (new Date(a.Date) < new Date(b.Date)) return 1;
        const statusCmp = a.AttendanceStatus.localeCompare(b.AttendanceStatus);
        if (statusCmp !== 0) return statusCmp;
        const positionCmp = b.Position.localeCompare(a.Position);
        if (positionCmp !== 0) return positionCmp;
        // return Number(b.id) - Number(a.id);
    })
    start = page*pageNumbers;
    end = start + pageNumbers;
    let thisPageAttendance = attendanceData.slice(start,end);

    thisPageAttendance.forEach((item,index)=>{
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${index+1}_col${i+1}`).innerHTML = "";
        }
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${index+1}_col${i+1}`).innerHTML = item[AttendanceColumn[i]];
        }
    })
    
    if (page == 0) {
        lastPage.style.color = 'gray';
        lastPage.style.setProperty('cursor', 'auto', 'important');
    }else {
        lastPage.style.color = 'black';
        lastPage.style.setProperty('cursor', 'pointer', 'important');
    }
    
    
    if (attendanceData.length <= end) {
        nextPage.style.color = 'gray';
        nextPage.style.setProperty('cursor', 'auto', 'important');
    }else {
        nextPage.style.color = 'black';
        nextPage.style.setProperty('cursor', 'pointer', 'important');
    }







}
displayAttendance(page);


lastPage.addEventListener('click',()=>{
    if(page == 0){return};
    page--;
    displayAttendance(page);
})
nextPage.addEventListener('click',()=>{
    if(attendanceData.length <= end){return};
    page++;
    displayAttendance(page);
})




let searchAtnNum = document.getElementById('search_atn_num');
let searchAtnName = document.getElementById('search_atn_name');
let searchAtnDate = document.getElementById('search_atn_date');
let searchAtnStatus = document.getElementById('search_atn_status');
let searchAtnCdn = document.getElementById('search_atn_cdn');
let searchAtnCkInStart = document.getElementById('search_atn_ck_in_start');
let searchAtnCkInEnd = document.getElementById('search_atn_ck_in_end');
let searchAtnCkOutStart = document.getElementById('search_atn_ck_out_start');
let searchAtnCkOutEnd = document.getElementById('search_atn_ck_out_end');

const popInput = [
    searchAtnNum,searchAtnName,searchAtnDate,searchAtnStatus,
    searchAtnCdn,searchAtnCkInStart,searchAtnCkInEnd,
    searchAtnCkOutStart, searchAtnCkOutEnd
];




//彈出視窗物件
const showPopUp = document.getElementById('atn_search_btn');
const popUpBox = document.getElementById('search_atn_popUp');
//彈出視窗內的按鈕
const submitForPop = document.getElementById('submit');
const resetForPop = document.getElementById('reset');
const cancelForPop = document.getElementById('cancel');

//顯示彈出視窗！
showPopUp.addEventListener('click',()=>{
    popUpClear();
    popUpBox.style.display = 'block';
})
//submit

//reset
resetForPop.addEventListener('click',()=>{
    popUpClear();
})
//cancel
cancelForPop.addEventListener('click',()=>{
    popUpClear();
    popUpBox.style.display = 'none';
})

//唉....加油孩子
function popUpClear(){
    popInput.forEach(item=>{item.value = '';})
}















}
initializePage();