let jsonData = {}; // 用來存放從檔案讀取的JSON資料
const rowsPerPage = 3; // 每頁顯示的列數
let currentPage = 1;

function displayTablePage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const employeesToDisplay = jsonData.employee.slice(start, end);

    // 清空現有的表格欄位
    for (let i = 1; i <= rowsPerPage; i++) {
        document.getElementById(`row${i}-col1`).innerText = '';
        document.getElementById(`row${i}-col2`).innerText = '';
        document.getElementById(`row${i}-col3`).innerText = '';
        document.getElementById(`row${i}-col4`).innerText = '';
        document.getElementById(`row${i}-col5`).innerText = '';
    }

    // 將新資料賦值給表格
    employeesToDisplay.forEach((employee, index) => {
        document.getElementById(`row${index + 1}-col1`).innerText = employee.id;
        document.getElementById(`row${index + 1}-col2`).innerText = employee.name;
        document.getElementById(`row${index + 1}-col3`).innerText = employee.sex;
        document.getElementById(`row${index + 1}-col4`).innerText = employee.birthday;
        document.getElementById(`row${index + 1}-col5`).innerText = employee.position;
    });

    // 控制下一頁按鈕的顯示
    const nextPageButton = document.getElementById('next-page');
    if (jsonData.employee.length > end) {
        nextPageButton.style.display = 'block';
    } else {
        nextPageButton.style.display = 'none';
    }
}

document.getElementById('next-page').addEventListener('click', function() {
    currentPage++;
    displayTablePage(currentPage);
});

// 初始化表格顯示
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        displayTablePage(currentPage);
    })
    .catch(error => console.error('Error loading JSON:', error));
