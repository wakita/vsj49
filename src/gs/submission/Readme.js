/**
 * フォームの作成方法
 * 
 * 空のフォームを2つ、空のスプレッドシートをひとつ作成し、それぞれ以下のように命名する。（名前はなんでもよいのだが…）
 * - フォーム1: 発表申込フォーム
 * - フォーム2: 発表申込フォーム（確認用）
 * - スプレッドシート: 発表申込フォーム (Responses)
 * 
 * 回答回収用のスプレッドシートを開き、"Tools > Script Editor" を開き、本スクリプトのすべてのファイルを追加する。
 * clasp を設定してあれば clasp push が簡単
 * 
 * makeform.gs のなかの MakeForm 関数を実行するとフォームが自動合成される。このとき、ページ遷移なしに全体を確認するための「発表申込フォーム（確認用）」と本番用の「発表申込フォーム」が生成される。
 * 
 * 初回の実行で総ページを取得し、次の実行で「ページ番号／総ページ数」のような埋め込みをする。
 * このため、初回の実行のときに「！！！！！　総ページ数がずれているので再生成して下さい。　！！！！！」という表示がある。
 * 再実行すると問題は解消される仕様である。
 * 
 * 本番用の「発表申込フォーム」には自動合成で対応しきれない設定があるので、それを手動で設定する。
 * 1. "フォームの設定（歯車） > General" で以下のように選択
 *     [x] Collect email addresses
 *         [x] Response receipts
 *             ( ) If respondent requests it
 *             (x) Always
 * 2. フォームの一番最後の回答欄（講演論文提出前の確認事項）の下にアップロードツールをふたつ追加し、それぞれ以下のように設定する。
 *     - アップロードツール１
 *           - タイトル := 講演論文
 *           - description := Your paper
 *           [x] Allow only specific file types := {PDF}
 *           - Maximum number of files := 10
 *     - アップロードツール２
 *           - タイトル := 調査票
 *           - description := Survey sheet
 *           [x] Allow only specific file types := {PDF}
 *           - Maximum number of files := 10
 */

/**
 * フォームの URL の ID らしきものをコピーして、main.gs の FormAppp.openById に設定する
 *     const FORM = FormApp.openById('1iRefDHt1gP7NL7iVCMECPv2WOhYeBoyDcrsTXWllT2E');
 * これにより、このスクリプトから表にアクセスできるようになる。
 * 
 * "フォーム > Responses > View Responses in Sheets" により、フォームに連携する表を準備する。
 * 表は空だが、フォームの入力欄に対応した列が用意されていることが確認できる。
 * 最左の Timestamp 列だけは入力欄に対応しない。これは各回答の ID の役割を果すらしい。
 * 
 * main.gs で reset を実行し、フォームに連携する表に「PAPER_ID, REMARK, EDIT_URL」列が追加する。
 * これらの列は左から順に、論文番号、特殊な処理を要する論文のマーク、編集URLである。
 * 論文番号と編集URLは発表申し込み時に代表著者にメールで伝達される。
 * 
 * "Apps Script > Triggers > + Add Trigger" からトリガーを登録する。
 *  - function to run := onFormSubmit
 *  - deployment := Head
 *  - Event source := From spreadsheet
 *  - Event type := On form submit
 * ご参考 - https://i.gyazo.com/54b743714a52071b723ee23103215696.png
 * この設定により、フォームの入力が表に書き込まれたときに main.gs で定義した onFormSubmit 関数が実行される。
 */