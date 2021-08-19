#!/Users/wakita/.venvs/vis/bin/python

from pathlib import Path
import os
import tempfile

import pandas as pd

import gspread

ROOT_DIR = Path(__file__).parent.parent
DATA_DIR = ROOT_DIR.joinpath('data')
MD_DIR = ROOT_DIR.joinpath('md')

def download():
    SHEET_ID = '1oAeFUjSLKQJzNbBQLDDiasOKdMx3q0O0_BPLYc1qyIc'
    gc = gspread.service_account()
    print('webdata をダウンロード中')
    book = gc.open_by_key(SHEET_ID)
    sponsors = pd.DataFrame(book.get_worksheet(0).get_all_records())
    with open(DATA_DIR.joinpath('sponsors.xlsx'), 'wb') as w:
        sponsors.to_excel(w)
    print(sponsors)

def download_all():
    SHEET_ID = '1oAeFUjSLKQJzNbBQLDDiasOKdMx3q0O0_BPLYc1qyIc'
    gc = gspread.service_account()
    dfs = {}
    book = gc.open_by_key(SHEET_ID)
    writer = pd.ExcelWriter(DATA_DIR.joinpath('webdata.xlsx'), engine='xlsxwriter')
    for worksheet in book.worksheets():
        pd.DataFrame(worksheet.get_all_records()).to_excel(writer, sheet_name=worksheet.title)
    writer.save()

######################################################################
# スポンサー

EXHIBITION_HEADER = '''---
title: '企業出展'
---

::: {#main}

# 企業出展
'''

EXHIBITION_FOOTER = '''\n:::
'''


def sponsors():
    sponsors = pd.read_excel(DATA_DIR.joinpath('webdata.xlsx'), sheet_name='スポンサー')

    # 展示・広告
    with open(MD_DIR.joinpath('exhibition.md'), 'w') as w:
        w.write(EXHIBITION_HEADER)

        def isna(s): return type(s) == str and len(s) > 0

        for _, sponsor in sponsors.iterrows():
            w.write(f'- [{sponsor["企業名"]}](sponsor_{sponsor["id"]}.html):')
            if sponsor['ランチョンセミナー'] > 0: w.write(f' <i class="fas fa-utensils"></i>')
            if sponsor['機器展示'] > 0: w.write(f' <i class="fas fa-flask"></i>')
            if sponsor['カタログ'] > 0: w.write(f' <i class="fas fa-book-open"></i>')
            if sponsor['広告'] > 0: w.write(f' <i class="fas fa-ad"></i>')
            w.write('\n\n')

        w.write('\n# 展示・広告\n\n')

        w.write('\n# 広告\n\n')
        companies = sponsors[sponsors['広告'].notna()]
        for _, company in companies.iterrows():
            catalogue = company['広告']
            if type(catalogue) == str and len(catalogue) > 0:
                w.write(f'- [{company["企業名"]}](files/ad/{company["id"]})\n\n')

        w.write('\n# カタログ\n\n')
        companies = sponsors[sponsors['カタログ'].notna()]
        for _, company in companies.iterrows():
            catalogue = company['カタログ']
            if type(catalogue) == str and len(catalogue) > 0:
                w.write(f'- [{company["企業名"]}](files/catalogue/{company["id"]})\n\n')

        w.write('\n## ランチョンセミナー\n\n')
        companies = sponsors[sponsors['ランチョンセミナー'].notna()]
        for _, company in companies.iterrows():
            company_url = company['企業URL']
            if type(company_url) == str and len(company_url) > 0:
                w.write(f'- [{company["企業名"]}]({company_url})\n\n')
            else: w.write(f'- {company["企業名"]}\n\n')

        w.write('\n## 機器展示\n\n')
        companies = sponsors[sponsors['機器展示'].notna()]
        for _, company in companies.iterrows():
            company_url = company['企業URL']
            if type(company_url) == str and len(company_url) > 0:
                w.write(f'- [{company["企業名"]}]({company_url})\n\n')
            else: w.write(f'- {company["企業名"]}\n\n')

        w.write(EXHIBITION_FOOTER)


if __name__ == '__main__':
    download_all()
    sponsors()
