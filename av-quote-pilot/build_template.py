from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.comments import Comment
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule

F="Arial"
def font(**k): return Font(name=F, **k)
BLUE=font(color="0000FF"); BOLD=font(bold=True); NORM=font()
GREEN=font(color="008000")
YEL=PatternFill("solid", fgColor="FFF2CC")
HEAD=PatternFill("solid", fgColor="1F3864"); HF=font(bold=True,color="FFFFFF")
INT=PatternFill("solid", fgColor="EDEDED")
thin=Side(style="thin", color="BFBFBF"); BOX=Border(left=thin,right=thin,top=thin,bottom=thin)
NIS='#,##0 "₪";(#,##0 "₪");"-"'
PCT='0%;(0%);"-"'

wb=Workbook()

# ---------- Инструкция
ws=wb.active; ws.title="Инструкция"
lines=[
("Шаблон concierge-КП для AV / smart home интеграторов",True),
("",False),
("Как пользоваться",True),
("1. «Настройки»: заполни жёлтые ячейки (компания, клиент, наценка, ставка часа, НДС).",False),
("2. «Прайс»: вставь прайс поставщика (Артикул, Бренд, Наименование, Категория, Закупка без НДС). Примерные строки замени.",False),
("3. «КП»: в синих ячейках укажи раздел, артикул и кол-во. Наименование и цены подтянутся сами.",False),
("   Наценку по строке можно переопределить; пусто = наценка по умолчанию из «Настроек».",False),
("4. Работы: внизу «КП» блок работ (часы × ставка).",False),
("5. Перед отправкой клиенту: скрой колонки F и J–L, пустые строки (фильтр по колонке C) и экспортируй в PDF.",False),
("",False),
("Обозначения",True),
("Синий текст + жёлтая заливка — ввод. Чёрный — формулы, не трогать. Серая заливка — внутренние данные, клиенту не показывать.",False),
("Если артикула нет в прайсе, в наименовании появится «⚠ нет в прайсе».",False),
("",False),
("Черновик строк КП можно получить через промпт из файла prompt.md (вставка в колонки B–E).",False),
]
for i,(t,b) in enumerate(lines,1):
    ws.cell(i,1,t).font=font(bold=b, size=14 if i==1 else 10)
ws.column_dimensions["A"].width=120

# ---------- Настройки
s=wb.create_sheet("Настройки")
s.column_dimensions["A"].width=34; s.column_dimensions["B"].width=36; s.column_dimensions["C"].width=50
rows=[
("Компания / חברה","SIGMA SOUND",None),
("Телефон / Email","050-000-0000",None),
("Клиент / לקוח","Иван Петров, Тель-Авив, ул. Примерная 1",None),
("Номер КП / מס' הצעה","2026-001",None),
("Дата / תאריך","2026-11-03",None),
("Действительно дней / תוקף (ימים)",14,None),
("Наценка по умолчанию на оборудование",0.25,"Пример. Подставь свою типовую наценку."),
("Ставка часа работ, ₪ без НДС",250,"Пример. Подставь свою ставку."),
("НДС Израиль",0.18,"Ставка НДС в Израиле 18% с 01.01.2025."),
]
for i,(k,v,c) in enumerate(rows,1):
    s.cell(i,1,k).font=BOLD
    cell=s.cell(i,2,v); cell.font=BLUE; cell.fill=YEL; cell.border=BOX
    if c: s.cell(i,3,c).font=font(italic=True,color="808080")
s["B7"].number_format=PCT; s["B9"].number_format='0%'; s["B8"].number_format=NIS

# ---------- Прайс
p=wb.create_sheet("Прайс")
hdr=["Артикул","Бренд","Наименование","Категория","Поставщик","Закупка за ед., ₪ без НДС","Дата прайса"]
widths=[16,14,48,16,18,22,14]
for j,(h,w) in enumerate(zip(hdr,widths),1):
    c=p.cell(1,j,h); c.font=HF; c.fill=HEAD; c.alignment=Alignment(wrap_text=True,vertical="center")
    p.column_dimensions[chr(64+j)].width=w
