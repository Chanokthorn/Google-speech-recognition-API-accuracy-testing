function longestCommonSubsequence(arr1, arr2) {
    var dp = [];
  
    for(var i = 0 ; i <= arr1.length; i++) {
      dp.push([]);
      for(var j = 0; j <= arr2.length; j++) {
        dp[i].push(0);
      }
    }
  
    var result = [];
  
    for(i = 1 ; i <= arr1.length; i++) {
      for(j = 1; j <= arr2.length; j++) {
        if(arr1[i-1] === arr2[j-1]) {
          dp[i][j] = dp[i-1][j-1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
      }
    }
  
    return dp[arr1.length][arr2.length];
  }
