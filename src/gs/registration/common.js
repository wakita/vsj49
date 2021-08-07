const P = PropertiesService.getScriptProperties();

const FORM_ID = '1u4ZeagisgjKxJBQMYnDD3liZJwhf-3s9JIYLgcx7Lbc';
const FORM = FormApp.openById(FORM_ID);

const SHEET_ID = '147n__4QXF_xIEfXjPEAzxQpJTx18QrQO80TTtQ6_7ts';
const SHEET = SpreadsheetApp.getActive().getSheetByName('Form Responses 1');
const LAST_ROW = SHEET.getLastRow();
const ALL_DATA = SHEET.getRange(1, 1, LAST_ROW, SHEET.getLastColumn()).getValues();
const KEYS = ALL_DATA[0];
const DATA = ALL_DATA.slice(1);

function resetProperty() {
  P.setProperty('ID', -995);
  log(P.getProperty('ID'));
}

var ID = parseInt(P.getProperty('ID'));

// data をキャッシュとして、基本的にそこに読み書きし、行単位で表の管理部だけを書き換える API がバグの介在が少なそうだ。
// get(data, row, 'Remarks') => 'cancel'
// set(data, row, 'Remarks', 'test')
// sync(data): data のうち事務局管理のデータの部分を書き戻す

function get(r, key) {
  const row = DATA[r];
  return row[KEYS.indexOf(key)];
}

function set(r, key, value) {
  const row = DATA[r];
  row[KEYS.indexOf(key)] = value;
}

function sync() {
  const _EditUrl = KEYS.indexOf('EDIT_URL');
  const values = [];
  for (i in DATA) values.push(DATA[i].slice(0, _EditUrl + 1));
  SHEET.getRange(2, 1, values.length, KEYS.indexOf('EDIT_URL') + 1).setValues(values);
}

function log() {
  const l = [];
  for (const i in arguments) l.push(arguments[i]);
  Logger.log.apply(null, l);
}

const EMAIL_OC = 'symp2021@vsj.jp'
const EMAIL_DEBUG = 'wakita@is.titech.ac.jp, imash@do-johodai.ac.jp'
const EMAIL_KW = 'wakita@is.titech.ac.jp';

function info(r) {
  const row = DATA[r];
  let message = ON_NEW_REGISTRATION_REPLY_TEMPLATE;
  for (i in KEYS) message = message.replaceAll(`<${KEYS[i]}>`, row[i]);
  return message;
}

function _set_meta() {
  log(`LAST_ROW: ${LAST_ROW}`);
  const r = 0;
  set(r, 'ID', -1);
  set(r, 'REMARK', 'test');
  const timestamp = get(r, 'Timestamp');
  log(`timestamp: ${timestamp}`);
  const response = FORM.getResponses(timestamp)[0];
  log(`Response: ${response}`);
  log(response.getEditResponseUrl());
  set(r, 'EDIT_URL', FORM.getResponses(get(r, 'Timestamp'))[0].getEditResponseUrl());

  sync();
}

function test() {
  //log(KEYS);
  //_set_meta();
}

const ON_NEW_REGISTRATION_REPLY_TEMPLATE = (
`<Timestamp>

<姓> <名> 様
第49回可視化情報シンポジウムへの参加申し込みを参加申し込み有り難うございます。
下記内容で参加登録を受け付けました。
Thank you for your registration. Registration has been accepted.

登録内容の訂正が必要な場合は以下の編集 URL から修正できます。
<EDIT_URL>

参加登録料は、講演者の方は2021年8月20日(金)まで、
それ以外の方は2021年9月3日(金)までに以下の銀行口座へお振込み下さい。
　銀行名：みずほ銀行（0001）
　支店名：甲府支店（408）
　貯金種目：普通預金
　口座番号：4110464
　受取人：第49回可視化情報シンポジウム
 ［振込時のお願い］
　1) 銀行振込の際、「参加登録番号、参加者（代表者）氏名」を続けてご入力下さい。
　　 ATM、ネットバンキングの場合：「依頼人名」001カシカタロウ
　　 振込依頼書の場合：「通信欄」001可視化太郎
　　 ※恐れ入りますが、振込手数料はお振込人各自でご負担下さい。
　　 ※複数名分を一括で振り込む場合は、どなたの分を振り込んだのか事務局（symp2021@vsj.jp）に
　　 　ご連絡ください。
　2) 参加登録料の入金を確認した後，講演会参加方法等をEmailにてご連絡差し上げます．
　　 第49回 可視化情報シンポジウム
　　 実行委員長　藤代　一成
---------------------------記----------------------------------
  [参加登録番号] <ID>
  [氏名] <姓> <名>
  　　　　<せい> <めい>
  　　　　<First name> <Family name>
  [所属] <所属機関名>
  [部署] <所属部署>
  [郵便] <郵便番号>
  [住所] <住所>
  [電話] <電話番号>
  [E-mail] <Email Address>
  [会員資格] <会員資格> (<会員番号>)
  [参加区分] <参加区分>
  [参加形態] <参加形態>
  [出展企業への情報提供] <出展企業への情報提供>`).replace('\t', ' ');
