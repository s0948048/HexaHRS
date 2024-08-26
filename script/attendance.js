function initializePage(){
let getAttendance = JSON.parse(sessionStorage.getItem('attendance'));
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
let isSearch = false;

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

function displayAttendance(object,page){
    object.sort((a,b)=>{
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
    let thisPageAttendance = object.slice(start,end);
    tableClear();
    thisPageAttendance.forEach((item,index)=>{
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
displayAttendance(attendanceData,page);

lastPage.addEventListener('click',()=>{
    let searchData = JSON.parse(sessionStorage.getItem('SearchAttendanceResultData'));
    let attendanceData = JSON.parse(sessionStorage.getItem('attendance'));
    if(page == 0){return};
    page--;
    if(isSearch){
        displayAttendance(searchData,page);
    }else if (!isSearch){
        displayAttendance(attendanceData,page);
    }
})
nextPage.addEventListener('click',()=>{
    let attendanceData = JSON.parse(sessionStorage.getItem('attendance'));
    if(attendanceData.length <= end){return};
    let searchData = JSON.parse(sessionStorage.getItem('SearchAttendanceResultData'));
    page++;
    if(isSearch){
        displayAttendance(searchData,page);
    }else if (!isSearch){
        displayAttendance(attendanceData,page);
    }
})




let searchAtnId = document.getElementById('search_atn_num');
let searchAtnName = document.getElementById('search_atn_name');
let searchAtnDate = document.getElementById('search_atn_date');
let searchAtnStatus = document.getElementById('search_atn_status');
let searchAtnCdn = document.getElementById('search_atn_cdn');
let searchAtnCkIn = document.getElementById('search_atn_ck_in');
let searchAtnCkOut = document.getElementById('search_atn_ck_out');

const popInput = [
    searchAtnId,searchAtnName,searchAtnDate,searchAtnStatus,
    searchAtnCdn,searchAtnCkIn,searchAtnCkOut
];

let checkNA = searchAtnCkIn.value;

function searchAttendace(){
    new Promise((resolve,reject)=>{
        let filterData = attendanceData;
        resolve(filterData);
    })
    .then(data=>{
        if(searchAtnId.value){
            let filterResult = [];
            data.forEach(atnRecord=>{
                if(Number(atnRecord['EmployeeID']) === Number(searchAtnId.value)){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult)
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnName.value){
            let filterResult = [];
            let regex = new RegExp(searchAtnName.value);
            data.forEach(atnRecord=>{
                if(regex.test(atnRecord['Name'])){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult)
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnDate.value){
            let filterResult = [];
            let cmpDate = new Date(searchAtnDate.value);
            data.forEach(atnRecord=>{
                let atnDate = new Date(atnRecord['Date']);
                if(atnDate.getMonth() === cmpDate.getMonth() && atnDate.getDate() === cmpDate.getDate()){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnStatus.value){
            let filterResult = [];
            data.forEach(atnRecord=>{
                if(atnRecord['AttendanceStatus'] === searchAtnStatus.value){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnCdn.value){
            let filterResult=[];
            data.forEach(atnRecord=>{
                if(atnRecord['AttendanceCondition'] === searchAtnCdn.value){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnCkIn.checked){
            let filterResult=[];
            data.forEach(atnRecord=>{
                if(atnRecord['ClockInTime'] === checkNA){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        if(searchAtnCkOut.checked){
            let filterResult=[];
            data.forEach(atnRecord=>{
                if(atnRecord['ClockOutTime'] === checkNA){
                    filterResult.push(atnRecord);
                }
            })
            console.log(filterResult);
            return Promise.resolve(filterResult);
        }else return data;
    })
    .then(data=>{
        page = 0;
        isSearch = true;
        sessionStorage.setItem('SearchAttendanceResultData',JSON.stringify(data));
        return data;
    })
    .then(filterOut=>{
        let searchData = JSON.parse(sessionStorage.getItem('SearchAttendanceResultData'));
        console.log('sess',searchData);
        displayAttendance(searchData,page);
    })
    .finally(()=>popUpClear());

}
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
submitForPop.addEventListener('click',()=>{
    sessionStorage.removeItem('SearchAttendanceResultData');
    searchAttendace();
    popUpBox.style.display = 'none';
})
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
function tableClear(){
    for(let i = 0;i<colNumbers;i++){
        for(let j=0;j<pageNumbers;j++){
            document.getElementById(`row${j+1}_col${i+1}`).innerHTML = "";
        }
    }
}

}
initializePage();