items=[
("SON-AMP","Sonos","Sonos Amp — усилитель 2×125 Вт","Аудио",2400),
("SON-ARC","Sonos","Sonos Arc Ultra — саундбар","Аудио",3600),
("BW-CCM663","Bowers & Wilkins","Встраиваемая потолочная АС CCM663 (шт.)","Аудио",1100),
("APL-TV4K","Apple","Apple TV 4K 128GB","Видео",650),
("HDMI-5M","Generic","HDMI 2.1 кабель 5 м","Видео",60),
("MDT-AKS0816","MDT","KNX актуатор 8 каналов 16A","KNX свет",1150),
("MDT-AKD0401","MDT","KNX диммер 4 канала","KNX свет",1450),
("GIRA-KNX4","Gira","KNX выключатель 4 клавиши","KNX свет",780),
("MDT-SCN-IP","MDT","KNX IP-роутер","KNX свет",1300),
("MDT-PSU640","MDT","KNX блок питания 640 мА","KNX свет",520),
("HIK-2CD2386","Hikvision","IP-камера 8 Мп, турель","Видеонаблюдение",520),
("HIK-NVR8P","Hikvision","NVR 8 каналов PoE + HDD 4 ТБ","Видеонаблюдение",1400),
("UBNT-U6PRO","Ubiquiti","UniFi U6 Pro точка доступа","Сеть",650),
("UBNT-USW16P","Ubiquiti","UniFi Switch 16 PoE","Сеть",1500),
("UBNT-UCG","Ubiquiti","UniFi Cloud Gateway Ultra","Сеть",520),
("CAB-CAT6","Generic","Кабель Cat6 UTP, бухта 305 м","Кабель",450),
("RACK-12U","Generic","Шкаф серверный 12U настенный","Монтаж",700),
]
for i,(sku,b,n,cat,price) in enumerate(items,2):
    vals=[sku,b,n,cat,"Пример",price,"2026-11"]
    for j,v in enumerate(vals,1):
        c=p.cell(i,j,v); c.font=BLUE; c.border=BOX
    p.cell(i,6).number_format=NIS
p.cell(2,6).comment=Comment("Все цены в этом листе — примерные, только для демонстрации формата. Замени прайсом поставщика.","Шаблон")
p.freeze_panes="A2"
PR="Прайс!$A$2:$A$2000"

# ---------- КП
k=wb.create_sheet("КП")
k["A1"]="='Настройки'!B1"; k["A1"].font=font(bold=True,size=16)
k["A2"]="=\"Коммерческое предложение / הצעת מחיר № \"&'Настройки'!B4&\" от \"&'Настройки'!B5"; k["A2"].font=font(bold=True,size=12)
k["A3"]="=\"Клиент / לקוח: \"&'Настройки'!B3"; k["A3"].font=NORM
k["A4"]="=\"Действительно / בתוקף: \"&'Настройки'!B6&\" дней / ימים\""; k["A4"].font=NORM
H=6
hdr=["№","Раздел / מערכת","Артикул / מק\"ט","Наименование / תיאור","Кол-во / כמות","Наценка (пусто = по умолч.)","Цена за ед. / מחיר ליחידה","Сумма / סה\"כ","","Закупка за ед.","Закупка всего","Маржа"]
widths=[5,18,16,48,10,14,30,16,3,14,14,14]
for j,(h,w) in enumerate(zip(hdr,widths),1):
    c=k.cell(H,j,h); c.alignment=Alignment(wrap_text=True,vertical="center",horizontal="center")
    k.column_dimensions[chr(64+j)].width=w
    if h:
        c.font=HF; c.fill=HEAD if j<=8 else PatternFill("solid",fgColor="7F7F7F")
k.row_dimensions[H].height=44
N=40; r0=H+1; r1=H+N
example=[("Аудио","SON-AMP",2),("Аудио","BW-CCM663",4),("KNX свет","MDT-AKS0816",1),("KNX свет","GIRA-KNX4",3),("Сеть","UBNT-U6PRO",2)]
for i in range(N):
    r=r0+i
    k.cell(r,1,f'=IF(C{r}="","",ROW()-{H})')
    for j in (2,3,5,6):
        c=k.cell(r,j); c.font=BLUE; c.fill=YEL
    if i<len(example):
        k.cell(r,2,example[i][0]); k.cell(r,3,example[i][1]); k.cell(r,5,example[i][2])
    k.cell(r,4,f'=IF(C{r}="","",IFERROR(INDEX(Прайс!$C$2:$C$2000,MATCH(C{r},{PR},0)),"⚠ нет в прайсе"))')
    k.cell(r,10,f'=IF(C{r}="","",IFERROR(INDEX(Прайс!$F$2:$F$2000,MATCH(C{r},{PR},0)),0))')
    k.cell(r,7,f'=IF(C{r}="","",ROUND(J{r}*(1+IF(F{r}="",\'Настройки\'!$B$7,F{r})),0))')
    k.cell(r,8,f'=IF(C{r}="","",G{r}*E{r})')
    k.cell(r,11,f'=IF(C{r}="","",J{r}*E{r})')
    k.cell(r,12,f'=IF(C{r}="","",H{r}-K{r})')
    for j in range(1,13):
        c=k.cell(r,j)
        if j!=9: c.border=BOX
        if j in (7,8,10,11,12): c.number_format=NIS
        if j in (10,11,12): c.fill=INT
        if j==6: c.number_format=PCT
