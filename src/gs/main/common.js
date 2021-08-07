const YEAR = "2021";
var DEBUG = true;

const PROPS = PropertiesService.getScriptProperties();
var PAGES = Math.floor(PROPS.getProperty('num_pages')) || 1;
var page = 0;

const SUBMISSION_URL = 'https://docs.google.com/forms/d/1iRefDHt1gP7NL7iVCMECPv2WOhYeBoyDcrsTXWllT2E/';
const SUBMISSION_SAMPLE_URL = 'https://docs.google.com/forms/d/1Jf2qwfquWGsZ1Vj2wu122_6nd5olRFMXRHml7M5ldfg/';

const ORGANIZED_SESSIONS = `ウェーブレットと知的可視化の応用
レーザ利用の可視化と計測
蛍光・燐光を用いた熱流体計測
マイクロ・ナノ輸送現象の可視化
渦，はく離，後流の可視化
超音波を用いた流体計測
生物・生体まわりの可視化
サイエンティフィックアート＆スポーツ
ソーシャルデータの可視化
ビジュアルデータサイエンス
心理情報
人工知能と可視化
地球環境・災害の可視化
乱流および乱流遷移現象の可視化
医療に関わる可視化`.split('\n');

const SESSIONS = ['一般'].concat(ORGANIZED_SESSIONS);

const MEMBERSHIP = [
  '会員/Member', '学生会員/Member (student)',
  '会員：入会手続中/Member: applying', '学生会員：入会手続中/Member (student): applying',
  '非会員/Non-member' ];

class MyForm {
  constructor(form_url) {
    const form = this.form = FormApp.openByUrl(form_url);
    const title = DEBUG ? "発表申込フォーム（確認用）" : '発表申込フォーム';
    form.setTitle(title);
    this.log("\n\n" + `${title}の構成`);
    form.setCollectEmail(true);    // [x] Collect email addresses
                                       // [ ] Response receipts := Alwasy の API は存在しない。フォーム作成後に手動で調整すること。
    form.setAllowResponseEdits(true);  // [x] Edit after submit
    form.setPublishingSummary(true);   // [x] See summary charts and text responses
  }

  log() {
    const l = [];
    for (const i in arguments) l.push(arguments[i]);
    Logger.log.apply(null, l);
  }

  clear() {
    this.form.getItems().forEach(item => this.form.deleteItem(item));
  }

  page(title) {
    if (DEBUG) {
      title = `Section ${title}`;
      this.log(title);
      return this.form.addSectionHeaderItem().setTitle(title);
    } else {
      title = `Page ${++page}/${PAGES}: ${title}`;
      this.log(title);
      return this.form.addPageBreakItem().setTitle(title);
    }
  }

  section(title, description) {
    const item = this.form.addSectionHeaderItem().setTitle(title);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }

  text(title, required, description) {
    const item = this.form.addTextItem().setTitle(title).setRequired(required);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }

  p(title, required, description) {
    const item = this.form.addTextItem().setTitle(title).setRequired(required);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }

  check(title, required, options, description) {
    const item = this.form.addCheckboxItem().setTitle(title).setRequired(required).setChoiceValues(options);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }

  dropdown(title, required, options, description) {
    const item = this.form.addListItem().setTitle(title).setRequired(required).setChoiceValues(options);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }

  multiplechoice(title, required, options, description) {
    const item = this.form.addMultipleChoiceItem().setTitle(title).setRequired(required).setChoiceValues(options);
    if (description !== undefined) item.setHelpText(description);
    return item;
  }
}

function doit() {
  Logger.log('' + PAGES);
}