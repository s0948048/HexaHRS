function initializePage(){

    //專案部屬時要執行這行，把所有先清空再接續作業！
// localStorage.clear();

//公告存放
    const announcements = [
        {id:'anu_2024_08_03', title:'豆腐切, 是不是!',      date:'2021-10-08',  content:'山下的風景雖然迷人，但總覺得有股奇怪的味道。'},
        {id:'anu_2024_08_04', title:'青蛙跳, 路邊水坑。',   date:'2021-10-09',  content:'那隻青蛙看著天，似乎在思考宇宙的奧秘。'},
        {id:'anu_2024_08_05', title:'沙灘腳印, 消失了。',   date:'2021-10-10',  content:'海浪衝刷一切，留下的只有遠方的漁船影子。'},
        {id:'anu_2024_08_06', title:'風中衣, 不見了。',     date:'2021-10-12',  content:'那件衣服隨風飄走，竟飛到了隔壁阿伯家的屋頂。'},
        {id:'anu_2024_08_09', title:'頭頂帽, 被風吹走。',   date:'2021-10-15',  content:'帽子飛遠了，跟著它的還有一隻貓咪。'},
        {id:'anu_2024_08_10', title:'燈下蟲, 迷路了。',     date:'2021-10-17',  content:'在燈光下飛舞的蟲子，不知何時找到出口。'},
        {id:'anu_2024_08_11', title:'電線桿, 畫了眼睛。',   date:'2021-10-20',  content:'電線桿默默注視著路人，彷彿在說些什麼。'},
        {id:'anu_2024_08_12', title:'水中月, 躲雲裡。',     date:'2021-10-25',  content:'月亮躲進雲中，留下水波輕輕搖晃的倒影。'},
        {id:'anu_2024_08_12', title:'水中月, 躲雲裡。',     date:'2021-10-25',  content:'月亮躲進雲中，留下水波輕輕搖晃的倒影。'},
        {id:'anu_2024_08_13', title:'車輪轉, 路跑了。',     date:'2021-10-29',  content:'車輪不停地轉，路卻消失在地平線的盡頭。'},
        {id:'anu_2024_08_14', title:'茶杯裂, 湯灑了。',     date:'2021-11-01',  content: '茶水順著桌邊流下，像是找尋歸宿。'},
        {id:'anu_2024_08_15', title:'鳥兒啼, 樹葉動。',     date:'2021-11-03',  content: '那聲啼叫似乎在呼喚，卻不知呼喚誰。'},
        {id:'anu_2024_08_16', title:'夜深人靜, 星光閃。',   date:'2021-11-05',  content: '星星眨眼間，彷彿在講著古老的故事。'},
        {id:'anu_2024_08_17', title:'石子丟, 水中響。',     date:'2021-11-07',  content: '水面漣漪一圈圈擴散，帶走了白日的熱氣。'},
        {id:'anu_2024_08_18', title:'樹下貓, 打盹了。',     date:'2021-11-09',  content: '貓咪懶洋洋地躺著，夢裡是否有魚？'},
        {id:'anu_2024_08_19', title:'風聲急, 樹葉落。',     date:'2021-11-12',  content: '葉子飄在空中，猶如在舞動最後的禮讚。'},
        {id:'anu_2024_08_20', title:'魚躍水, 波紋擴。',     date:'2021-11-14',  content: '那一瞬間，彷彿水面也在微笑。'},
        {id:'anu_2024_08_21', title:'煙霧繚繞, 茶香飄。',   date:'2021-11-16',  content: '一杯茶，隨著時間慢慢冷卻，故事卻未結束。'},
        {id:'anu_2024_08_22', title:'書頁翻, 風輕拂。',     date:'2021-11-18',  content: '字句間藏著的秘密，或許只有風知道。'},
        {id:'anu_2024_08_23', title:'河中舟, 隨波行。',     date:'2021-11-20',  content: '小船不知何時靠岸，隨波逐流地遠去。'}

    ];
    // localStorage.removeItem('announcements');
    localStorage.setItem('announcements',JSON.stringify(announcements));

//薪資架構
fetch('/data/salary_structure.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('salaryStructure',JSON.stringify(data));
})
// console.log(localStorage.getItem('salary_structure'));


//個人薪資...會從個人資料抓，所以是個人資料==
//employeeData
fetch('/data/employeeData.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('employeeData',JSON.stringify(data));
})

//考勤紀錄，最肥ㄉ><
//attendance
fetch('/data/attendance.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('attendance',JSON.stringify(data));
})

//假勤紀錄
//leave_detail
fetch('/data/leave_detail.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('leaveDetail',JSON.stringify(data));
})

//異常紀錄
//leave_brief
fetch('/data/leave_brief.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('leaveBrief',JSON.stringify(data));
})

//假勤架構
//leave_structure
fetch('/data/leave_structure.json')
.then(Response=>Response.json())
.then(data=>{
    localStorage.setItem('leaveStructure',JSON.stringify(data));
})


}
initializePage()