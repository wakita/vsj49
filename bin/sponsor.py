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

######################################################################
# スポンサー

EXHIBITION_HEADER = '''---
title: '展示・広告'
---

::: {#main}
'''

EXHIBITION_FOOTER = '''\n:::
'''


def sponsors():
    sponsors = pd.read_excel(DATA_DIR.joinpath('sponsors.xlsx'))

    # 展示・広告
    with open(MD_DIR.joinpath('exhibition.md'), 'w') as w:
        w.write(EXHIBITION_HEADER)

        w.write('\n# 展示・広告\n\n')

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
    download()
    sponsors()
