function initializePage(){
let leaveStructure = JSON.parse(sessionStorage.getItem('leaveStructure'));
const columnNames = ['假別','天數','請假條件','增加假勤數量條件']
const columnNumbers = 4 ;


function displayLeaveStructure(){
    leaveStructure.forEach((element,index) => {
        for(let i = 0;i<columnNumbers;i++){
            document.getElementById(`row${index+1}_col${i+1}`).innerHTML = element[columnNames[i]]
        }
    });
}
displayLeaveStructure();











let seeLeaveStrPage = document.getElementById('see_leave_str');
let seeExceptBriefPage = document.getElementById('see_except_brief');
let seeExceptDetailPage = document.getElementById('see_except_detail');
seeLeaveStrPage.style.color = 'gray';
seeExceptBriefPage.addEventListener('click',()=>{
    loadPage('leave_except_brief');
})
seeExceptDetailPage.addEventListener('click',()=>{
    loadPage('leave_except_detail');
})





}
initializePage();