#!/Users/wakita/.venvs/vis/bin/python

import os
import re
import tempfile

import pandas as pd

import gdown

# 団体名とそのよみ

ORGS = '''応用物理学会 おうようぶつりがっかい
海洋調査技術学会 かいようちょうさぎじゅつがっかい
計測自動制御学会 けいそくじどうせいぎょがっかい
自動車技術会 じどうしゃぎじゅつかい
ターボ機械協会 たーぼきかいきょうかい
日本医用画像工学会 にほんいようがぞうこうがくかい
海洋音響学会 かいようおんきょうがっかい
化学工学会 かがくこうがくかい
資源・素材学会 しげんそざいがっかい
情報処理学会 じょうほうしょりがっかい
土木学会 どぼくがっかい
日本エアロゾル学会 にほんえあろぞるがっかい
日本音響学会 にほんおんきょうがっかい
日本ガスタービン学会 にほんがすたーびんがっかい
日本気象学会 にほんきしょうがっかい
日本建築学会 にほんけんちくがっかい
日本混相流学会 にほんこんそうりゅうがっかい
日本伝熱学会 にほんでんねつがっかい
日本機械学会 にほんきかいがっかい
日本計算工学会 にほんけいさんこうがくかい
日本航空宇宙学会 にほんこうくううちゅうがっかい
日本船舶海洋工学会 にほんせんぱくかいようこうがくかい
日本燃焼学会 にほんねんしょうがっかい
日本非破壊検査協会 にほんひはかいけんさきょうかい
日本流体力学会 にほんりゅうたいがっかい
物理探査学会 ぶつりたんさがっかい
日本レオロジー学会 にほんれおろじーがっかい
日本地球化学会 にほんちきゅうかがくかい
日本海洋学会 にほんかいようがっかい
日本リモートセンシング学会 にほんりもーとせんしんぐがっかい
日本知能情報ファジィ学会 にほんちのうじょうほうふぁじぃがっかい
レーザー学会 れーざーがっかい
日本雪氷学会 にほんせきひょうがっかい
日本惑星科学会 にほんわくせいかがくかい
日本天文学会 にほんてんもんがっかい
日本シミュレーション学会 にほんしみゅれーしょんがっかい
日本フルードパワーシステム学会 にほんふるーどぱわーしすてむがっかい
エアロ・アクアバイオメカニズム学会 えあろあくあばいおめかにずむがっかい
日本原子力学会 にほんげんしりょくがっかい
日本光学会 にほんこうがくかい
日本風工学会 にほんふうこうがっかい
日本バーチャルリアリティー学会 にほんばーちゃるりありてぃーがっかい
日本バイオイメージング学会 にほんばいおいめーじんぐがっかい
日本液体微粒化学会 にほんえきたいびりゅうかがくかい
日本鋳造工学会 にほんちゅうぞうこうがくかい
画像電子学会 がぞうでんしがっかい
芸術科学会 げいじゅつかがくかい'''.split('\n')

ORGS = dict([org.split(' ') for org in ORGS])

def org_yomi(org):
    name = org.split(' ')
    return name[0] if len(name) == 1 else name[1]

# 協賛依頼状況の Excel のダウンロードと読み込み
KEYS = '学会名,回答'.split(',')

download_xlsx = os.environ['HOME'] + '/Downloads/第49回シンポ協賛依頼先_210528.xlsx'
if os.path.exists(download_xlsx):
    df = pd.read_excel(download_xlsx, skiprows=1)[KEYS]
else:
    tmp = tempfile.NamedTemporaryFile()
    url='https://drive.google.com/uc?id=1uUW8TkjGownZSjnk4jfsifybIaj2QmL8'
    gdown.download(url, tmp.name, quiet=False)
    df = pd.read_excel(tmp.name, skiprows=1)[KEYS]

coop_orgs = list(df[df['回答'].str.contains('承諾', na=False)]['学会名'])
coop_orgs = [org.replace('\u3000', ' ') for org in coop_orgs]

for org in coop_orgs: print(org)

PROLOGUE = '''---
title: '共催・協賛・後援'
---

::: {#main}

# 共催・協賛・後援

'''

# Markdown (md/support.md) の生成
with open('md/support.md', 'w') as w:
    w.write(PROLOGUE)

    for org in sorted(coop_orgs, key=org_yomi):
        w.write(f'- {org}\n')
    w.write('\n:::\n')
