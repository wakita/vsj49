function PAPER_(f) {
  f.section("講演題目 / Title");

  f.text('和文題目', true, 'Title in Japanese');
  f.text('英文題目', true, 'Title in English');

  f.section("発表要旨・キーワード / Abstract and Keywords");
  f.p('発表要旨', true, "日本語で記述する場合は200文字以内。\nAbstract: Less than 100 words when your abstract is written in English.");
  f.text('キーワード', true, "3つ以内のキーワードを / で区切って記入して下さい。\nSpecify no more than three keywords separated with slash(es).");

  f.section("発表希望セッション / Session to Present");
  f.dropdown('セッション（第１希望）', true, SESSIONS, "もっとも発表を希望するセッションを選んで下さい。\nSelect the session you would like to present the most.");
  f.dropdown('セッション（第２希望）', true, SESSIONS, "第二希望の発表セッションを選んで下さい。\nSelect the second choice of the session you wish to present.");

  f.check('学生プレゼンテーションコンテスト', true,
  ["一般講演のみ / General presentation only", "学生プレゼンテーションコンテストに参加 / Participate in the student presentation contest"]);
}

function AUTHORS_aux_(f, from, to) {
  for (var i = from; i <= to; i++) {
      switch (i) {
      case 1: f.section("筆頭著者 / Primary author"); break;
      case 2: f.section("第2著者 / Second author"); break;
      case 3: f.section("第3著者 / Third author"); break;
      default: f.section(`第${i}著者 / ${i}-th author`);
    }

    const t = (field, description) => f.text(field, i == 1, description);

    t(`姓 (${i})`, `Family name (${i}) in Kanji or Roman alphabet` + "/ 漢字で記入して下さい。漢字名がない場合は半角アルファベットで記入して下さい（例：山田）");
    t(`名 (${i})`, `Given name (${i}) in Kanji or Roman alphabet / 漢字で記入して下さい。漢字名がない場合は半角アルファベットで記入して下さい（例：花子）`);
    t(`所属機関 (${i})`, `Affiliation (${i})`);
    t(`所属略称 (${i})`, `Abbreviation of affiliation (${i})`);
    f.dropdown(`会員資格 (${i})`, i == 1, MEMBERSHIP, `Membership (${i})`);
    t(`会員番号 (${i})\nMembership ID (${i})`, '入会手続中もしくは非会員の方は0000を記入して下さい． / One who is applying for a member or non-member should fill in 0000.')
  }
}

function AUTHORS_(f) {
  f.page(`著者の情報: Author (1) ... Author (5)\nAuthor(s) Info: Author (1) ... Author (5)`);
  AUTHORS_aux_(f, 1, 5);

  f.page(`著者の情報: Author (6) ... Author (10)\nAuthor(s) Info: Author (6) ... Author (10)`);
  AUTHORS_aux_(f, 6, 10);
}

function CONTACT_(f) {
  f.page('連絡先\nContact information');
  f.section("氏名 / Name");
  f.text('姓 （例：山田）', true, 'Family name');
  f.text('名 （例：花子）', true, 'Given name');
  f.text('せい （例：やまだ）', true, 'Family name');
  f.text('めい （例：はなこ）', true, 'Given name');
  f.text('Given name (e.g., Hanako)', true);
  f.text('Family name (e.g., YAMADA)', true);
  f.section("所属 / Affiliation");
  f.text('所属機関', true, 'Affiliation');
  f.text('所属略称', false, 'Abbreviation of affiliation');
  f.section("住所等 / Postal Address");
  f.text('郵便番号', true, 'Zip code');
  f.text('住所', true,  'Address');
  f.text('電話番号', true, 'Phone number');

  f.section('備考 / Remarks');
  f.p('備考', false, 'Remarks');
}

function UPLOAD_(f) {
  f.page("アップロード\nSubmission",
  "講演論文のアップロード / Paper Submission\n期限までに講演原稿をアップロードして下さい．期限までに原稿をご提出いただけない場合、予稿集に収録されない可能性が高くなります。どうぞご了承下さい。\nUpload your manuscript by the due date. Please be reminded that the manuscript may not be included in proceedings if the deadline is missed.");

  f.multiplechoice("講演論文提出前の確認事項", true, [
    "複数のPCで文字化け等がないことを確認しました。 / I confirm that there is no garbled characters in my manuscript.",

    "ページの右上のヘッダは「可視化情報シンポジウム" + YEAR + "となっていることを確認しました。 / I confirm that the upper-right corner of the header reads \"可視化情報シンポジウム" + YEAR + "\".",

    "論文は10ページ以内、3.5MB以下に収まっています。 / I confirm that the manuscript is no more than 10 pages and smaller than 3.5MB.",

    "PDFファイルにフォントを埋め込みました / All fonts are embedded in the PDF file.",

    "講演論文集(USBメモリ)への収録に同意します / I agree to include the manuscript in proceedings."
  ], 'Confirmation before submitting you paper');
}

function Submission_(URL) {
  const f = new MyForm(URL);
  f.form.setDescription(`下記フォームより講演申し込みを受け付けいたします。投稿締切までに、必要事項を記入し、申し込み手続きを完了して下さい。

申し込まれると登録時のメールアドレスに発表番号と発表内容の編集用URLが送付されます。発表申し込み締切日までは、編集用URLを利用して何度も発表内容の修正ができます。過去にアップロードなさった原稿を再アップロードも可能です。

お申し込みに際しまして、下記の事項に十分ご留意下さい。
• ご記入いただいた情報はそのままプログラムに反映されます。
• 原則として、講演申込時の情報はそのまま講演論文の情報となります。
• 和文・英文題目、著者名、共著者順、所属略称に間違いが多く見受けられます。再度の確認をお願いします。
• 申し込み期限後は原則として題目・著者名等の情報は変更できません。`)
  f.clear();
  PAPER_(f);
  AUTHORS_(f);
  CONTACT_(f);
  UPLOAD_(f);
  if (PAGES != page) {
    Logger.log("！！！！！　総ページ数がずれているので再生成して下さい。　！！！！！");
    PAGES = page; PROPS.setProperty('num_pages', PAGES);
  }
  f.log('フォームの構成が完了しました。')
}

function MakeForm() {
  DEBUG = false; Submission_(SUBMISSION_URL);

  DEBUG = true; Submission_(SUBMISSION_SAMPLE_URL);
}