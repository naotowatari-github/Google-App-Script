function function1() {
  /* アクティブなGSSの取得 */
  var objSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = objSpreadsheet.getActiveSheet();
  var objCell = objSheet.getActiveCell();

  /* メールの設定 */
  var strFrom = "会社のアドレス"; //From
  var strSender = "株式会社xx 採用事務局"; //差出人

  /* 応募者の情報 */   
  var name = objSheet.getRange(objCell.getRow(),2).getValue();　//応募者のフルネーム
  var surname = objSheet.getRange(objCell.getRow(),4).getValue();　//応募者の名字
  var email = objSheet.getRange(objCell.getRow(),3).getValue();　//応募者のメールアドレス
  
  /* 担当者の情報取得 */  
  var incharge = objSheet.getRange(objCell.getRow(),7).getValue();　//担当者情報の名前
  
  /* 担当者の候補日の取得 */  
  var manageSheet = objSpreadsheet.getSheetByName('担当者情報'); //担当者情報のシート   
  var dat = manageSheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
  for(var i=1;i<dat.length;i++){
    if(dat[i][0] == incharge){
      var number = i + 1;
      var date1 = manageSheet.getRange(number,3).getValue();　//第一候補日
      var date2 = manageSheet.getRange(number,4).getValue();　//第二候補日
      var date3 = manageSheet.getRange(number,5).getValue();　//第三候補日
    }
  }
    
  /* 文章の取得 */
  var docTest = DocumentApp.openById("1yu1iViLigGXmC0c4isu3Xq9OhmmZXdEvmHxdfaDoXuA"); //日程調整メールを取得
  var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得

  if(objCell.getColumn() == 9){
    var strBody = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'この度は弊社の選考にご応募いただき、\n誠にありがとうございます。').replace(/{名字}/,surname).replace(/{挨拶2}/,'ぜひ1次面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, ""); //面接候補日を置換
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'この度は弊社の選考にご応募いただき、\n誠にありがとうございます。').replace(/{名字}/,surname).replace(/{挨拶2}/,'ぜひ1次面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, "\\n"); //面接候補日を置換    
    var subject = "1次面接の日程調整"
    var strSubject = "面接の日程につきまして"; //表題
  } else if (objCell.getColumn() == 11) {
    var strBody = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'先日は1次面接にお越しいただきまして、\n誠にありがとうございました。').replace(/{名字}/,surname).replace(/{挨拶2}/,'選考の結果、2次面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, ""); //面接候補日を置換  
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'先日は1次面接にお越しいただきまして、\n誠にありがとうございました。').replace(/{名字}/,surname).replace(/{挨拶2}/,'選考の結果、2次面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, "\\n"); //面接候補日を置換  
    var subject = "1次面接合格・2次面接の日程調整"
    var strSubject = "選考の結果と次回面接の日程につきまして"; //表題
} else if (objCell.getColumn() == 13) {
    var strBody = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'先日は2次面接にお越しいただきまして、\n誠にありがとうございました。').replace(/{名字}/,surname).replace(/{挨拶2}/,'選考の結果、最終面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, ""); //面接候補日を置換  
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{挨拶1}/,'先日は1次面接にお越しいただきまして、\n誠にありがとうございました。').replace(/{名字}/,surname).replace(/{挨拶2}/,'選考の結果、2次面接に進んでいただきたく存じます。')
    .replace(/{候補日1}/,date1).replace(/{候補日2}/,date2).replace(/{候補日3}/,date3).replace(/{改行}/g, "\\n"); //面接候補日を置換  
    var subject = "2次面接合格・最終面接の日程調整"
    var strSubject = "選考の結果と次回面接の日程につきまして"; //表題
}
  var separate = "======================================="
  var confirm = Browser.msgBox("内容を確認して下さい", "対象者：" + name + 　"\\n件名　："+ subject + "\\n\\n内容：　\\n" + separate + "\\n"
  + content_confirm + "\\n" + separate + "\\n" + "\\n\\n送信しますか？",Browser.Buttons.OK_CANCEL);

  if(confirm == "ok"){
     GmailApp.sendEmail(
       email, //toアドレス
       strSubject,  //表題
       strBody,　//本文
       {
         from: strFrom,　//fromアドレス
         name: strSender　//差出人
       }
     )
     var rest = MailApp.getRemainingDailyQuota();
     Browser.msgBox("送信が完了しました！\n本日残り送信可能件数：" + rest + "件");
    }　else if(confirm == "cancel"){
     Browser.msgBox("送信をキャンセルしました。\n本日残り送信可能件数：" + rest + "件"); 
    }
}

