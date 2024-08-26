function restart(){
let getEmployeeSalaryData = JSON.parse(localStorage.getItem('employeeData'));
let salaryColumn = ['id','name','position','EmploymentStatus','DateEmployed','DateTerminated','Tenure','salary']
let page = 0;
const pageNumbers = 10 ;
let colNumbers = 8;
var start;
var end;
let isSearch = false;

//這裡是重要資料！
let employeeSalaryData=[];
//因為薪資資料都在員工資料表裡所以設定欄位取值！
getEmployeeSalaryData.forEach(employee=>{
    let individualSalary = {};
    salaryColumn.forEach(column=>{
        individualSalary[column] = employee[column] || "none";
    });
    employeeSalaryData.push(individualSalary);
});



//顯示資料
function displayEmployeeSalary(Object,page){
    Object.sort((a,b)=>{
        if (a.EmploymentStatus === "在職" && b.EmploymentStatus !== "在職") return -1;
        if (a.EmploymentStatus !== "在職" && b.EmploymentStatus === "在職") return 1;
        return a.id-b.id;
    });
    start = (page) * pageNumbers;
    end = start + pageNumbers;
    var employeeSalaryToDisplay = Object.slice(start, end);
    // console.log(employeeSalaryToDisplay);
    
    tableClear();

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
}
displayEmployeeSalary(employeeSalaryData,page);

//翻頁邏輯




document.getElementById('sry_next').addEventListener('click', function() {
    let searchSalary = JSON.parse(localStorage.getItem('searchEmpSalary'));
    let getEmployeeSalaryData = JSON.parse(localStorage.getItem('employeeData'));
    if (employeeSalaryData.length <= end)return;
    page++;
    if(isSearch){
        displayEmployeeSalary(searchSalary,page);
    }else if (!isSearch){
        displayEmployeeSalary(getEmployeeSalaryData,page);
    }
});
document.getElementById('sry_last').addEventListener('click', function() {
    let searchSalary = JSON.parse(localStorage.getItem('searchEmpSalary'));
    let getEmployeeSalaryData = JSON.parse(localStorage.getItem('employeeData'));
    if(page == 0){return};
    page--;
    if(isSearch){
        displayEmployeeSalary(searchSalary,page);
    }else if (!isSearch){
        displayEmployeeSalary(getEmployeeSalaryData,page);
    }
});


let searchEmpSry = document.getElementById('pop_search_emp_sry');

let searchEmpId = document.getElementById('search_emp_num');
let searchEmpName = document.getElementById('search_emp_name');
let searchEmpPosition = document.getElementById('search_emp_position');
let searchEmpEmplyStart = document.getElementById('search_emp_emply_start');
let searchEmpEmplyEnd = document.getElementById('search_emp_emply_end');
let searchEmpTerminStart = document.getElementById('search_emp_termin_start');
let searchEmpTerminEnd = document.getElementById('search_emp_termin_end');

//['id','name','position','EmploymentStatus','DateEmployed','DateTerminated','Tenure','salary']
let srcSrySubmit = document.getElementById('src_sry_submit');
let srcSryReset = document.getElementById('src_sry_reset');
let srcSryCancel = document.getElementById('src_sry_cancel');

function searchEmpSalary(){
    new Promise((resolve,reject)=>{
        var filterData = getEmployeeSalaryData;
        resolve(filterData);
    })
    .then(data=>{
        let filterPassData=[];
        if(searchEmpId.value){
            data.forEach(salaryItem=>{
                if(Number(salaryItem['id']) === Number(searchEmpId.value)){
                    filterPassData.push(salaryItem);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpName.value){
            let filterPassData=[];
            const regex = new RegExp(searchEmpName.value);
            data.forEach(item=>{
                if(regex.test(item['name'])){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpPosition.value){
            let filterPassData=[];
            data.forEach(item=>{
                if(item['position'] === searchEmpPosition.value){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpEmplyStart.value){
            let filterPassData=[];
            let cmpDate = new Date(searchEmpEmplyStart.value);
            data.forEach(item=>{
                let emplyDate = new Date(item['DateEmployed']);
                if(emplyDate >= cmpDate){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpEmplyEnd.value){
            let filterPassData=[];
            let cmpDate = new Date(searchEmpEmplyEnd.value);
            data.forEach(item=>{
                let emplyDate = new Date(item['DateEmployed']);
                if(emplyDate <= cmpDate){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpTerminStart.value){
            let filterPassData=[];
            let cmpDate = new Date(searchEmpTerminStart.value);
            data.forEach(item=>{
                let emplyDate = new Date(item['DateTerminated']);
                if(emplyDate >= cmpDate){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        if(searchEmpTerminEnd.value){
            let filterPassData=[];
            let cmpDate = new Date(searchEmpTerminEnd.value);
            data.forEach(item=>{
                let emplyDate = new Date(item['DateTerminated']);
                if(emplyDate <= cmpDate){
                    filterPassData.push(item);
                }
            })
            console.log(filterPassData);
            return Promise.resolve(filterPassData);
        }else return data;
    })
    .then(data=>{
        tableClear();
        return Promise.resolve(data);
    })
    .then(data=>{
        isSearch = true;
        page = 0;
        localStorage.setItem('searchEmpSalary',JSON.stringify(data));
        return Promise.resolve(data);
    })
    .then(data=>{
        displayEmployeeSalary(data,page);
    })
    .finally(()=>popUpclear1());
}

srcSrySubmit.addEventListener('click',()=>{
    
    searchEmpSalary();
    searchEmpSry.style.display = 'none';
})

// tableClear();

//清除
srcSryReset.addEventListener('click',()=>{
    popUpclear1();
})




srcSryCancel.addEventListener('click',()=>{
    searchEmpSry.style.display = 'none';
    popUpclear1();
})










function tableClear(){
    for(let i = 0;i<pageNumbers;i++){
        for(let j = 0;j<colNumbers;j++){
            document.getElementById(`row${i+1}_col${j+1}`).innerHTML = "";
        }
    }
}





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



//下方員工詳細薪資的input元件~~
//解鎖下方員工詳細功能
let searchSryId = document.getElementById('sry_num');
let searchSryStatus = document.getElementById('sry_status');
let searchSryYearsIn = document.getElementById('sry_years_inner');
let searchSryName = document.getElementById('sry_name');
let searchSryEmpDate = document.getElementById('sry_emp_date');
let searchSryTerminDate = document.getElementById('sry_termin_date');
let searchSryInLevel = document.getElementById('sry_level');
let searchSryOuterYears = document.getElementById('sry_outer_years');
let searchSryOuterAttach = document.getElementById('sry_outer_attach');
let searchSryTotalSalary = document.getElementById('sry_total_salary');
let searchSaveBtn = document.getElementById('search_save');
let searchClearBtn = document.getElementById('search_clear');
const empSalaryModifyAble = [searchSryInLevel,searchSryOuterYears,
    searchSryOuterAttach,searchSryTotalSalary];
const empSalaryModifyShow = [searchSryId,searchSryStatus,searchSryYearsIn,searchSryName,
    searchSryEmpDate,searchSryTerminDate,searchSryInLevel,searchSryOuterYears,
    searchSryOuterAttach,searchSryTotalSalary];
const orderGetItem = ['id','EmploymentStatus','Tenure','name',
    'DateEmployed','DateTerminated','InitialSalary','ExternalExperience',
    'ExternalExperienceBonus','salary'];
const empSalaryBtn=[searchSaveBtn,searchClearBtn];

empSalaryModifyShow.forEach(item=>{
    item.value = '';
    item.setAttribute('readonly',true);
    item.style.backgroundColor = '#d7d5d5';
})


//點擊資料表取得資料。下方資料
let salaryTable = document.getElementById('salary_data');
let getEmpId;
salaryTable.addEventListener('click',(event)=>{
    if(event.target.closest('td')){
        let tdId = event.target.closest('td').id;
        getIdColumn = `${tdId.split('_')[0]}_col1`;
        getEmpId = document.getElementById(getIdColumn).innerHTML;
        // console.log(getEmpId);
        
        showSalaryDataToBtnSearch(getEmpId);
    }
});
function showSalaryDataToBtnSearch(getEmpId){
    
    getEmployeeSalaryData.forEach(item=>{
        if(item.id == getEmpId){
            empSalaryModifyShow.forEach((show,index)=>{
               show.value = item[orderGetItem[index]];
            })
        }
    })
    OffModifyAble();
    BackBtnChangeText();
    btnCanClick();
    isEditable = false;
}   

//儲存按鈕。
let isEditable = false;
searchSaveBtn.addEventListener('click',()=>{
    if(!searchSryId.value)return;
    if(!isEditable){
        ClickBtnChangeText();
        OnModifyAble();
        isEditable = true;
    } else if(isEditable){
        searchSryTotalSalary.value = Number(searchSryOuterAttach.value) + Number(searchSryInLevel.value);
        storeToEmployeeData();
        BackBtnChangeText();
        isEditable = false;
    }
});
function storeToEmployeeData(){
    if(!searchSryId.value)return;

    getEmployeeSalaryData.forEach(item=>{
        if(item.id == getEmpId){
            empSalaryModifyShow.forEach((show,index)=>{
                item[orderGetItem[index]] = show.value;
            })
        }
    })
    localStorage.setItem('employeeData',JSON.stringify(getEmployeeSalaryData));
    OffModifyAble();
    displayEmployeeSalary(getEmployeeSalaryData,page);
}

//清除按鈕
searchClearBtn.addEventListener('click',()=>{
    empSalaryModifyShow.forEach(item=>{
        item.value = '';
        item.setAttribute('readonly',true);
        item.style.backgroundColor = '#d7d5d5';
    })
    
    BackBtnChangeText();
    btnCanNotClick();
    isEditable = false;

})



function OffModifyAble(){
    empSalaryModifyAble.forEach(item=>{
        item.setAttribute('readonly',true);
        item.style.backgroundColor = '#d7d5d5';
    })
}
function OnModifyAble(){
    empSalaryModifyAble.forEach(item=>{
        item.removeAttribute('readonly');
        item.style.backgroundColor = '#ededed';
    })
}
function ClickBtnChangeText(){
        searchSaveBtn.innerHTML = '儲存';
}
function BackBtnChangeText(){
        searchSaveBtn.innerHTML = '點擊修改';
}
function btnCanClick(){
    empSalaryBtn.forEach(item=>{
        item.style.color = 'black';
        item.style.setProperty('cursor', 'pointer', 'important');
    });
}
function btnCanNotClick(){
    empSalaryBtn.forEach(item=>{
        item.style.color = 'gray';
        item.style.setProperty('cursor', 'auto', 'important');
    });
}




}
restart();