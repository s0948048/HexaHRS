function updateChart(percentages) {
    // 根據百分比直接設置顏色和範圍
    const gradient = `conic-gradient(
      #2196f3 0% ${percentages[0]}%,          /* 第一個區塊 */
      #00bcd4 ${percentages[0]}% ${percentages[0] + percentages[1]}%,  /* 第二個區塊 */
      #e91e63 ${percentages[0] + percentages[1]}% ${percentages[0] + percentages[1] + percentages[2]}%,  /* 第三個區塊 */
      #ff9800 ${percentages[0] + percentages[1] + percentages[2]}% ${percentages[0] + percentages[1] + percentages[2] + percentages[3]}%, /* 第四個區塊 */
      #9c27b0 ${percentages[0] + percentages[1] + percentages[2] + percentages[3]}% 100% /* 第五個區塊 */
    )`;
  
    // 更新背景
    document.querySelector('.donut-chart').style.background = gradient;
  }
  
  // 直接設定比例，例如 20%、20%、20%、30%、10%
  updateChart([20, 20, 20, 30, 10]);