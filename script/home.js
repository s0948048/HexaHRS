function initializeHomePage(){

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

fetch('announcement.html')
.then(Response=>Response.text())
//串接公告的資料
.then(data=>{
    
    //這部分對串接的資料先轉文字！  再轉相對應的HTML形式！
    const htmlParser = new DOMParser();
    const insertAnuData = htmlParser.parseFromString(data,'text/html');
    
    //找到要插入的東西（外來物）嗷嗷嗷
    const tbodyAnuShow = insertAnuData.querySelectorAll('tbody');
    //這裡是插入點（這頁的內容）嗷嗷嗷
    const anu_catch = document.getElementById('anu_catch');

    //我最多一次只能接6ㄍ！啊我要先清除她不然會爆掉，這也是tmd一個大坑。
    anu_catch.innerHTML = '';
    const maxCatchAnnounce = 6;
    tbodyAnuShow.forEach((item,index)=>{
        if(index<maxCatchAnnounce){
            const deletePart = item.querySelector('.anu_date');
            if(deletePart)deletePart.remove();
            anu_catch.innerHTML += item.outerHTML;
        }
    })
})
//彈出公告
const anu_catch = document.getElementById('anu_catch');
anu_catch.addEventListener('click',(event)=>{
    if(event.target.closest('tbody')){
        const tbodyid = event.target.closest('tbody').id;
        const anuPopUp = document.getElementById('pop_search');
        anuPopUp.style.display='block';
        showAnnounceDetail(tbodyid);
    }
})
//關閉公告
const anuPopUp_close = document.getElementById('check');
anuPopUp_close.addEventListener('click',()=>document.getElementById('pop_search').style.display='none');

//串接資料到彈出視窗
function showAnnounceDetail(anu_id){
    fetch('announce.html')
    .then(Response=>Response.text())
    .then(html=>{
        //取得HTML內容，解析成可讀取html物件。
        const htmlParser = new DOMParser();
        const anuHtmlData = htmlParser.parseFromString(html,'text/html');

        //找到特殊的tbody元素
        const tbodyAnuForeign = anuHtmlData.getElementById(anu_id);
        const tbodyAnuForeignName = tbodyAnuForeign.getElementById('')
        const tbodyAnuForeignDate = tbodyAnuForeign.getElementById('')
        const tbodyAnuForeignContent = tbodyAnuForeign.getElementById('')
        const AnuPopName = document.getElementById('anu_name');
        const AnuPopDate = document.getElementById('anu_date');
        const AnuPopContent = document.getElementById('announce_content');



        //找到插入點，這邊要找popUp的三個標籤。
        
        
        console.log(html);
        
        //
        
    })
};






}
initializeHomePage();
