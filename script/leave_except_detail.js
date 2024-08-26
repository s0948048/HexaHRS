function initializePage(){

let leaveDetailData = JSON.parse(sessionStorage.getItem('leaveDetail'));
let sortLeaveDetailData = leaveDetailData.sort((a,b)=>{
    if (a['ProcessedStatus'] < b['ProcessedStatus']) return -1;
    if (a['ProcessedStatus'] > b['ProcessedStatus']) return 1;
    return new Date(a['AttendanceDate'])-new Date(b['AttendanceDate']);
});

const columnNames = ['ProcessedStatus','AttendanceDate','ApplicationDetail','EmployeeID','EmployeeName',
    'LeaveType','MorningAnomaly','MorningLeaveProcessed','AfternoonAnomaly',
    'AfternoonLeaveProcessed','StartTime','ClockInTime','EndTime','ClockOutTime']
const columnNumbers = 14 ;
const rowNumbers = 9;
let page=0;
let start;
let end;

function displayLeaveDetail(page){
    start = page*rowNumbers;
    end = start + rowNumbers;
    

    showLeaveDetailData = sortLeaveDetailData.slice(start,end);
    showLeaveDetailData.forEach((element,index) => {
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
    if (leaveDetailData.length <= end) {
        nextPageButton.style.color = 'gray';
        nextPageButton.style.setProperty('cursor', 'auto', 'important');
    }else {
        nextPageButton.style.color = 'black';
        nextPageButton.style.setProperty('cursor', 'pointer', 'important');
    }
}
if(localStorage.getItem('storePages')){
    document.getElementById('see_except_brief').innerHTML = '返回異常簡要';
}





displayLeaveDetail(page);

let nextPage = document.getElementById('next');
let lastPage = document.getElementById('last');
nextPage.addEventListener('click',()=>{
    if(leaveDetailData.length<=end)return;
    page++;
    displayLeaveDetail(page);
})
lastPage.addEventListener('click',()=>{
    if(page==0)return;
    page--;
    displayLeaveDetail(page);
})

    
    

const popUpSearch = document.getElementById('pop_search_leave_data');
let searchLeave = document.getElementById('search_leave');
searchLeave.addEventListener('click',()=>{
    popUpSearch.style.display = 'block';
});
    

let leaveId = document.getElementById('leave_id');
let leaveType = document.getElementById('leave_type');
let leaveNoon = document.getElementById('leave_noon');
let leaveHandleCdn = document.getElementById('leave_handle_cdn');
let leaveDateStart = document.getElementById('leave_date_start');
let leaveDateEnd = document.getElementById('leave_date_end');
let leaveCkTimeStart = document.getElementById('leave_ck_time_start');
let leaveCkTimeEnd = document.getElementById('leave_ck_time_end');
const popUpInput = [
    leaveId,
    leaveType,
    leaveNoon,
    leaveHandleCdn,
    leaveDateStart,
    leaveDateEnd,
    leaveCkTimeStart,
    leaveCkTimeEnd
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