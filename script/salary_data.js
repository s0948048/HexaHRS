
function initializeSalaryDataPage(){
let getEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
let salaryColumn = ['id','name','position','EmploymentStatus','DateEmployed','DateTerminated','Tenure','salary']
let page = 0;
const pageNumbers = 10 ;
let colNumbers = 8;
var start;
var end;


//這裡是重要資料！
let employeeSalaryData=[];
//因為薪資資料都在員工資料表裡所以設定欄位取值！
getEmployeeData.forEach(employee=>{
    let individualSalary = {};
    salaryColumn.forEach(column=>{
        individualSalary[column] = employee[column] || "none";
    });
    employeeSalaryData.push(individualSalary);
});

// console.log(employeeSalaryData);


//顯示資料
function displayEmployeeSalary(page){
    employeeSalaryData.sort((a,b)=>{
        if (a.EmploymentStatus === "在職" && b.EmploymentStatus !== "在職") return -1;
        if (a.EmploymentStatus !== "在職" && b.EmploymentStatus === "在職") return 1;
        return a.id-b.id;
    });
    start = (page) * pageNumbers;
    end = start + pageNumbers;
    var employeeSalaryToDisplay = employeeSalaryData.slice(start, end);
    console.log(employeeSalaryToDisplay);
    
    for(let i = 0;i<pageNumbers;i++){
        for(let j = 0;j<colNumbers;j++){
            document.getElementById(`row${i+1}_col${j+1}`).innerHTML = "";
        }
    }

    employeeSalaryToDisplay.forEach((element,index) => {
        // console.log(element);
        for(let j = 0;j<salaryColumn.length;j++){
            document.getElementById(`row${index+1}_col${j+1}`).innerHTML = element[salaryColumn[j]];
        }
    });
    //翻頁按鈕顯示與否
    const lastPageButton = document.getElementById('sry_last');
    if (page == 0) {
        lastPageButton.style.color = 'gray';
        lastPageButton.style.setProperty('cursor', 'auto', 'important');
    }else {
        lastPageButton.style.color = 'black';
        lastPageButton.style.setProperty('cursor', 'pointer', 'important');
    }
    
    const nextPageButton = document.getElementById('sry_next');
    if (employeeSalaryData.length <= end) {
        nextPageButton.style.color = 'gray';
        nextPageButton.style.setProperty('cursor', 'auto', 'important');
    }else {
        nextPageButton.style.color = 'black';
        nextPageButton.style.setProperty('cursor', 'pointer', 'important');
    }
}displayEmployeeSalary(page);

//翻頁邏輯
document.getElementById('sry_next').addEventListener('click', function() {
    if (employeeSalaryData.length <= end)return;
    page++;
    displayEmployeeSalary(page);
});
document.getElementById('sry_last').addEventListener('click', function() {
    if(page == 0){return};
    page--;
    displayEmployeeSalary(page);
});

//下方員工詳細薪資的input元件~~
//解鎖下方員工詳細功能
let searchSryId = document.getElementById('sry_num');
let searchSryStatus = document.getElementById('sry_status');
let searchSryYearsIn = document.getElementById('sry_years_inner');
let searchSrName = document.getElementById('sry_name');
let searchSryEmpDate = document.getElementById('sry_emp_date');
let searchSryTerminDate = document.getElementById('sry_termin_date');
let searchSryInLevel = document.getElementById('sry_level');
let searchSryOuterYears = document.getElementById('sry_outer_years');
let searchSryOuterAttach = document.getElementById('sry_outer_attach');
let searchSryTotalSalary = document.getElementById('sry_total_salary');
let searchSaveBtn = document.getElementById('search_save');
let searchClearBtn = document.getElementById('search_clear');
const empSalarySave = [searchSryInLevel,searchSryOuterYears,
    searchSryOuterAttach,searchSryTotalSalary];
const empSalaryBtn=[searchSaveBtn,searchClearBtn];
    
    empSalaryBtn.forEach(item=>{
        item.style.color = 'black';
        item.style.setProperty('cursor', 'pointer', 'important');
    });

//儲存按鈕。
searchSaveBtn.addEventListener('click',()=>{
    
    if(searchSaveBtn.innerHTML == '點擊修改'){
        // console.log(searchSaveBtn.innerHTML);
        empSalarySave.forEach(item=>{
            item.style.color = 'black';
            item.style.backgroundColor = '#ededed';
            item.removeAttribute('readonly');
        });
        searchSaveBtn.innerHTML = '儲存';
    }else if(searchSaveBtn.innerHTML == '儲存'){
        






        storeToEmployeeData();
    }
});













let salaryTable = document.getElementById('salary_data');
let tbodyId;
salaryTable.addEventListener('click',(event)=>{
    if(event.target.closest('tbody')){
        tbodyId = event.target.closest('tbody').id;
        showAnuDataToPop(tbodyId);
    }
})















}
initializeSalaryDataPage();