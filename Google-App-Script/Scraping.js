function myFunction () {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheetData = book.getSheetByName("sheet3");
  var rowSheet = sheetData.getDataRange().getLastRow(); //シートの使用範囲のうち最終行を取得
  
  for(var i=2; i<=rowSheet; i++){
    var value = sheetData.getRange(i,1).getValue();　
    var name = encodeURI(value);
    
    var url = 'スクレイピング先のページ';
    var response = UrlFetchApp.fetch(url);
    var html = response.getContentText('UTF-8');

    var searchTag = 'サーチタグ①';
    var index = html.indexOf(searchTag);
      if (index !== -1) {
        var html = html.substring(index + searchTag.length);
        var index = html.indexOf('');
        if (index !== -1) {
          var url2 = html.substring(0, index);
          var response = UrlFetchApp.fetch(url2);
          var html = response.getContentText('UTF-8');
          
          var searchTag = 'サーチタグ②';
          var index = html.indexOf(searchTag);
          if (index !== -1) {
            var html = html.substring(index + searchTag.length);
            var index = html.indexOf('');
              if (index !== -1) {
                sheetData.getRange(i,5).setValue(html.substring(0, index));
        }
          var searchTag = 'サーチタグ③';
          var index = html.indexOf(searchTag);
          if (index !== -1) {
            var html = html.substring(index + searchTag.length);
            var index = html.indexOf('');
              if (index !== -1) {
                sheetData.getRange(i,4).setValue(html.substring(0, index));
        }
      }
  }
}}
}}