function dailyReport() {
  const subject = '参加登録概況';

  const hist = {
    '会員資格': {},
    '参加区分': {},
    '参加形態': {},
    '出展企業への情報提供': {}
  };

  let entries = 0;

  for (let r = 0; r < DATA.length; r++) {
    if (get(r, 'ID') <= 0) continue;
    entries++;
    for (k in hist) {
      const v = get(r, k);
      const n = v in hist[k] ? hist[k][v] : 0;
      hist[k][v] = n + 1;
    }
  }

  let message = [];

  for (let k in hist) {
    message.push(`## ${k}`);
    const options = hist[k];
    for (let j in options) {
      message.push(`- ${j}: ${options[j]}`);
    }
    message.push('');
  }

  let lead = [
    '本日の参加登録概況を報告します。', '',
    `参加登録者数: ${entries}名`, ''];

  message = lead.concat(message).join('\n');
  //log(message);
  MailApp.sendEmail(EMAIL_OC, subject, message);
}


function makeCopy() {
  const d = new Date();
  let date = `${d.getDate()}`
  let month = `${d.getMonth() + 1}`
  if (date.length == 1) date = '0' + date;
  if (month.length == 1) month = '0' + month;
  const DataFolderID = '1OgJAuxQxyh1nfDV1hrjFeCqj3yxp1d4U';
  DriveApp.getFileById(SHEET_ID).makeCopy(`${month}${date}-参加申込`, DriveApp.getFolderById(DataFolderID));
}

function daily() {
  dailyReport();
  makeCopy();
}