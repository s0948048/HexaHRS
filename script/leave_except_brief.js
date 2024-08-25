function initializePage(){

let leaveBriefData = JSON.parse(localStorage.getItem('leaveBrief'));
let sortLeaveBriefData = leaveBriefData.sort((a,b)=>{
    // if (a['出勤狀態'] < b['出勤狀態']) return -1;
    // if (a['出勤狀態'] > b['出勤狀態']) return 1;
    return new Date(a['出勤日期'])-new Date(b['出勤日期']);
});
const columnNames = ['出勤狀態','出勤日期','員工編號','員工姓名','異常時數','處理時數']
const columnNumbers = 6 ;
const rowNumbers = 10;
let page=0;
let start;
let end;


function displayLeaveBrief(page){
    start = page*rowNumbers;
    end = start + rowNumbers;
    

    showLeaveBriefData = sortLeaveBriefData.slice(start,end);
    showLeaveBriefData.forEach((element,index) => {
        for(let i = 0;i<columnNumbers;i++){
            document.getElementById(`row${index+1}-col${i+1}`).innerHTML = element[columnNames[i]];
        }
    });
        //翻頁按鈕~~~><
        const lastPageButton = document.getElementById('last');
        if (page == 0) {
            lastPageButton.style.color = 'gray';
            lastPageButton.style.setProperty('cursor', 'auto', 'important');
        }else {
            lastPageButton.style.color = 'black';
            lastPageButton.style.setProperty('cursor', 'pointer', 'important');
        }
        
        const nextPageButton = document.getElementById('next');
        if (leaveBriefData.length <= end) {
            nextPageButton.style.color = 'gray';
            nextPageButton.style.setProperty('cursor', 'auto', 'important');
        }else {
            nextPageButton.style.color = 'black';
            nextPageButton.style.setProperty('cursor', 'pointer', 'important');
        }
}
//跳轉查看詳細的邏輯
if(localStorage.getItem('storePages')){
    page = localStorage.getItem('storePages');
    displayLeaveBrief(page);
    localStorage.setItem('storePages',0);
}else{
    page = 0;
    displayLeaveBrief(page);
}

let nextPage = document.getElementById('next');
let lastPage = document.getElementById('last');
nextPage.addEventListener('click',()=>{
    if(leaveBriefData.length<=end)return;
    page++;
    displayLeaveBrief(page);
})
lastPage.addEventListener('click',()=>{
    if(page==0)return;
    page--;
    displayLeaveBrief(page);
})

//點擊table 查看詳細資料
let leaveBriefTable = document.getElementById('atn_except_table');
let getEmpId;
leaveBriefTable.addEventListener('click',(event)=>{
    if(event.target.closest('td')){
        let tdId = event.target.closest('td').id;
        getIdColumn = `${tdId.split('-')[0]}-col3`;
        getEmpId = document.getElementById(getIdColumn).innerHTML;
        console.log(getEmpId);
        localStorage.setItem('storePages',page);
        localStorage.setItem('searchLeaveId',getEmpId);
        loadPage('leave_except_detail');
    }
});


//popup
const popUpSearch = document.getElementById('pop_search_leave_data');
let searchLeave = document.getElementById('search_leave');
searchLeave.addEventListener('click',()=>{
    popUpSearch.style.display = 'block';
})


//POPUP的input物件
let leaveId = document.getElementById('leave_id');
let leaveHandleCdn = document.getElementById('leave_handle_cdn');
let leaveDateStart = document.getElementById('leave_date_start');
let leaveDateEnd = document.getElementById('leave_date_end');
const popUpInput = [
    leaveId,
    leaveHandleCdn,
    leaveDateStart,
    leaveDateEnd,
];
    
// submit
// reset
// button
let submitBtn = document.getElementById('submit');
let resetBtn = document.getElementById('reset');
let cancelBtn = document.getElementById('cancel');

resetBtn.addEventListener('click',()=>{
    clearPopUp();
})

cancelBtn.addEventListener('click',()=>{
    clearPopUp();
    popUpSearch.style.display = 'none';

})








function clearPopUp(){
    popUpInput.forEach(item=>{
        console.log(item);
        
        item.value='';
    })
}

let seeLeaveStrPage = document.getElementById('see_leave_str');
let seeExceptBriefPage = document.getElementById('see_except_brief');
let seeExceptDetailPage = document.getElementById('see_except_detail');
seeLeaveStrPage.addEventListener('click',()=>{
    loadPage('leave');
})
seeExceptBriefPage.addEventListener('click',()=>{
    loadPage('leave_except_brief');
})
seeExceptDetailPage.addEventListener('click',()=>{
    loadPage('leave_except_detail');
})


    
}
initializePage();