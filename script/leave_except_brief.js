function initializePage(){

let leaveBriefData = JSON.parse(localStorage.getItem('leaveBrief'));

const columnNames = ['出勤狀態','出勤日期','員工編號','員工姓名','異常時數','處理時數']
const columnNumbers = 6 ;
const rowNumbers = 10;
let page=0;
let start;
let end;

setTimeout(displayLeaveBrief(page),4000);
function displayLeaveBrief(page){
    start = page*rowNumbers;
    end = start + rowNumbers;
    let sortLeaveBriefData = leaveBriefData.sort((a,b)=>{
        if (a['出勤狀態'] < b['出勤狀態']) return -1;
        if (a['出勤狀態'] > b['出勤狀態']) return 1;
        return new Date(b['出勤日期'])-new Date(a['出勤日期']);
    });

    let showLeaveBriefData = sortLeaveBriefData.slice(start,end);
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






















    
}
initializePage();