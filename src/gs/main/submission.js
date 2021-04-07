function PAPER_(f) {
  f.log('Paper page...')
  f.section(`Page 1/${PAGES}\n論文の情報\nPaper Information`);

  f.text('和文題目', true, 'Title in Japanese');
  f.text('英文題目', true, 'Title in English');

  f.p('発表要旨', true, "日本語で記述する場合は200文字以内。\nAbstract: Less than 100 words when your abstract is written in English.");

  f.text('キーワード', true, "3つ以内のキーワードを / で区切って記入して下さい。\nSpecify no more than three keywords separated with slash(es).");

  f.dropdown('セッション（第１希望）', true, SESSIONS, "もっとも発表を希望するセッションを選んで下さい。\nSelect the session you would like to present the most.");
  f.dropdown('セッション（第２希望）', true, SESSIONS, "第二希望の発表セッションを選んで下さい。\nSelect the second choice of the session you wish to present.");

  f.check('学生プレゼンテーションコンテスト', true,
  ["一般講演のみ\nGeneral presentation only", "学生プレゼンテーションコンテストに参加\nParticipate in the student presentation contest"]);
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

    t(`姓 (${i})`, `Family name (${i}) in Kanji or Roman alphabet` + "\n漢字で記入して下さい。漢字名がない場合は半角アルファベットで記入して下さい（例：山田）");
    t(`名 (${i})`, `Given name (${i}) in Kanji or Roman alphabet\n漢字で記入して下さい。漢字名がない場合は半角アルファベットで記入して下さい（例：花子）`);
    t(`所属機関 (${i})`, `Affiliation (${i})`);
    t(`所属略称 (${i})`, `Abbreviation of affiliation (${i})`);
    f.dropdown(`会員資格 (${i})`, i == 1, MEMBERSHIP, `Membership (${i})`);
    t(`会員番号 (${i})\nMembership ID (${i})`, '入会手続中もしくは非会員の方は0000を記入して下さい． / One who is applying for a member or non-member should fill in 0000.')
  }
}

function AUTHORS_(f) {
  f.log('Authors page #1...');
  f.page(`著者の情報: Author (1) ... Author (5)\nAuthor(s) Info: Author (1) ... Author (5)`);
  AUTHORS_aux_(f, 1, 5);

  f.log('Authors page #2...');
  f.page(`著者の情報: Author (6) ... Author (10)\nAuthor(s) Info: Author (6) ... Author (10)`);
  AUTHORS_aux_(f, 6, 10);
}

function CONTACT_(f) {
  f.log('Contact information...');
  f.page('連絡先\nContact information');
  f.section("氏名\nName");
  f.text('姓 （例：山田）/ Family name', true);
  f.text('名 （例：花子）/ Given name', true);
  f.text('Given name (e.g., Hanako)', true);
  f.text('Family name (e.g., YAMADA)', true);
  f.text('所属機関 / Affiliation', true);
  f.text('所属略称 / Abbreviation of affiliation', false);
  f.text('郵便番号 / Zip code', true);
  f.text('住所 / Address', true);
  f.text('電話番号 / Phone number', true);

  f.section('備考 / Remarks');
  f.p('備考 / Remarks', false);
}

function UPLOAD_(f) {
  f.log('Upload page...');
  f.page("講演論文と調査表\nPaper and Survey Sheet");

  f.section(`Page 4/${PAGES}` + "\n講演論文のアップロード\nPaper Submission", "期限までに講演原稿をアップロードして下さい．期限までに原稿をご提出いただけない場合、予稿集に収録されない可能性が高くなります。どうぞご了承下さい。\nUpload your manuscript by the due date. Please be reminded that the manuscript may not be included in proceedings if the deadline is missed.");

  f.multiplechoice("講演論文提出前の確認事項\nConfirmation before submitting you paper", true, [
    "複数のPCで文字化け等がないことを確認しました。\nI confirm that there is no garbled characters in my manuscript.",

    "ページの右上のヘッダは「可視化情報シンポジウム" + YEAR + "となっていることを確認しました。\nI confirm that the upper-right corner of the header reads \"可視化情報シンポジウム" + YEAR + "\".",

    "論文は10ページ以内、3.5MB以下に収まっています。\nI confirm that the manuscript is no more than 10 pages and smaller than 3.5MB.",

    "PDFファイルにフォントを埋め込みました\nAll fonts are embedded in the PDF file.",

    "講演論文集(USBメモリ)への収録に同意します\nI agree to include the manuscript in proceedings."
  ]);

  f.section(`調査票のアップロード\nSurvey Sheet Submission`);
}


function Submission() {
  const f = new MyForm(SUBMISSION_URL);
  f.log('Initializing the form...')
  f.clear();
  PAPER_(f);
  AUTHORS_(f);
  CONTACT_(f);
  UPLOAD_(f);
  PROPS.setProperty('num_pages', page);

  f.log('The form is ready!')
}
