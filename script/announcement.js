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





}
initializePage();