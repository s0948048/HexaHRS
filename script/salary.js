function initializePage(){
let salaryStructures = JSON.parse(localStorage.getItem('salaryStructure'));
salaryStructures.sort((a,b)=>a.InternalTierLevel-b.InternalTierLevel);
salaryStructures.sort((a,b)=>b.Position.localeCompare(a.Position));
let page = 0;
const pageNumbers = 10 ;
let colNumbers = 8;
var start;
var end;
let columns=['Position','InternalTierLevel','ExperienceRange','TierSalary','ExternalExperienceTierLevel','ExternalExperience','ExternalExperienceBonus','TotalSalary']
let sry_num = document.getElementById('sry_num');
let sry_status = document.getElementById('sry_status');
let sry_years_inner = document.getElementById('sry_years_inner');
let sry_name = document.getElementById('sry_name');
let sry_emp_date = document.getElementById('sry_emp_date');
let sry_years_outer = document.getElementById('sry_years_outer');
let sry_level = document.getElementById('sry_level');
let sry_outer_years = document.getElementById('sry_outer_years');
let sry_outer_attach = document.getElementById('sry_outer_attach');
let sry_salary = document.getElementById('sry_salary');



function displaySalaryStructure(page){
    start = (page) * pageNumbers;
    end = start + pageNumbers;
    var salaryStructureToDisplay = salaryStructures.slice(start, end);
    // console.log(salaryStructureToDisplay);
    
    for(let i = 0;i<pageNumbers;i++){
        for(let j = 0;j<colNumbers;j++){
            document.getElementById(`row${i+1}-col${j+1}`).innerHTML = "";
        }
    }

    salaryStructureToDisplay.forEach((element,index) => {
        // console.log(element);
        for(let j = 0;j<columns.length;j++){
            document.getElementById(`row${index+1}-col${j+1}`).innerHTML = element[columns[j]];
        }
    });
}displaySalaryStructure(page);

//翻頁邏輯
document.getElementById('next').addEventListener('click', function() {
    page++;
    displaySalaryStructure(page);
});
document.getElementById('last').addEventListener('click', function() {
    page--;
    displaySalaryStructure(page);
});

//彈出視窗的控制!!!
//彈出：按鈕元件_查詢
let searchStrPopUp = document.getElementById('search_str');
let searchSryPopUp = document.getElementById('search_sry');
let searchEmpSry = document.getElementById('pop_search_emp_sry');
let searchStrSry = document.getElementById('pop_search_str_sry');
let changeSearchStrSry = document.getElementById('change_search_str_sry');
let changeSearchEmpSry = document.getElementById('change_search_emp_sry');
searchStrPopUp.addEventListener('click',()=>searchEmpSry.style.display = 'block');
searchSryPopUp.addEventListener('click',()=>searchStrSry.style.display = 'block');
changeSearchStrSry.addEventListener('click',()=>{
    searchEmpSry.style.display = 'none';
    searchStrSry.style.display = 'block';
});
changeSearchEmpSry.addEventListener('click',()=>{
    searchEmpSry.style.display = 'block';
    searchStrSry.style.display = 'none';
})
//關閉：關閉視窗按鈕
let PopUpClose1 = document.getElementById('button_1');
let PopUpClose2 = document.getElementById('button_2');
PopUpClose1.addEventListener('click',()=>searchEmpSry.style.display = 'none');
PopUpClose2.addEventListener('click',()=>searchStrSry.style.display = 'none');

//彈出視窗的清除
let PopReset1 = document.getElementById('reset_1');
let PopReset2 = document.getElementById('reset_2');
PopReset1.addEventListener('click',()=>{
    let searchEmpNum = document.getElementById('search_emp_num');
    let searchEmpPosition = document.getElementById('search_emp_position');
    let searchEmpName = document.getElementById('search_emp_name');
    let searchEmpEmplyStart = document.getElementById('search_emp_emply_start');
    let searchEmpTerminStart = document.getElementById('search_emp_termin_start');
    let searchEmpEmplyEnd = document.getElementById('search_emp_emply_end');
    let searchEmpTerminEnd = document.getElementById('search_emp_termin_end');
    searchEmpNum.value = '';
    searchEmpPosition.value = '';
    searchEmpName.value = '';
    searchEmpEmplyStart.value = '';
    searchEmpTerminStart.value = '';
    searchEmpEmplyEnd.value = '';
    searchEmpTerminEnd.value = '';
})
PopReset2.addEventListener('click',()=>{
    let sryPosition = document.getElementById('sry_position');
    let sryYearsInStart = document.getElementById('sry_years_in_start');
    let sryYearsInEnd = document.getElementById('sry_years_in_end');
    let sryYearsOutStart = document.getElementById('sry_years_out_start');
    let sryYearsOutEnd = document.getElementById('sry_years_out_end');
    sryPosition.value = '';
    sryYearsInStart.value = '';
    sryYearsInEnd.value = '';
    sryYearsOutStart.value = '';
    sryYearsOutEnd.value = '';
})
//查詢功能
//偏複雜




//切換table
document.getElementById('see_detail').addEventListener('click',()=>loadPage('salary'));
document.getElementById('see_data').addEventListener('click',()=>changeSalaryTable('salary_data'));
//個人薪資表的邏輯~~
function changeSalaryTable(table){
fetch(`${table}.html`)
.then(response => response.text())
.then(data => {
    // console.log(data);
    document.getElementById('salary_data').innerHTML = data;
})

}
changeSalaryTable('salary_data');

//talbe2的功能























}
initializePage()