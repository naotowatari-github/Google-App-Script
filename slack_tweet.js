// 認証用インスタンス
var twitter = TwitterWebService.getInstance(
  'Consumer Key',　// 作成したアプリケーションのConsumer Key
  'Consumer Secret'　// 作成したアプリケーションのConsumer Secret
);

// 認証
function authorize() {
  twitter.authorize();
}

// 認証解除
function reset() {
  twitter.reset();
}

// 認証後のコールバック
function authCallback(request) {
  return twitter.authCallback(request);
}

function doPost(e) {
  // トークンの確認
  var VERIFY_TOKEN = "Outgoing Webhooksで作成するトークン";
  if (VERIFY_TOKEN != e.parameter.token) {
    throw new Error("invalid token.");
  }
  var message = e.parameter.text;
  // 最初のトリガー文字を消すは余分なので削除
  message = message.substring(トリガーの文字数);
  
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
      method: 'post',
      payload: { status: message }
    });
 }