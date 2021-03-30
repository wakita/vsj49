---
title: 'git-ftpの使い方メモ'
date: '2021-03-20'
---

# ウェブサイトのデータの更新

1. ファイルを更新する

1. `git add ...; git commit ...`: コミットメッセージはほかの人にもわかるように書きましょう．

1. FTP サーバの認証がいまひとつっぽいので，以下の設定を施す．

    `git config git-ftp.insecure 1`

1. `git ftp push`: `git push` ではなく，`git ftp push` # GitHub 共有する場合は git の push hook に git ftp push をいれるといいかも．

    `git ftp push` すると，最新の差分に該当するファイルが FTP サーバにアップロードされるらしい．
