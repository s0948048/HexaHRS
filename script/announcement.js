function initializePage(){

let announcements = JSON.parse(localStorage.getItem('announcements'));
let page = 0;
const pageNumbers = 9 ;
var start;
var end;

function displayAnnouncement(page){
    start = (page)*pageNumbers;
    end = start + pageNumbers;
    // console.log(end);
    
    let announcementToDisplay = announcements.slice(start,end);
    // console.log(announcementToDisplay);

    let announcementInSite = document.getElementById('announcement_list');
    announcementInSite.innerHTML="";
    announcementToDisplay.forEach(element => {
        let announceItem = document.createElement('tbody');
        announceItem.id = element['id'];
        announceItem.innerHTML = `<td>
                                <img src="./src/icon.png" id="icon">
                                <span>${element['title']}</span>
                                <span class="anu_date">${element['date']}</span>
                                </td>`;
        announcementInSite.innerHTML += announceItem.outerHTML;
        
        
    });
    console.log(announcements.length);
    console.log(end);

    //按鈕顯示與否
    const lastPageButton = document.getElementById('anu_last_page');
    if (page == 0) {
        lastPageButton.style.display = 'none';
    } else {
        lastPageButton.style.display = 'block';
    }
    const nextPageButton = document.getElementById('anu_next_page');
    if (announcements.length > end) {
        nextPageButton.style.display = 'block';
    } else {
        nextPageButton.style.display = 'none';
    }


}
displayAnnouncement(page);



document.getElementById('anu_next_page').addEventListener('click', function() {
    page++;
    displayAnnouncement(page);
    console.log(page);
    
});
document.getElementById('anu_last_page').addEventListener('click', function() {
    page--;
    displayAnnouncement(page);
    console.log(page);
    
});

//彈出視窗
const anuPopUp = document.getElementById('add_anu');


const anuPopUp_close = document.getElementById('pop_anu_cnl');
anuPopUp_close.addEventListener('click',()=>anuPopUp.style.display = 'none');

let announcementInSite = document.getElementById('announcement_list');
announcementInSite.addEventListener('click',(event)=>{
    if(event.target.closest('tbody')){
        let tbodyid = event.target.closest('tbody').id;
        showAnuDataToPop(tbodyid);
    }
    
})
function showAnuDataToPop(tbodyid){
    announcements.forEach((item)=>{
        if(item['id'] == tbodyid){
            let anu_id = document.getElementById('anu_id');
            let anu_name = document.getElementById('anu_name');
            let anu_date = document.getElementById('anu_date');
            let anu_content = document.getElementById('anu_content');
            anu_id.innerText = item['id'];
            anu_name.value = item['title'];
            anu_date.value = item['date'];
            anu_content.innerText = item['content'];
            anuPopUp.style.display = 'block';
        }
        
    })
    
    


}

}
initializePage();