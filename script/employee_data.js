function initializePage(){
let getEmployee = JSON.parse(localStorage.getItem('employeeData'));
getEmployee.sort((a,b)=>{
    // if (a.EmploymentStatus-b.EmploymentStatus) return -1;
    // if (b.EmploymentStatus-a.EmploymentStatus) return 1;
  
    const cpm = a.EmploymentStatus.localeCompare(b.EmploymentStatus);
    if(!cpm == 0)return cpm;
    if(a.DateTerminated == 'none') return -1;
    return new Date(a.DateTerminated)- new Date(b.DateTerminated);
    // return Number(a.id) - Number(b.id);
})
let employeeColumn = ['id','name','sex','birthday',
    'position','EmploymentStatus','DateEmployed',
    'DateTerminated','Tenure','PrimarySupervisor','SecondarySupervisor']
let page = 0;
const pageNumbers = 15 ;
let colNumbers = 11 ;
var start;
var end;
const lastPage = document.getElementById('last');
const nextPage = document.getElementById('next');


//這裡是重要資料！
let employeeData=[];
//因為薪資資料都在員工資料表裡所以設定欄位取值！
getEmployee.forEach(data=>{
    let individualEmployee = {};
    employeeColumn.forEach(column=>{
        individualEmployee[column] = data[column] || "none";
    });
    employeeData.push(individualEmployee);
});
// console.log(employeeData);

// 所有出勤資料的變數 ==>  employeeData

function displayEmployee(page){

    start = page*pageNumbers;
    end = start+pageNumbers;
    let showEmployeeData = employeeData.slice(start,end);

    showEmployeeData.forEach((employee,index)=>{
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${index+1}-col${i+1}`).innerHTML = employee[employeeColumn[i]];
        }
    })
    //頁面按鈕
    if(getEmployee.length <= end){
        nextPage.style.color = 'gray';
        nextPage.style.setProperty('cursor','auto','important');
    }else{
        nextPage.style.color = 'black';
        nextPage.style.setProperty('cursor','pointer','important');
    }
    if(page == 0){
        lastPage.style.color = 'gray';
        lastPage.style.setProperty('cursor','auto','important');
    }else{
        lastPage.style.color = 'black';
        lastPage.style.setProperty('cursor','pointer','important');
    }
}
displayEmployee(page);

nextPage.addEventListener('click',()=>{
    if(getEmployee.length <= end)return;
    page++;
    displayEmployee(page);
})
lastPage.addEventListener('click',()=>{
    if(page == 0)return;
    page--;
    displayEmployee(page);
})









//彈出視窗#$%^
let btnPopModifySave = document.getElementById('ctr_modify_pop');
let btnPopSearch = document.getElementById('srch_pop');
let popSearch = document.getElementById('pop_search');
let popModifySave = document.getElementById('new_emp');
btnPopModifySave.addEventListener('click',()=>{
    popModifySave.style.display = 'block';
})
btnPopSearch.addEventListener('click',()=>{
    popSearch.style.display = 'block';
})


//彈出視窗內容控制
let ctrEmpId = document.getElementById('ctr_emp_num');
let ctrEmpSex = document.getElementById('ctr_emp_sex');
let ctrEmpName = document.getElementById('ctr_emp_name');
let ctrEmpBirth = document.getElementById('ctr_emp_birth');
let ctrEmpPosit = document.getElementById('ctr_emp_posit');
let ctrEmpStatus = document.getElementById('ctr_emp_status');
let ctrEmpEmply = document.getElementById('ctr_emp_emply');
let ctrEmpTermin = document.getElementById('ctr_emp_termin');
let ctrEmpYears = document.getElementById('ctr_emp_years');
let ctrEmpBoss1 = document.getElementById('ctr_emp_boss1');
let ctrEmpBoss2 = document.getElementById('ctr_emp_boss2');
let srchEmpStatus = document.getElementById('srch_emp_status');
let srchEmpNumStart = document.getElementById('srch_emp_num_start');
let srchEmpNumEnd = document.getElementById('srch_emp_num_end');
let srchEmpName = document.getElementById('srch_emp_name');
let srchEmpEmplyStart = document.getElementById('srch_emp_emply_start');
let srchEmpEmplyEnd = document.getElementById('srch_emp_emply_end');
let srchEmpTerminStart = document.getElementById('srch_emp_termin_start');
let srchEmpTerminEnd = document.getElementById('srch_emp_termin_end');
let srchEmpPosit = document.getElementById('srch_emp_posit');
const popModifySaveValue = [
    ctrEmpId,
    ctrEmpSex,
    ctrEmpName,
    ctrEmpBirth,
    ctrEmpPosit,
    ctrEmpStatus,
    ctrEmpEmply,
    ctrEmpTermin,
    ctrEmpYears,
    ctrEmpBoss1,
    ctrEmpBoss2
];
const popSearchValue = [
    srchEmpStatus,
    srchEmpNumStart,
    srchEmpNumEnd,
    srchEmpName,
    srchEmpEmplyStart,
    srchEmpEmplyEnd,
    srchEmpTerminStart,
    srchEmpTerminEnd,
    srchEmpPosit
];









//點擊變換顏色陣容組合拳
const employeeTable = document.getElementById('emp_table');
let getId;
employeeTable.addEventListener('click',(event)=>{
    if(event.target.closest('td')){
        let rowId = event.target.closest('td').id;
        getId = document.getElementById(`${rowId.split('-')[0]}-col1`).innerHTML;
        console.log(getId);
        for(let i =0;i<colNumbers;i++){
            // console.log(document.getElementById(`${rowId.split('-')[0]}-col${i+1}`));
            document.getElementById(`${rowId.split('-')[0]}-col${i+1}`).style.backgroundColor = '#E6CACFc2';
        }
    }
    
})



//彈出視窗按鈕
//popModifySave
let popModifySaveGoSave = document.getElementById('ctr_submit');
let popModifySaveGoCancel = document.getElementById('ctr_cancel');
let popModifySaveGoReset = document.getElementById('ctr_reset');

popModifySaveGoSave.addEventListener('click',()=>{






    //handle
    popModifySaveClear();
    popModifySave.style.display = 'none';
})
popModifySaveGoReset.addEventListener('click',()=>{
    popModifySaveClear();
})
popModifySaveGoCancel.addEventListener('click',()=>{
    popModifySaveClear();
    popModifySave.style.display = 'none';
})
//popSearch
let popSearchSubmit = document.getElementById('srch_submit');
let popSearchReset = document.getElementById('srch_reset');
let popSearchCancel = document.getElementById('srch_cancel');

popSearchSubmit.addEventListener('click',()=>{




    //handle
    popSearchClear();
    popSearch.style.display = 'none';
})
popSearchReset.addEventListener('click',()=>{
    popSearchClear();
})
popSearchCancel.addEventListener('click',()=>{
    popSearchClear();
    popSearch.style.display = 'none';
})




function popModifySaveClear(){
    popModifySaveValue.forEach(item=>{
        item.value = '';
    })
}
function popSearchClear(){
    popSearchValue.forEach(item=>{
        item.value = '';
    })
}



//turn Page logic~~~~   >W<  <---- (WTF????
let backPanelPage = document.getElementById('back_pannel');
let seeDetailPage = document.getElementById('see_detail');
seeDetailPage.addEventListener('click',()=>{
    loadPage('employee_data');
})
backPanelPage.addEventListener('click',()=>{
    loadPage('employee');
})


}
initializePage();