const month_name = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !==0 && year % 400 !== 0)||(year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year)? 29:28
}

let calender = document.querySelector('.calender')

generateCalender = (month, year) =>{
    let calender_days = calender.querySelector('.calender_days')
    let calender_header_year = calender.querySelector('#year')

    let days_of_month = [31,getFebDays(year),31,30,31,30,31,31,30,31,30,31]

    calender_days.innerHTML = ''


    let currentDate = new Date();
    let month_picker = document.getElementById('month_picker');
    if(month<0||month>11)month = currentDate.getMonth();
    if(!year)year = currentDate.getFullYear();

    let current_month_name = `${month_name[month]}`;
    month_picker.innerHTML = current_month_name;
    calender_header_year.innerHTML = year;

    let first_day = new Date(year,month,1);

    // 計薪日
    let special_day = 10;
    let special_date = new Date(year, month, special_day);

    if (special_date.getDay() === 6) {
        special_day -= 1; 
    } else if (special_date.getDay() === 0) {
        special_day -= 2; 
    }

    let isPast = currentDate > special_date;

    for(let i = 0;i<=days_of_month[month]+first_day.getDay()-1;i++){
        let day = document.createElement('div');
        if(i >= first_day.getDay()){
            // day.classList.add('calender_day_hovor');
            let day_number = i - first_day.getDay() + 1;
            day.innerHTML = i - first_day.getDay()+1;
            day.innerHTML+=`<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;


            if (day_number === special_day) {
                if (isPast) {
                    day.classList.add('special_date_pass'); // 計薪日已過，顯示綠色
                } else {
                    day.classList.add('special_date_nopass'); // 計薪日未過，顯示紅色
                }
            }

            if(i-first_day.getDay()+1 === currentDate.getDate() && 
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ){
                day.classList.add('current_date')
            }
        }
        calender_days.appendChild(day);
    }

};

let month_list = calender.querySelector('.month_list');

month_name.forEach((e, index)=>{

    let month = document.createElement('div');
    month.innerHTML = `<div data_month="${index}">${e}</div>`;
    month.querySelector('div').onclick=()=>{
        month_list.classList.remove('show') ;
        curr_month.value = index;
        generateCalender(curr_month.value,curr_year.value);
    };
    month_list.appendChild(month);
});


let month_picker = calender.querySelector('#month_picker');

month_picker.onclick = ()=>{
    month_list.classList.add('show');
};

let currDate = new Date();

let curr_month = {value:currDate.getMonth()};
let curr_year = {value:currDate.getFullYear()};

generateCalender(curr_month.value,curr_year.value);

document.querySelector('#prev_year').onclick = ()=>{
    --curr_year.value
    generateCalender(curr_month.value,curr_year.value)
}
document.querySelector('#next_year').onclick = ()=>{
    ++curr_year.value
    generateCalender(curr_month.value,curr_year.value)
}



document.getElementById('close').addEventListener('click',()=>parent.postMessage('closeIframe', '*'))

