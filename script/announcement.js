function initializePage(){

let announcements = JSON.parse(localStorage.getItem('announcements'));
let page = 0;
const pageNumbers = 9 ;
var start;
var end;
let anu_id = document.getElementById('anu_id');
let anu_name = document.getElementById('anu_name');
let anu_date = document.getElementById('anu_date');
let anu_content = document.getElementById('anu_content');
//從資料庫拉資料映射到公告頁面上><
function displayAnnouncement(page){
    //每重新載入舊排序一次。
    announcements.sort((a,b)=>new Date(b.date)-new Date(a.date));
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
    // console.log(announcements.length);
    // console.log(end);

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
//翻頁邏輯
document.getElementById('anu_next_page').addEventListener('click', function() {
    page++;
    displayAnnouncement(page);
    // console.log(page);
});
document.getElementById('anu_last_page').addEventListener('click', function() {
    page--;
    displayAnnouncement(page);
    // console.log(page);
});

//彈出視窗物件在這裡！！！
const anuPopUp = document.getElementById('add_anu');

//彈出視窗按鈕物件！！！
const anuPopUp_add = document.getElementById('pop_anu_add');
const anuPopUp_mdf = document.getElementById('pop_anu_mdf');
const anuPopUp_del = document.getElementById('pop_anu_del');
const anuPopUp_cnl = document.getElementById('pop_anu_cnl');


//彈出視窗按鈕事件

//1.關閉
anuPopUp_cnl.addEventListener('click',()=>{
    anuPopUp_mdf.innerHTML = '點擊修改';
    anuPopUp.style.display = 'none';
    anu_name.setAttribute('readonly',true);
    anu_date.setAttribute('readonly',true);
    anu_content.setAttribute('readonly',true);
});
//2.新增
anuPopUp_add.addEventListener('click',()=>{
    if(anu_name.value==''){
        alert('請輸入標題！');
        return; 
    }else if(anu_date.value==''){
        alert('請輸入日期！');
        return;
    }else{
        let getId = anu_id.innerHTML;
        let getName = anu_name.value;
        let getDate = anu_date.value;
        let getContent = anu_content.value;
        announcements[announcements.length] = {id:getId,title:getName,date:getDate,content:getContent};
        anuPopUp.style.display = 'none';
        localStorage.setItem('announcements',JSON.stringify(announcements));
        displayAnnouncement(page);
        anu_name.setAttribute('readonly',true);
        anu_date.setAttribute('readonly',true);
        anu_content.setAttribute('readonly',true);  
    }
})
//3.修改
anuPopUp_mdf.addEventListener('click',()=>{
    if(anuPopUp_mdf.innerHTML =='點擊修改'){
        anuPopUp_mdf.innerHTML = '儲存';
        anu_name.removeAttribute('readonly');
        anu_date.removeAttribute('readonly');
        anu_content.removeAttribute('readonly');
    }else if(anuPopUp_mdf.innerHTML =='儲存'){
        
        announcements.forEach((item)=>{
            if(item.id == anu_id.innerHTML){
                if(anu_name.value === item.title && anu_date.value === item.date && anu_content.value === item.content){
                    alert('您沒有做修改');
                    return;
                }else{
                    item.title = anu_name.value;
                    item.date = anu_date.value;
                    item.content = anu_content.value;
                    anu_name.value='';
                    anu_date.value='';
                    anu_content.value='';
                    anuPopUp.style.display = 'none';
                    anuPopUp_mdf.innerHTML ='點擊修改';
                    localStorage.setItem('announcements',JSON.stringify(announcements));
                    displayAnnouncement(page);
                    anu_name.setAttribute('readonly',true);
                    anu_date.setAttribute('readonly',true);
                    anu_content.setAttribute('readonly',true);
                }
                    
            }
            
        });
            
    }
    

})
    

//4.刪除
anuPopUp_del.addEventListener('click',()=>{
    announcements.forEach((item,index)=>{
        // console.log(item);
        if(anu_id.innerHTML == item.id){
            const delCheck = confirm('確認是否刪除？');
            if(delCheck){
                announcements.splice(index,1);
                localStorage.setItem('announcements',JSON.stringify(announcements));
                // console.log(announcements);
                anuPopUp.style.display = 'none';
                displayAnnouncement(page);
            }
            
        }
    })
})



//點即公告事件
let announcementInSite = document.getElementById('announcement_list');
let tbodyid;
announcementInSite.addEventListener('click',(event)=>{
    if(event.target.closest('tbody')){
        tbodyid = event.target.closest('tbody').id;
        showAnuDataToPop(tbodyid);
    }
})
//彈出視窗可能1：彈出視窗顯示的公告內容嗷嗷嗷
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
            anu_content.value = item['content'];
        //顯示修改、刪除按鈕物件，新增按鈕物件要隱藏~~~
            anuPopUp_add.style.display = 'none';
            anuPopUp_mdf.style.display = 'inline-block';
            anuPopUp_del.style.display = 'inline-block';
            anuPopUp.style.display = 'block';
        }  
    })
}
//彈出視窗可能2：新增公告邏輯嗷嗷嗷
const anu_add = document.getElementById('anu_add_btn');
anu_add.addEventListener('click',()=>{
    let anu_id = document.getElementById('anu_id');
    //清空內容
        anu_name.removeAttribute('readonly');
        anu_date.removeAttribute('readonly');
        anu_content.removeAttribute('readonly');
        anu_id.innerHTML='';
        anu_name.value='';
        let toDay = new Date();
        forMattoDay = toDay.toISOString().split('T')[0];
        anu_date.value=forMattoDay;
        anu_content.value='';
        
    //找到已有最大ID值
        var maxAnuId = announcements.reduce((maxId,currentId)=>{
            const maxId_cmp = parseInt(maxId.split('_').slice(1).join(''),10);
            const currentId_cmp = parseInt(currentId.id.split('_').slice(1).join(''),10);
            return maxId_cmp>currentId_cmp?maxId:currentId.id;
            },announcements[0].id)
        // console.log(maxAnuId);
        var currentMaxId = parseInt(maxAnuId.split('_').slice(1).join(''),10);
        currentMaxId++
        var newMaxId = String(currentMaxId);
        newMaxId = `anu_${newMaxId.substring(0,4)}_${newMaxId.substring(4,6)}_${newMaxId.substring(6,8)}`
    //newMaxId 是建立公告的新ID。
        anu_id.innerHTML = newMaxId;
    //隱藏修改跟刪除按鈕物件
        anuPopUp_add.style.display = 'inline-block';
        anuPopUp_mdf.style.display = 'none';
        anuPopUp_del.style.display = 'none';
        anuPopUp_del.style.display = 'none';
        anuPopUp.style.display = 'block';
})

























}
initializePage();