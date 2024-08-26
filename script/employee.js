function initializePage(){
let employeeData = JSON.parse(localStorage.getItem('employeeData'));
// console.log(employeeData);
const position = [
    '經理','主管','小組長',
    '技術員','測試者','客服員',
    '專案人員','特約人員','會計','行政助理'
];
const postionNumbers = [0,0,0,0,0,0,0,0,0,0];
let otherPosition=0;
let left = 0;
employeeData.forEach((employee,index) => {
    for(let i=0;i<position.length;i++){
        if(employee.position == position[i] && employee['EmploymentStatus'] != '離職'){
            postionNumbers[i]++;
        }
    }
    if(employee.position == '其他')otherPosition++;
    if(employee['EmploymentStatus'] == '離職')left++;
});
console.log(otherPosition);


let boss = document.getElementById('boss');
let manager = document.getElementById('manager');
let leader = document.getElementById('leader');
let technician = document.getElementById('technician');
let tester = document.getElementById('tester');
let CMServer = document.getElementById('CMServer');
let projector = document.getElementById('projector');
let specialor = document.getElementById('specialor');
let accountic = document.getElementById('accountic');
let ADasisstant = document.getElementById('ADasisstant');
let boss_style = document.getElementById('boss_style');
let manager_style = document.getElementById('manager_style');
let leader_style = document.getElementById('leader_style');
let technician_style = document.getElementById('technician_style');
let tester_style = document.getElementById('tester_style');
let CMServer_style = document.getElementById('CMServer_style');
let projector_style = document.getElementById('projector_style');
let specialor_style = document.getElementById('specialor_style');
let accountic_style = document.getElementById('accountic_style');
let ADasisstant_style = document.getElementById('ADasisstant_style');


const DOMelement = [
    boss,
    manager,
    leader,
    technician,
    tester,
    CMServer,
    projector,
    specialor,
    accountic,
    ADasisstant
];
const DOMelementStyle = [
    boss_style,
    manager_style,
    leader_style,
    technician_style,
    tester_style,
    CMServer_style,
    projector_style,
    specialor_style,
    accountic_style,
    ADasisstant_style
];

//因為有省略其他的職位，因此要先把它扣掉
//其他 otherPosition
let total=0;
const totalEmpNumbers = employeeData.length-otherPosition-left;
postionNumbers.forEach((item,index)=>{
    DOMelement[index].innerHTML = item;
    // console.log(`${Math.round((item/totalEmpNumbers)*100)}%`);
    
    DOMelementStyle[index].innerHTML = `${item}`;
    DOMelementStyle[index].style.setProperty('--segment-width',`${(item/totalEmpNumbers)*100}%`);
    total += parseInt((item/totalEmpNumbers)*100);
})
// console.log(total);













}
initializePage();