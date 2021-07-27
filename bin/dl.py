#!/Users/wakita/.venvs/vis/bin/python

import datetime
import os
import time

import pandas as pd
import gspread

from pyperclip import copy

CACHE = f'{os.environ["HOME"]}/.cache/vsj49/registration.xlsx'

needs_download = not os.path.exists(CACHE)
mtime = datetime.datetime.fromtimestamp(os.path.getmtime(CACHE))
today = datetime.datetime.today()
needs_download |= mtime.year != today.year
needs_download |= mtime.month != today.month
needs_download |= mtime.day != today.day

if needs_download:
    gc = gspread.service_account()
    book = gc.open_by_key('1nAlOjtGwKWGbU_QE_JeiB__wJs6y46hUIi4erpRO-XM')
    df = pd.DataFrame(book.get_worksheet(0).get_all_records())
    df.drop(df[df['REMARK'].isin(set(['test', 'duplicate', 'cancel']))].index, inplace=True)
    with open(CACHE, 'wb') as w:
        df.to_excel(w)

df = pd.read_excel(CACHE, index_col='PAPER_ID')

遅延要望 = set(df[df['REMARK'] == 'delay'].index)

未提出 = df[df['発表論文'].isna()]

print('未提出連絡なし')
未提出連絡なし = 未提出.filter(sorted(set(未提出.index) - 遅延要望),
                               axis='index')

print(未提出連絡なし['Email Address'])
copy(', '.join(list(未提出連絡なし['Email Address'])))
print('\n未提出者たちのメールアドレスをコピーバッファにコピーしました。')
