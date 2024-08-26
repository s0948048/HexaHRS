function initializePage(){
let getEmployee = JSON.parse(localStorage.getItem('employeeData'));
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
let isSearch = false;
let searchData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
//這裡是重要資料！
let employeeData=getEmployee;


getEmployee.sort((a,b)=>{
    const cpm = a.EmploymentStatus.localeCompare(b.EmploymentStatus);
    if(!cpm == 0)return cpm;
    if(a.DateTerminated == 'none') return -1;
    return Number(b.id)-Number(a.id);
})
//因為薪資資料都在員工資料表裡所以設定欄位取值！
// getEmployee.forEach(data=>{
//     let individualEmployee = {};
//     employeeColumn.forEach(column=>{
//         individualEmployee[column] = data[column] || "none";
//     });
//     employeeData.push(individualEmployee);
// });
// console.log(employeeData);

// 所有資料的變數 ==>  employeeData

function displayEmployee(Object,page){
    console.log(Object.length);
    
    start = page*pageNumbers;
    end = start+pageNumbers;
    if (Object.length<=pageNumbers) {
        showEmployeeData = Object;
    }else{
        showEmployeeData = Object.slice(start,end);
    }

    showEmployeeData.forEach((employee,index)=>{
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${index+1}-col${i+1}`).innerHTML = employee[employeeColumn[i]];
        }
    })
    //頁面按鈕
    if(Object.length <= end){
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
    if(localStorage.getItem('rowNumberSelect')){
        clearSelectionStyle();
        localStorage.removeItem('rowNumberSelect');
    }
}
displayEmployee(employeeData,page);

nextPage.addEventListener('click',()=>{
    if(getEmployee.length <= end)return;
    page++;
    let searchData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
    let employeeData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
    if(isSearch){
        displayEmployee(searchData,page);
    }else if (!isSearch){
        displayEmployee(employeeData,page);
    }
    
})
lastPage.addEventListener('click',()=>{
    if(page == 0)return;
    page--;
    let searchData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
    let employeeData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
    if(isSearch){
        displayEmployee(searchData,page);
    }else if (!isSearch){
        displayEmployee(employeeData,page);
    }
})


//點擊變換顏色陣容組合拳
const employeeTable = document.getElementById('emp_table');
let getId;
employeeTable.addEventListener('click',(event)=>{
    if(event.target.closest('td')){
        let rowId = event.target.closest('td').id;
        getId = document.getElementById(`${rowId.split('-')[0]}-col1`).innerHTML;


        let rowNumber = `${rowId.split('-')[0]}`;
        if(localStorage.getItem('rowNumberSelect') == rowNumber){
            console.log('same');
            
            clearSelectionStyle();
            localStorage.removeItem('rowNumberSelect');
            getId = '';
        }else if(localStorage.getItem('rowNumberSelect') != rowNumber){
            console.log('diff');
            if(localStorage.getItem('rowNumberSelect')){
                clearSelectionStyle();
                localStorage.setItem('rowNumberSelect',rowNumber);
            }else{
                localStorage.setItem('rowNumberSelect',rowNumber);
            }
            rowsSelection();    
        }
    // console.log(getId);
    }
})
function rowsSelection(){

    let rowNumber = localStorage.getItem('rowNumberSelect');
    for(let i =0;i<colNumbers;i++){
        document.getElementById(`${rowNumber}-col${i+1}`).classList.add('selection');
    }
}
function clearSelectionStyle(){
    if(!localStorage.getItem('rowNumberSelect'))return;
    let rowNumber = localStorage.getItem('rowNumberSelect');
    for(let i =0;i<colNumbers;i++){
        document.getElementById(`${rowNumber}-col${i+1}`).classList.remove('selection');
    }
    localStorage.removeItem('rowNumberSelect');
}






//彈出視窗#$%^
let btnPopModifySave = document.getElementById('ctr_modify_pop');
let btnPopSearch = document.getElementById('srch_pop');
let popSearch = document.getElementById('pop_search');
let popModifySave = document.getElementById('new_emp');
let newId = getNewId();
btnPopModifySave.addEventListener('click',()=>{
    if(getId){
        showToPopUp(getId);
    }else{
        newEmp(newId);
    }
    popModifySave.style.display = 'block';
})
btnPopSearch.addEventListener('click',()=>{
    popSearch.style.display = 'block';
})
//選了之後點修改會抓資料上去。
function showToPopUp(getId){
    employeeData.forEach(employee=>{
        
        // console.log(getId);
        if(Number(employee.id) === Number(getId)){
            employeeColumn.forEach((item,index)=>{
                popModifySaveValue[index].value = employee[item];
            });
        }
    })

}

function newEmp(Id){
    let currentDate = new Date();
    let setDate = currentDate.toISOString().split('T')[0];
    ctrEmpId.value = Id;
    ctrEmpEmply.value = setDate;
    ctrEmpYears = 0;
}

function getNewId(){
    let idMax = [];
    employeeData.forEach((item)=>idMax.push(Number(item.id)));
    let max = idMax.reduce((a,b)=>Math.max(a,b),0);
    let newId = max+1;
    return newId;
}


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
    ctrEmpName,
    ctrEmpSex,
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

let popSearchSubmit = document.getElementById('srch_submit');
popSearchSubmit.addEventListener('click',()=>{
    searchFunction();
    //handle
    //清除在非同步裡面了
    popSearch.style.display = 'none';
})


function submitModifyData(){
    employeeData.forEach(employee=>{
        if(employee.id == getId){
            popModifySaveValue.forEach((item,index)=>{
                employee[employeeColumn[index]] = item.value;
            })
            console.log(employee);
        }
    })
    
    
    localStorage.setItem('employeeData',JSON.stringify(employeeData));
}
function submitNewData(){
    let employee={};
    popModifySaveValue.forEach((item,index)=>{
        employee[employeeColumn[index]] = item.value;
    })
    employeeData.push(employee);
    employeeData.sort((a,b)=>{
        return Number(b.id)-Number(a.id);
    })
    localStorage.setItem('employeeData',JSON.stringify(employeeData));
}




function searchFunction(){
    new Promise((resolve,reject)=>{
        var filterData = employeeData;
        resolve(filterData);
    })
    .then(data=>{
        console.log('123',data);
        console.log(srchEmpStatus.value);
        
        if(srchEmpStatus.value){
            console.log('2');
            
            let searchResult = [];
            data.forEach(item=>{
                console.log(item['EmploymentStatus']);
                
                if(item['EmploymentStatus'] === srchEmpStatus.value){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        let searchResult = [];
        if(srchEmpNumStart.value && !srchEmpNumEnd.value){
            data.forEach(item=>{
                if(item['id'] == srchEmpNumStart.value){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else if(srchEmpNumStart.value){
            data.forEach(item=>{
                if(item['id'] > srchEmpNumStart.value){
                    searchResult.push(item);
                }
            })
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpNumEnd.value){
            let searchResult = [];
            data.forEach(item=>{
                if(item['id'] <= srchEmpNumEnd.value){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpName.value){
            let searchResult = [];
            const regex = new RegExp(srchEmpName.value);
            data.forEach(item=>{
                if(regex.test(item['name'])){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpEmplyStart.value){
            let searchResult = [];
            let cmpDate = new Date(srchEmpEmplyStart.value);
            data.forEach(item=>{
                let itemDate = new Date(item['DateEmployed']);
                if(itemDate >= cmpDate){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpEmplyEnd.value){
            let searchResult = [];
            let cmpDate = new Date(srchEmpEmplyEnd.value);
            data.forEach(item=>{
                let itemDate = new Date(item['DateEmployed']);
                if(itemDate <= cmpDate){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpTerminStart.value){
            let searchResult = [];
            let cmpDate = new Date(srchEmpTerminStart.value);
            data.forEach(item=>{
                let itemDate = new Date(item['DateTerminated']);
                if(itemDate >= cmpDate){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpTerminEnd.value){
            let searchResult = [];
            let cmpDate = new Date(srchEmpTerminEnd.value);
            data.forEach(item=>{
                let itemDate = new Date(item['DateTerminated']);
                if(itemDate <= cmpDate){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        if(srchEmpPosit.value){
            let searchResult = [];
            data.forEach(item=>{
                if(item['position'] == srchEmpPosit.value){
                    searchResult.push(item);
                }
            })
            console.log(searchResult);
            return Promise.resolve(searchResult);
        }else return data; 
    })
    .then(data=>{
        console.log(data);
        //就是這個data  最終結果!
        
        clearTable();
        return Promise.resolve(data);
    })
    .then((data)=>{
        page = 0;
        isSearch = true;
        localStorage.setItem('SearchEmployeeResultData',JSON.stringify(data));
    })
    .then(finalData=>{
        let searchData = JSON.parse(localStorage.getItem('SearchEmployeeResultData'));
        displayEmployee(searchData,page);
    })
    .finally(()=>popSearchClear());
}


function clearTable(){
    for(let j = 0;j<pageNumbers;j++){
        for(let i = 0;i<colNumbers;i++){
            document.getElementById(`row${j+1}-col${i+1}`).innerHTML = '';
        }
    }
}


//彈出視窗按鈕
//popModifySave
let popModifySaveGoSave = document.getElementById('ctr_submit');
let popModifySaveGoCancel = document.getElementById('ctr_cancel');
let popModifySaveGoReset = document.getElementById('ctr_reset');

popModifySaveGoSave.addEventListener('click',()=>{
    if(!ctrEmpName.value){
        alert('name! a name!!');
    }else{
        //handle
        if(ctrEmpId.value < newId){
            console.log('old');
            
            submitModifyData();
        }else{
            submitNewData();
            console.log('new');
            
        }
        popModifySaveClear();
        popModifySave.style.display = 'none';
        loadPage('employee_data');
    }

})
popModifySaveGoReset.addEventListener('click',()=>{
    popModifySaveClear();
    newEmp(newId);
})
popModifySaveGoCancel.addEventListener('click',()=>{
    popModifySaveClear();
    popModifySave.style.display = 'none';
})

//popSearch

let popSearchReset = document.getElementById('srch_reset');
let popSearchCancel = document.getElementById('srch_cancel');


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