function onNewRegistration(e) {
  const r = e ? e.range.getRow() - 2 : 0;

  let id = get(r, 'ID');
  let status = 'edit';
  if (id === '') {
    status = 'newEntry';
    id = ++ID; P.setProperty('ID', id);
    set(r, 'ID', id);

    if (get(r, 'EDIT_URL') === '') {
      set(r, 'EDIT_URL', FORM.getResponses(get(r, 'Timestamp'))[0].getEditResponseUrl());
    }

    if (id < 0) set(r, 'REMARK', 'test')
    sync();
  }
  
  const from = get(r, 'Email Address');
  const subject = '第49回可視化情報シンポジウム【参加登録】';
  const message = info(r);

  MailApp.sendEmail(from, subject, message);

  MailApp.sendEmail(
    EMAIL_DEBUG,
    status === 'newEntry' ? 'VSJS2021: 参加登録の通知' : 'VSJS2021: 参加登録情報の修正',
    message.split(/.*--記--*\n/)[1]);
}