/* 面接日程確定メール・内定通知メール・不採用通知メール */
function function2() {
  /* アクティブなGSSの取得 */
  var objSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = objSpreadsheet.getActiveSheet();
  var objCell = objSheet.getActiveCell();

  /* 応募者の名前、メールアドレス、面接開始時刻と終了時刻の取得 */
  var name = objSheet.getRange(objCell.getRow(),2).getValue();　//応募者の名前
  var surname = objSheet.getRange(objCell.getRow(),4).getValue();　//応募者の名字
  var email = objSheet.getRange(objCell.getRow(),3).getValue();　//応募者のメールアドレス
  var interview_date1 = objSheet.getRange(objCell.getRow(),6).getValue();　//面接開始時刻
  var interview_date2 = objSheet.getRange(objCell.getRow(),6).getValue();　//面接終了時刻
  var dt = new Date(interview_date2.setHours(interview_date2.getHours() + 1));//（開始時刻の1時間後）
  
  var arr_day = new Array('日', '月', '火', '水', '木', '金', '土');
  var day_num = interview_date1.getDay();
  var day = arr_day[day_num];

  var interview_date3 = Utilities.formatDate(interview_date1, 'JST', 'yyyy年M月d日（' + day + '）H時')

  /* メールの設定 */
  var strFrom="会社のアドレス"; //From
  var strSender="株式会社xx 採用事務局"; //差出人
  
  /* 選考プロセスごとのメール内容の分岐 */
  if (objCell.getColumn() == 8) {
    var docTest = DocumentApp.openById("1ESF8305MY8Fa8IyrrNtaItqQmx59ODJF0AgHTIhrwBM"); //不採用通知
    var subject = "不採用通知"
    var strSubject = "選考の結果につきまして"; //表題
    var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得
    var strBody= strDoc.replace(/{名前}/,name).replace(/{名字}/,surname).replace(/{改行}/g, "");
    var content_confirm= strDoc.replace(/{名前}/,name).replace(/{名字}/,surname).replace(/{改行}/g, "\\n");   
  } else if(objCell.getColumn() == 10){ 
    var docTest = DocumentApp.openById("1PVqjrZf1b-2QFYHUE5N5leZkVwZYrKLQ3MKzKzwCkwM"); //面接確定共通   
    var subject = "1次面接日程確定"
    var strSubject = "面接の日程につきまして"; //表題
    var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得
    var strBody = strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'1次').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, ""); //名前と面接日時を置換
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'1次').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, "\\n"); //メール内容確認
  } else if (objCell.getColumn() == 12) {
    var docTest = DocumentApp.openById("1PVqjrZf1b-2QFYHUE5N5leZkVwZYrKLQ3MKzKzwCkwM"); //面接確定共通
    var subject = "2次面接日程確定"
    var strSubject = "面接の日程につきまして"; //表題
    var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得
    var strBody= strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'2次').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, ""); //名前と面接日時を置換
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'2次').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, "\\n"); //メール内容確認
} else if (objCell.getColumn() == 14) {
    var docTest = DocumentApp.openById("1PVqjrZf1b-2QFYHUE5N5leZkVwZYrKLQ3MKzKzwCkwM"); //面接確定共通
    var subject = "最終面接日程確定"
    var strSubject = "面接の日程につきまして"; //表題
    var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得
    var strBody= strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'最終').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, ""); //名前と面接日時を置換
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{面接フェーズ}/,'最終').replace(/{面接日時}/,interview_date3).replace(/{改行}/g, "\\n"); //メール内容確認
} else if (objCell.getColumn() == 15) {
    var docTest = DocumentApp.openById("13eiBfGoYg6JbUV7DO7-0VrjjtpDTOxhlWqUJCsNHulc"); //内定通知
    var subject = "内定通知"
    var strSubject = "選考の結果につきまして"; //表題
    var strDoc = docTest.getBody().getText(); //ドキュメントの内容を取得  
    var strBody= strDoc.replace(/{名前}/,name).replace(/{改行}/g, ""); 
    var content_confirm = strDoc.replace(/{名前}/,name).replace(/{改行}/g, "\\n"); //メール内容確認
  }
  
  //メッセージボックスでの確認
  var separate = "======================================="
  var confirm = Browser.msgBox("内容を確認して下さい", "対象者：" + name + 　"\\n件名　："+ subject + "\\n\\n内容：　\\n" + separate + "\\n"
  + content_confirm + "\\n" + separate + "\\n" + "\\n\\n送信しますか？",Browser.Buttons.OK_CANCEL);
  
  //確認OKならメール送信
  if(confirm == "ok"){
     GmailApp.sendEmail(
       email, //toアドレス
       strSubject,  //表題
       strBody,　//本文
       {
         from: strFrom,　//fromアドレス
         name: strSender　//差出人
       }
     )
     var rest = MailApp.getRemainingDailyQuota();
     Browser.msgBox("送信が完了しました！\n本日残り送信可能件数：" + rest + "件");
  /* 担当者の情報取得 */  
    var incharge = objSheet.getRange(objCell.getRow(),7).getValue();　//担当者情報の名前
    
    /* 担当者の候補日の取得 */  
    var manageSheet = objSpreadsheet.getSheetByName('担当者情報'); //担当者情報のシート   
    var dat = manageSheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得
    for(var i=1;i<dat.length;i++){
      if(dat[i][0] == incharge){
        var number = i + 1;
        var employee_email = manageSheet.getRange(number,2).getValue();　//担当者のメールアドレス取得
      }
    }
    
    /* カレンダーイベントの生成*/
    var myCal = CalendarApp.getCalendarById(employee_email); //担当者のカレンダー取得
    myCal.createEvent('面接：' + name + 'さん', new Date(interview_date1), new Date(interview_date2)); //イベントの生成
 
    }　else if(confirm == "cancel"){
    var rest = MailApp.getRemainingDailyQuota();
     Browser.msgBox("送信をキャンセルしました。\n本日残り送信可能件数：" + rest + "件"); 
        }
    }

