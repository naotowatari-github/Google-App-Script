// 実行したいスクリプト本体
function main() {
  var objSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = objSpreadsheet.getActiveSheet();
  var objCell = objSheet.getActiveCell();
   
  var today = Utilities.formatDate(new Date(), "Asia/Tokyo", "MM-dd");

  var data = objSheet.getRange(2, 3, objSheet.getLastRow() - 1).getValues();

  var array = [];

　for(var i=0; i<data.length; i++){
    if(Utilities.formatDate(data[i][0], "Asia/Tokyo", "MM-dd") == today){
        var happyman = objSheet.getRange(i+2, 2).getValue();
        array.push(happyman);
        Logger.log(array);
        
          var postUrl = '';
          var username = 'Happy Birthday';  // 通知時に表示されるユーザー名
          var icon = ':birthday:';  // 通知時に表示されるアイコン
          var message = '今日は' + array + 'の誕生日です。おめでとうございます！';  // 投稿メッセージ
          }
  }
  
  if (array != ""){
    var jsonData =
        {
          "username" : username,
          "icon_emoji": icon,
          "text" : message
        };
    var payload = JSON.stringify(jsonData);
    
    var options =
        {
          "method" : "post",
          "contentType" : "application/json",
          "payload" : payload
        };
    
    UrlFetchApp.fetch(postUrl, options);
  }
}
