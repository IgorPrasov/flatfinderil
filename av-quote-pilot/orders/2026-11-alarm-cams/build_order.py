from openpyxl import load_workbook
from openpyxl.styles import Font, Border, Side
from openpyxl.comments import Comment
D="/home/user/flatfinderil/av-quote-pilot/orders/2026-11-alarm-cams"
wb=load_workbook("/home/user/flatfinderil/av-quote-pilot/kp-template.xlsx")
s=wb["Настройки"]
s["B3"]="Клиент (уточнить), квартира с выходом во двор"; s["B4"]="2026-015"; s["B5"]="2026-11-07"
p=wb["Прайс"]
blue=Font(name="Arial",color="0000FF"); thin=Side(style="thin",color="BFBFBF"); BOX=Border(left=thin,right=thin,top=thin,bottom=thin)
new=[
("HIK-AXPRO-HUB","Hikvision","AX Pro хаб DS-PWA96-M-WE (связь с מוקד)","Сигнализация",900),
("HIK-AX-PIR","Hikvision","AX Pro датчик движения PIR DS-PDP15P-EG2-WE","Сигнализация",160),
("HIK-AX-MC","Hikvision","AX Pro магнитоконтакт (геркон) DS-PDMC-EG2-WE","Сигнализация",90),
("HIK-AX-SIRIN","Hikvision","AX Pro сирена внутренняя DS-PS1-II-WE","Сигнализация",200),
("HIK-AX-SIROUT","Hikvision","AX Pro сирена уличная DS-PS1-E-WE","Сигнализация",380),
("HIK-AX-KP","Hikvision","AX Pro клавиатура DS-PK1-LT-WE","Сигнализация",280),
("HIK-AX-FOB","Hikvision","AX Pro брелок DS-PKF1-WE","Сигнализация",80),
("HIK-DOORBELL","Hikvision","Видеоглазок DS-KV6113-WPE1(C), PoE","Видеонаблюдение",550),
("HIK-JBOX","Hikvision","Монтажная коробка для уличной камеры","Видеонаблюдение",60),
("UPS-650","Generic","ИБП 650 ВА для NVR и роутера","Питание",350),
("MNT-KIT","Generic","Монтажный комплект (гофра, коробки)","Монтаж",250),
]
for i,row in enumerate(new):
    r=19+i
    for j,v in enumerate([row[0],row[1],row[2],row[3],"Ориентировочно",row[4],"2026-11"],1):
        c=p.cell(r,j,v); c.font=blue; c.border=BOX
    p.cell(r,6).number_format='#,##0 "₪";(#,##0 "₪");"-"'
p.cell(19,6).comment=Comment("Цены ориентировочные, не из реального прайса. Заменить ценами поставщика.","Шаблон")
k=wb["КП"]
k["A5"]="ЧЕРНОВИК: цены ориентировочные, до сверки с прайсом поставщика"; k["A5"].font=Font(name="Arial",bold=True,color="C00000")
eq=[("Видеонаблюдение","HIK-2CD2386",5,"4 снаружи + 1 в подъезде"),
("Видеонаблюдение","HIK-JBOX",4,None),
("Видеонаблюдение","HIK-NVR8P",1,None),
("Видеонаблюдение","HIK-DOORBELL",1,None),
("Сигнализация","HIK-AXPRO-HUB",1,None),
("Сигнализация","HIK-AX-PIR",3,None),
("Сигнализация","HIK-AX-MC",3,None),
("Сигнализация","HIK-AX-SIRIN",1,None),
("Сигнализация","HIK-AX-KP",1,None),
("Сигнализация","HIK-AX-FOB",2,None),
("Питание","UPS-650",1,None),
("Кабель","CAB-CAT6",1,None),
("Монтаж","MNT-KIT",1,None)]
for r in range(7,47):
    for c in (2,3,5): k.cell(r,c).value=None
for i,(a,b,n,_) in enumerate(eq):
    r=7+i; k.cell(r,2,a); k.cell(r,3,b); k.cell(r,5,n)
works=[("Прокладка кабеля: двор, подъезд, ввод",12),
("Монтаж и настройка 5 камер",6),
("Монтаж видеоглазка (сверление стены)",2),
("NVR, ИБП, сеть, приложение на телефон",3),
("Монтаж датчиков, сирены, клавиатуры",4),
("Программирование зон и сценариев охраны",2),
("Подключение к охранному центру (מוקד) и тест",2),
("Сдача объекта и обучение клиента",1)]
for r in range(50,58): k.cell(r,4).value=None; k.cell(r,5).value=None
for i,(d,h) in enumerate(works): k.cell(50+i,4,d); k.cell(50+i,5,h)
PR="Прайс!$A$2:$A$2000"; PF="Прайс!$F$2:$F$2000"
def opt(sku,hours):
    return (f"ROUND((INDEX({PF},MATCH(\"{sku}\",{PR},0))*(1+'Настройки'!$B$7)+{hours}*'Настройки'!$B$8)*(1+'Настройки'!$B$9),0)")
k["B64"]="Условия / תנאים:"
k["B65"]="• Оплата: 50% аванс, 50% по сдаче объекта. / תשלום: 50% מקדמה, 50% במסירה."
k["B66"]="• Гарантия на оборудование по гарантии производителя; на работы 12 месяцев. Абонентская плата охранного центра не включена."
k["B67"]="Опции (не входят в сумму, цены с НДС) / תוספות אופציונליות:"; k["B67"].font=Font(name="Arial",bold=True,color="404040")
k["B68"]=f"=\"• Геркон на окно / מגנט לחלון: \"&TEXT({opt('HIK-AX-MC',0.5)},\"#,##0\")&\" ₪ за окно (датчик + монтаж)\""
k["B69"]=f"=\"• Уличная сирена во двор / סירנה חיצונית: \"&TEXT({opt('HIK-AX-SIROUT',1)},\"#,##0\")&\" ₪\""
for r in (68,69): k[f"B{r}"].font=Font(name="Arial",color="404040")
k.print_area="A1:H69"
wb.save(f"{D}/kp-alarm-cams.xlsx")
