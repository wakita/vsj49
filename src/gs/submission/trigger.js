const FORM = FormApp.openById('1iRefDHt1gP7NL7iVCMECPv2WOhYeBoyDcrsTXWllT2E');

const P = PropertiesService.getScriptProperties();  // (PAPER_ID)
var PAPER_ID = parseInt(P.getProperty('PAPER_ID'));  // 最後に割り当てた論文番号を表のプロパティとして保存している。

const SHEET = SpreadsheetApp.getActive().getSheetByName('Form responses 1');
const COLUMNS = SHEET.getRange(1, 1, 1, SHEET.getMaxColumns()).getValues()[0];

function log(x) {
  if (DEBUG) Logger.log(x);
}

function reset() {
  P.setProperty('PAPER_ID', 0);
  if (SHEET.getRange(1, 1).getValue() === 'PAPER_ID') SHEET.deleteColumn(1);
  if (SHEET.getRange(1, 1).getValue() === 'EDIT_URL') SHEET.deleteColumn(1);
  if (SHEET.getRange(1, 1).getValue() === 'REMARK') SHEET.deleteColumn(1);

  if (SHEET.getRange(1, 1).getValue() == 'Timestamp') {
    SHEET.insertColumnsBefore(1, 3);
    SHEET.getRange(1, 1, 1, 3).setValues([['PAPER_ID', 'REMARK', 'EDIT_URL']]);

    const LastRow = SHEET.getLastRow();
    if (LastRow <= 1) return;

    { // Paper ID についての処理
      SHEET.getRange('A2:A').setNumberFormat(0);  // PAPER_ID 欄に数値形式を指定

      /* 既存のすべての回答に番号を振る
      * すこしコードが読み難いのはご勘弁：要素ごとに番号を代入すると大量のAPIを発行して時間がかかる。
      * ここでは、ID を設定したいすべての行を一気に設定している。
      */
      SHEET.getRange(2, 1, LastRow - 1).setValues(Array.from({length: LastRow - 1}, (x, i) => [i + 1]));
      P.setProperty('PAPER_ID', LastRow - 1);
    }

    { // Edit URL についての処理
      // 表のなかのすべての Timestamp を取得
      const timestamps = SHEET.getRange(2, _TIMESTAMP, LastRow-1, 1).getValues();
      // Timestamp から該当する編集リンクを作成
      const URLs = timestamps.map(r => [FORM.getResponses(r[0])[0].getEditResponseUrl()]);
      // EDIT_URL欄に編集リンクを設定
      SHEET.getRange(2, _EDIT_URL, LastRow-1, 1).setValues(URLs);
    }

    // Remark は空欄
  }
}

function onFormSubmit(e) {
  const [_PAPER_ID, _REMARK, _EDIT_URL, _TIMESTAMP, _EMAIL] = ['PAPER_ID', 'REMARK', 'EDIT_URL', 'Timestamp', 'Email Address'].map(attr => COLUMNS.indexOf(attr) + 1);

  const row = e ? e.range.getRow() : 42;
  log([row, _PAPER_ID, 1, _EMAIL]);

  var meta = [paper_id, remark, edit_url, timestamp, email] = SHEET.getRange(row, _PAPER_ID, 1, _EMAIL).getValues()[0];
  var status;
  log(meta);

  if (paper_id === '') {  // PAPER ID が割り当てられていないということは、（既存の回答の修正ではなく）新しい回答
    paper_id = ++PAPER_ID; P.setProperty('PAPER_ID', paper_id);
    SHEET.getRange(row, _PAPER_ID).setValue(paper_id);
    status = 'submitted';
  } else status = 'updated';

  if (edit_url === '') {
    edit_url = FORM.getResponses(timestamp)[0].getEditResponseUrl();
    SHEET.getRange(row, _EDIT_URL).setValue(edit_url);
  }

  const subject = 'Thank you for submitting to VSJS 2021!';
  const message = `Dear authors of the 49th VSJ Symposium / 第49回 可視化情報シンポジウムの著者のみなさま、

発表申し込みをありがとうございます。論文番号と再編集URLについて以下に英文で説明させていただきます。

Thank you for your contribution!

For future reference, please keep your paper ID (${paper_id}) and the following form edit URL:
    ${edit_url}

Using the form edit URL, you can review and update your paper information at any time before the due date.  You can also use it to (re-)submit (paper/論文 and survey sheet/調査票).`;

  try {
    log([typeof(email), email]);
    if (email !== '') MailApp.sendEmail(email, subject, message);
  } catch (e) {
    log('Error:' + e);
  }
}