dv=DataValidation(type="list",formula1=f"=Прайс!$A$2:$A$2000",allow_blank=True,showErrorMessage=False)
k.add_data_validation(dv); dv.add(f"C{r0}:C{r1}")
k.conditional_formatting.add(f"D{r0}:D{r1}",FormulaRule(formula=[f'D{r0}="⚠ нет в прайсе"'],font=Font(color="C00000",bold=True)))

r=r1+1
k.cell(r,7,"Оборудование / ציוד").font=BOLD
k.cell(r,8,f"=SUM(H{r0}:H{r1})").font=BOLD; k.cell(r,8).number_format=NIS
k.cell(r,11,f"=SUM(K{r0}:K{r1})"); k.cell(r,12,f"=SUM(L{r0}:L{r1})")
for j in (11,12): k.cell(r,j).number_format=NIS; k.cell(r,j).fill=INT
EQ=r

# работы
r+=2; W0=r+1
for j,h in enumerate(["","Работы / עבודות","","Описание / תיאור","Часы / שעות","","Ставка / תעריף","Сумма / סה\"כ"],1):
    if h: c=k.cell(r,j,h); c.font=HF; c.fill=HEAD
works=[("Монтаж и пуско-наладка аудио",8),("Программирование KNX",12),("Настройка сети и Wi-Fi",4),("Прокладка кабеля",16)]
for i in range(8):
    rr=W0+i
    for j in (4,5):
        c=k.cell(rr,j); c.font=BLUE; c.fill=YEL; c.border=BOX
    if i<len(works): k.cell(rr,4,works[i][0]); k.cell(rr,5,works[i][1])
    k.cell(rr,7,f'=IF(E{rr}="","",\'Настройки\'!$B$8)').number_format=NIS
    k.cell(rr,8,f'=IF(E{rr}="","",E{rr}*G{rr})').number_format=NIS
    for j in (7,8): k.cell(rr,j).border=BOX
W1=W0+7
r=W1+1
k.cell(r,7,"Работы / עבודות").font=BOLD
k.cell(r,8,f"=SUM(H{W0}:H{W1})").font=BOLD; k.cell(r,8).number_format=NIS
WK=r

r+=2
tot=[("Итого без НДС / סה\"כ לפני מע\"מ",f"=H{EQ}+H{WK}"),
     ("=\"НДС / מע\"\"מ \"&TEXT('Настройки'!B9,\"0%\")",f"=H{r}*'Настройки'!B9"),
     ("Итого с НДС / סה\"כ כולל מע\"מ",f"=H{r}+H{r+1}")]
for i,(lab,f) in enumerate(tot):
    k.cell(r+i,7,lab).font=BOLD
    c=k.cell(r+i,8,f); c.font=font(bold=True,size=12 if i==2 else 10); c.number_format=NIS
k.cell(r+2,8).fill=YEL
# внутренние итоги
k.cell(r,10,"Маржа всего").font=BOLD
k.cell(r,12,f"=L{EQ}+H{WK}").number_format=NIS
k.cell(r+1,10,"Маржа % от итого").font=BOLD
k.cell(r+1,12,f"=IF(H{r}=0,0,L{r}/H{r})").number_format='0.0%'
for rr in (r,r+1):
    for j in (10,11,12): k.cell(rr,j).fill=INT
k.cell(r,12).comment=Comment("Маржа = наценка на оборудование + вся сумма работ (работы считаются своими силами, без себестоимости).","Шаблон")
r+=4
notes=["Условия / תנאים:","• Оплата: 50% аванс, 50% по сдаче объекта. / תשלום: 50% מקדמה, 50% במסירה.",
       "• Гарантия на оборудование — по гарантии производителя; на работы — 12 месяцев. / אחריות על עבודה: 12 חודשים.",
       "• Цены в ₪. Цены на оборудование могут измениться после окончания срока действия КП."]
for i,t in enumerate(notes):
    k.cell(r+i,2,t).font=font(bold=(i==0),color="404040")
k.freeze_panes=f"A{H+1}"
k.page_setup.orientation="portrait"; k.page_setup.fitToWidth=1; k.page_setup.fitToHeight=0
k.sheet_properties.pageSetUpPr.fitToPage=True
k.print_area=f"A1:H{r+len(notes)}"

for wsx in wb.worksheets:
    for row in wsx.iter_rows():
        for c in row:
            if c.font and c.font.name!=F:
                c.font=Font(name=F,bold=c.font.bold,color=c.font.color,size=c.font.sz,italic=c.font.italic)
wb.move_sheet("КП",offset=-2)
wb.active=wb.sheetnames.index("КП")
wb.save("/home/user/flatfinderil/av-quote-pilot/kp-template.xlsx")
