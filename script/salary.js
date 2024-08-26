function initializePage(){
let salaryStructures = JSON.parse(localStorage.getItem('salaryStructure'));
salaryStructures.sort((a,b)=>a.InternalTierLevel-b.InternalTierLevel);
salaryStructures.sort((a,b)=>b.Position.localeCompare(a.Position));
let page = 0;
const pageNumbers = 10 ;
const colNumbers = 8;
var start;
var end;
let str_columns=['Position','InternalTierLevel','ExperienceRange','TierSalary','ExternalExperienceTierLevel','ExternalExperience','ExternalExperienceBonus','TotalSalary']
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
let searchData = JSON.parse(localStorage.getItem('SearchSalaryStructureResultData'));
let isSearch = false;

//顯示資料 salaryStructures
function displaySalaryStructure(object,page){
    console.log('get',JSON.parse(localStorage.getItem('SearchSalaryStructureResultData')));

    start = (page) * pageNumbers;
    end = start + pageNumbers;
    var salaryStructureToDisplay = object.slice(start, end);
    // console.log(salaryStructureToDisplay);
    
    for(let i = 0;i<pageNumbers;i++){
        for(let j = 0;j<colNumbers;j++){
            document.getElementById(`row${i+1}-col${j+1}`).innerHTML = "";
        }
    }
    
    salaryStructureToDisplay.forEach((element,index) => {
        // console.log(element);
        for(let j = 0;j<str_columns.length;j++){
            document.getElementById(`row${index+1}-col${j+1}`).innerHTML = element[str_columns[j]];
        }
    });
    const lastPageButtonForStr = document.getElementById('last');
    if (page == 0) {
        lastPageButtonForStr.style.color = 'gray';
        lastPageButtonForStr.style.setProperty('cursor', 'auto', 'important');
    }else {
        lastPageButtonForStr.style.color = 'black';
        lastPageButtonForStr.style.setProperty('cursor', 'pointer', 'important');
    }
    
    const nextPageButtonForStr = document.getElementById('next');
    if (object.length <= end) {
        nextPageButtonForStr.style.color = 'gray';
        nextPageButtonForStr.style.setProperty('cursor', 'auto', 'important');
    }else {
        nextPageButtonForStr.style.color = 'black';
        nextPageButtonForStr.style.setProperty('cursor', 'pointer', 'important');
    }
    
}

displaySalaryStructure(salaryStructures,page);


//翻頁邏輯
document.getElementById('next').addEventListener('click', function() {
    let searchData = JSON.parse(localStorage.getItem('SearchSalaryStructureResultData'));
    if (salaryStructures.length < end)return;
    page++;
    if(isSearch){
        displaySalaryStructure(searchData,page);
        console.log('display3',searchData);
    }else if (!isSearch){
        displaySalaryStructure(salaryStructures,page);
        
    }
});
document.getElementById('last').addEventListener('click', function() {
    if(page == 0){return};
    let searchData = JSON.parse(localStorage.getItem('SearchSalaryStructureResultData'));
    page--;
    if(isSearch){
        displaySalaryStructure(searchData,page);
        console.log('display4',searchData);
    }else if (!isSearch){
        displaySalaryStructure(salaryStructures,page);
    }
});

//彈出視窗的控制!!!
//彈出：按鈕元件_查詢
let searchStrPopUp = document.getElementById('search_str');
let searchSryPopUp = document.getElementById('search_sry');
let searchEmpSry = document.getElementById('pop_search_emp_sry');
let searchStrSry = document.getElementById('pop_search_str_sry');
let changeSearchStrSry = document.getElementById('change_search_str_sry');
let changeSearchEmpSry = document.getElementById('change_search_emp_sry');
searchStrPopUp.addEventListener('click',()=>{
    searchStrSry.style.display = 'block';
    localStorage.removeItem('SearchSalaryStructureResultData');
})
searchSryPopUp.style.display = 'none';
searchSryPopUp.addEventListener('click',()=>searchEmpSry.style.display = 'block');
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
let PopUpClose2 = document.getElementById('src_str_cancel');
PopUpClose1.addEventListener('click',()=>searchEmpSry.style.display = 'none');
PopUpClose2.addEventListener('click',()=>searchStrSry.style.display = 'none');

//彈出視窗的清除
let PopReset1 = document.getElementById('reset_1');
//清除
PopReset1.addEventListener('click',()=>{
    popUpclear1();
})


function popUpclear1(){
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
}
function popUpclear2(){
    let sryPosition = document.getElementById('sry_position');
    sryPosition.value = '';
}

//點擊查詢
let srcStrSubmit = document.getElementById('src_str_submit'); 
srcStrSubmit.addEventListener('click',()=>{
    
    
    searchFunction();
    searchStrSry.style.display = 'none';
})


//查詢功能
//偏複雜
let sryPosition = document.getElementById('sry_position');
function searchFunction(){
    new Promise((resolve,reject)=>{
        var filterData = salaryStructures;
        resolve(filterData);
    })
    .then(data=>{
        let searchStrResult=[];
        data.forEach(item=>{
            if(item['Position'] === sryPosition.value){
                searchStrResult.push(item);
            }
        })
        // console.log(searchStrResult);
        return Promise.resolve(searchStrResult);
    })
    .then(data=>{
        clearTable();
        return Promise.resolve(data);
    })
    .then(data=>{
        isSearch = true;
        page = 0;
        localStorage.setItem('SearchSalaryStructureResultData',JSON.stringify(data));
        return Promise.resolve(data);
    })
    .then(finalData=>{
        displaySalaryStructure(finalData,page);
        console.log('set',JSON.parse(localStorage.getItem('SearchSalaryStructureResultData')));
        
        
    })
    .finally(()=>popUpclear2());
}

// console.log(JSON.parse(localStorage.getItem('SearchSalaryStructureResultData')));



function clearTable(){
    for(let j = 0;j<pageNumbers;j++){
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${j+1}-col${i+1}`).innerHTML = '';
        }
    }
}





/////查詢布林直要做，禁止跳回原本結果。









//封鎖下方員工詳細功能
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
const btnSearchBox = [searchSryId,searchSryStatus,searchSryYearsIn,searchSrName,
    searchSryEmpDate,searchSryTerminDate,searchSryInLevel,searchSryOuterYears,
    searchSryOuterAttach,searchSryTotalSalary];
const btnSearch = [searchSaveBtn,searchClearBtn]
    btnSearchBox.forEach(item=>{
        item.value = '';
        item.setAttribute('readonly',true);
        item.style.backgroundColor = '#d7d5d5';
    })
    btnSearch.forEach(item=>{
        item.style.color = 'gray';
        item.style.setProperty('cursor', 'auto', 'important');
    })


//切換table
document.getElementById('see_detail').addEventListener('click',()=>loadPage('salary'));
document.getElementById('see_data').addEventListener('click',()=>changeSalaryTable('salary_data'));
//個人薪資表的邏輯~~
function changeSalaryTable(table){
fetch(`${table}.html`)
.then(response => response.text())
.then(data => {
    // console.log(data);
    document.getElementById('change_site').innerHTML = data;

    const script = document.createElement('script');
    script.id = 'salary_data';
    script.src = `./script/salary_data.js`;
    document.body.appendChild(script);

    searchSryPopUp.style.display = 'inline-block';

    script.onload = ()=>{
        if(typeof initializeSalaryDataPage === 'function'){
            initializeSalaryDataPage();
        }
    }
})
}
// changeSalaryTable('salary_data');

}
initializePage();