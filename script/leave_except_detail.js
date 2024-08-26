function initializePage(){

let leaveDetailData = JSON.parse(sessionStorage.getItem('leaveDetail'));
let sortLeaveDetailData = leaveDetailData.sort((a,b)=>{
    if (a['ProcessedStatus'] < b['ProcessedStatus']) return -1;
    if (a['ProcessedStatus'] > b['ProcessedStatus']) return 1;
    return new Date(a['AttendanceDate'])-new Date(b['AttendanceDate']);
});

const columnNames = [
    'ProcessedStatus','AttendanceDate','ApplicationDetail','EmployeeID','EmployeeName',
    'LeaveType','MorningAnomaly','MorningLeaveProcessed','AfternoonAnomaly',
    'AfternoonLeaveProcessed','StartTime','ClockInTime','EndTime','ClockOutTime'
]
const columnNumbers = 14 ;
const rowNumbers = 9;
let page=0;
let start;
let end;
let isSearch = false;
let seePerson=[];

function displayLeaveDetail(object,page){
    start = page*rowNumbers;
    end = start + rowNumbers;
    

    showLeaveDetailData = object.slice(start,end);
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




if(localStorage.getItem('searchLeaveId')){
    page = 0;
    seePersonalData();
}else{
    page = 0;
    displayLeaveDetail(sortLeaveDetailData,page);
}





let nextPage = document.getElementById('next');
let lastPage = document.getElementById('last');
nextPage.addEventListener('click',()=>{
    if(leaveDetailData.length<=end)return;
    page++;
    let searchData = JSON.parse(sessionStorage.getItem('searchLeaveDetail'));
    if(isSearch){
        displayLeaveDetail(searchData,page);
    }else if (!isSearch){
        displayLeaveDetail(sortLeaveDetailData,page);
    }
})
lastPage.addEventListener('click',()=>{
    if(page==0)return;
    page--;
    let searchData = JSON.parse(sessionStorage.getItem('searchLeaveDetail'));
    if(isSearch){
        displayLeaveDetail(searchData,page);
    }else if (!isSearch){
        displayLeaveDetail(sortLeaveDetailData,page);
    }
})

    
function seePersonalData(){
    let getId = localStorage.getItem('searchLeaveId');
    let getDate = new Date(localStorage.getItem('searchLeaveDate'));
    let leaveDataList = JSON.parse(sessionStorage.getItem('leaveDetail'));
    leaveDataList.forEach(item=>{
        if(Number(item['EmployeeID']) === Number(getId) ){
            let cmpDate = new Date(item['AttendanceDate']);
            if(getDate.getMonth() == cmpDate.getMonth() && getDate.getDate() == cmpDate.getDate()){
                seePerson.push(item);
            }
        }
    })
    localStorage.removeItem('searchLeaveId');
    displayLeaveDetail(seePerson,page);
}
    

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

const popUpInput = [
    leaveId,
    leaveType,
    leaveNoon,
    leaveHandleCdn,
    leaveDateStart,
    leaveDateEnd
];
    

function searchLeaveDetail(){
    new Promise((resolve,reject)=>{
        let filter = leaveDetailData;
        resolve(filter);
    })
    .then(data=>{
        if(leaveId.value){
            let filterResult = [];
            data.forEach(leave=>{
                if(Number(leave['EmployeeID']) === Number(leaveId.value)){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveType.value){
            let filterResult = [];
            data.forEach(leave=>{
                if(leave['LeaveType'] === leaveType.value){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveType.value){
            let filterResult = [];
            data.forEach(leave=>{
                if(leave['LeaveType'] === leaveType.value){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveNoon.value){
            let filterResult = [];
            data.forEach(leave=>{
                if(leave['ApplicationDetail'] === leaveNoon.value){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveHandleCdn.value){
            let filterResult = [];
            data.forEach(leave=>{
                if(leave['ProcessedStatus'] === leaveHandleCdn.value){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveDateStart.value){
            let cmpDate = new Date(leaveDateStart.value);
            let filterResult = [];
            data.forEach(leave=>{
                let leaveDate = new Date(leave['AttendanceDate']);
                if(leaveDate >= cmpDate){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(leaveDateEnd.value){
            let cmpDate = new Date(leaveDateEnd.value);
            let filterResult = [];
            data.forEach(leave=>{
                let leaveDate = new Date(leave['AttendanceDate']);
                if(leaveDate >= cmpDate){
                    filterResult.push(leave);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then((data)=>{
        page = 0;
        isSearch = true;
        sessionStorage.setItem('searchLeaveDetail',JSON.stringify(data));
        tableClear();
        return data;
    })
    .then(finalData=>{
        let searchData = JSON.parse(sessionStorage.getItem('searchLeaveDetail'));
        displayLeaveDetail(searchData,page);
    })
    .finally(()=>clearPopUp());
}

function tableClear(){
    for(let j = 0;j<rowNumbers;j++){
        for(let i = 0;i<columnNumbers;i++){
            document.getElementById(`row${j+1}-col${i+1}`).innerHTML = '';
        }
    }
}



    
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
submitBtn.addEventListener('click',()=>{
    sessionStorage.removeItem('searchLeaveDetail');
    searchLeaveDetail();
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