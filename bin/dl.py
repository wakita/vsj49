#!/Users/wakita/.venvs/vis/bin/python

import datetime
import os
import time

import pandas as pd

import gspread

from pyperclip import copy

CACHE = f'{os.environ["HOME"]}/.cache/vsj49/registration.xlsx'

if not os.path.exists(CACHE):
    gc = gspread.service_account()
    book = gc.open_by_key('1nAlOjtGwKWGbU_QE_JeiB__wJs6y46hUIi4erpRO-XM')
    df = pd.DataFrame(book.get_worksheet(0).get_all_records())
    df.drop(df[df['REMARK'].isin(set(['test', 'duplicate', 'cancel']))].index, inplace=True)
    with open(CACHE, 'wb') as w:
        df.to_excel(w)

df = pd.read_excel(CACHE, index_col='PAPER_ID')

遅延要望 = set([47, 110, 59, 87, 89, 69, 74, 144])

未提出 = df[df['発表論文'].isna()]

未提出連絡なし = sorted(set(未提出.index) - 遅延要望)
print(未提出連絡なし)
未提出連絡なし = 未提出.filter(未提出連絡なし, axis='index')

print(未提出連絡なし['Email Address'])
copy(', '.join(list(未提出連絡なし['Email Address'])))
