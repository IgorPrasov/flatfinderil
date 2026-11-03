import sys
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill
src,dst=sys.argv[1:3]
wb=load_workbook(src)
for n in ('Инструкция','Настройки','Прайс'): wb[n].sheet_state='hidden'
k=wb['КП']; wb.active=wb.sheetnames.index('КП')
none=PatternFill(fill_type=None)
for row in k.iter_rows(min_row=7,max_row=60,max_col=8):
    for c in row:
        if c.fill.fgColor.rgb in ("00FFF2CC","FFFFF2CC"): c.fill=none
        if c.font.color is not None and c.font.color.rgb in ("000000FF","FF0000FF"):
            c.font=Font(name="Arial",bold=c.font.bold,size=c.font.sz)
for r in range(7,47):
    if k.cell(r,3).value in (None,""): k.row_dimensions[r].hidden=True
for r in range(50,58):
    if k.cell(r,5).value in (None,""): k.row_dimensions[r].hidden=True
k.column_dimensions['F'].hidden=True
wb.save(dst)
