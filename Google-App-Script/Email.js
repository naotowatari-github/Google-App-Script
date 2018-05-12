function myFunction() {
  var url = "";
  var spreadsheet = SpreadsheetApp.openByUrl(url);
  var sheet = spreadsheet.getSheetByName("集計");             //一番左のシートは配列のindex"0"で指定します
  
  var today = Utilities.formatDate(new Date(), "Asia/Tokyo", "MM-dd");
  var data = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
  for(var i=1; i<data.length; i++){
    if(Utilities.formatDate(data[i][0], "Asia/Tokyo", "MM-dd") == today){
      var number = i + 1;
      var eat = sheet.getRange(number,2).getValue();　//食べる人数
      var noEat = sheet.getRange(number,3).getValue();　//食べない人数
    }
  }
  
  var message = "=========================\n給食を食べる人数　：" + eat + "人\n給食を食べない人数：" + noEat + "人\n=========================";
  
  var email = "宛先のアドレス";
  var strSubject = "本日給食を食べる人数";
  var strBody = "〇〇さん\n\n\nお疲れ様です。\n\n本日は\n" + message + "\nになっております。\n\n何卒よろしくお願いいたします。\n\n\n"  
  var strFrom="自分のアドレス"; //From
  var strSender="差出人名"; //差出人
  
  GmailApp.sendEmail(
       email, //toアドレス
       strSubject,  //表題
       strBody,　//本文
       {
         from: strFrom,　//fromアドレス
         name: strSender　//差出人
       }
     )

}
