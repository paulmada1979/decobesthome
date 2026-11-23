# -*- coding: utf-8 -*-
"""Factory page + bamboo product questionnaire (EN/中文) with answer columns.
Usage: python scripts/gen_factory_questions_xlsx.py <out.xlsx>"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = sys.argv[1] if len(sys.argv) > 1 else "factory-questionnaire.xlsx"
GREEN = "FF1E3D32"; LEAF = "FF84BE45"; BONE = "FFF6F3EC"; ANSWER = "FFFFFDF5"; SECTION = "FFE8EFE0"

wb = openpyxl.Workbook()
thin = Side(style="thin", color="FFD9D9D9")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap_top = Alignment(wrap_text=True, vertical="top")
wrap_ctr = Alignment(wrap_text=True, vertical="center")


def header(ws, cols):
    for j, (text, width) in enumerate(cols, start=1):
        c = ws.cell(1, j, text)
        c.fill = PatternFill("solid", fgColor=GREEN)
        c.font = Font(bold=True, color="FFFFFFFF", size=10.5)
        c.alignment = wrap_ctr; c.border = border
        ws.column_dimensions[openpyxl.utils.get_column_letter(j)].width = width
    ws.row_dimensions[1].height = 34
    ws.freeze_panes = "A2"


def qa_sheet(title, rows, extra_col=("Proof / file / photo 证明/文件/照片", 26)):
    ws = wb.create_sheet(title)
    header(ws, [("#", 5), ("Topic 主题", 16), ("Question (EN)", 52), ("问题（中文）", 44),
                ("Answer 回答", 46), extra_col])
    r = 2; n = 0
    for row in rows:
        if isinstance(row, str):  # section heading
            for j in range(1, 7):
                c = ws.cell(r, j); c.fill = PatternFill("solid", fgColor=SECTION); c.border = border
            ws.cell(r, 2, row).font = Font(bold=True, color=GREEN, size=11)
            ws.row_dimensions[r].height = 22
            r += 1; continue
        n += 1
        topic, en, zh = row
        vals = [n, topic, en, zh, None, None]
        for j, v in enumerate(vals, start=1):
            c = ws.cell(r, j, v); c.alignment = wrap_top; c.border = border
            c.font = Font(size=10.5, bold=(j == 3))
        for j in (5, 6):
            ws.cell(r, j).fill = PatternFill("solid", fgColor=ANSWER)
        ws.row_dimensions[r].height = max(32, 15 * (1 + max(len(en) // 52, len(zh) // 26)))
        r += 1
    return ws


# ============ Read me ============
rm = wb.active; rm.title = "Read me first"; rm.column_dimensions["A"].width = 118
lines = [
    ("BestHome — factory page & bamboo product questions", 14, True),
    ("BestHome — 工厂页面及竹制品问题表", 12, True),
    ("", 11, False),
    ("We are building a factory page on decobesthome.com and 21 new bamboo fence / panel pages.", 11, False),
    ("We only publish facts you confirm here — no estimates presented as facts. Rough numbers are fine if you mark them ~.", 11, False),
    ("我们正在网站上制作工厂介绍页面和21个竹篱笆/竹屏风产品页面。我们只发布您在此表中确认的信息。大概的数字也可以，请在前面加 ~。", 11, False),
    ("", 11, False),
    ("How to fill this in / 填写方法", 12, True),
    ("• Type your answer in the light-yellow 'Answer 回答' column. English or Chinese are both fine. 英文或中文都可以。", 11, False),
    ("• If you have a certificate, document or photo, put the file name in the 'Proof' column and send the file with this sheet.", 11, False),
    ("  如有证书、文件或照片，请在'证明'栏填写文件名，并与本表一起发送。", 11, False),
    ("• Don't know? Leave it blank. 不清楚的可以空着。", 11, False),
    ("", 11, False),
    ("Tabs / 工作表", 12, True),
    ("1. Factory & company 工厂与公司 — the facts for the factory page (most important / 最重要)", 11, False),
    ("2. Bamboo products 竹制品 — open questions about the new product pages", 11, False),
    ("3. Photos needed 需要的照片 — shot list for the factory page (landscape, ≥ 2000 px wide, real photos)", 11, False),
]
for i, (t, sz, b) in enumerate(lines, 1):
    c = rm.cell(i, 1, t); c.font = Font(size=sz, bold=b, color=(GREEN if b else None))

# ============ Factory & company ============
factory = [
    "Company 公司",
    ("Founded", "In what year was the company founded? And the factory?", "公司哪一年成立？工厂哪一年成立？"),
    ("Names", "Legal company name(s): trading company and factory, and how they are related.", "公司法定名称：贸易公司和工厂分别叫什么？两者是什么关系？"),
    ("Location", "Factory address. Is it still Yuting Town, Huangshan, Anhui? Any other production sites?", "工厂地址是否仍为安徽黄山渔亭镇？是否还有其他生产基地？"),
    ("Staff", "How many employees in total? How many in production, QC, office/sales?", "员工总数是多少？生产、质检、办公/销售各多少人？"),
    ("Area", "Factory area in m² (production + warehouse). Raw-material yard size?", "工厂面积多少平方米（生产+仓库）？原材料堆场多大？"),
    ("Experience", "How many years have you made bamboo fencing for export?", "做出口竹篱笆有多少年了？"),
    ("Markets", "Main export markets and rough share (e.g. EU 60%, US 20%...). Which countries are largest?", "主要出口市场及大概比例（如欧洲60%、美国20%）？哪些国家最多？"),
    ("Customers", "Types of customers (importers, garden centres, DIY chains, landscapers). Any well-known retailers we may name? (only with permission)", "客户类型（进口商、园艺中心、建材连锁、园林公司）？有没有可以公开名字的知名零售商（需获得许可）？"),
    "Capacity & lead times 产能与交期",
    ("Output", "Monthly output per product: bamboo fence rolls (m²), panels (pcs), edging (rolls), trellis (pcs).", "每月产量：竹篱笆卷（平方米）、竹屏风（片）、竹围边（卷）、伸缩竹栅栏（片）。"),
    ("Containers", "How many 40HC containers do you ship per month / per year?", "每月/每年发多少个40HC货柜？"),
    ("Lead time", "Typical lead time: sample, first order, repeat order. Peak season?", "通常交期：样品、首单、返单分别多久？旺季是什么时候？"),
    ("MOQ", "Minimum order per product? Can customers mix products in one container? Minimum per item in a mixed container?", "每个产品的起订量？一个货柜可以混装多个产品吗？混装时每个产品最少多少？"),
    "Raw material & process 原材料与工艺",
    ("Bamboo", "Which bamboo species for each product (moso, tonkin, natural black, etc.) and where is it grown?", "各产品使用哪种竹子（毛竹、茶秆竹、紫竹等）？产地在哪里？"),
    ("Age", "At what age are the canes harvested? Season?", "竹子砍伐时一般几年生？什么季节砍伐？"),
    ("Drying", "How are canes dried (sun, kiln, both) and for how long? Target moisture content before shipping?", "竹子如何干燥（晒干、烘干或两者）？多长时间？出货前含水率目标是多少？"),
    ("Treatment", "Any anti-mould / anti-insect treatment? Which method or product? (boiling, steaming, smoking...)", "是否做防霉防虫处理？用什么方法或产品（蒸煮、蒸汽、烟熏等）？"),
    ("Carbonizing", "How is carbonized bamboo made (high-temperature steam / kiln / flame)? Temperature and time?", "碳化竹如何制作（高温蒸汽/炭化炉/火烤）？温度和时间？"),
    ("Colour", "Mahogany/red: what dye is used, is it water-based? Varnish lacquer: what type?", "红色/桃花心木色用什么染料，是否水性？清漆是什么类型？"),
    ("Steps", "Main production steps in order (sorting, cutting, drilling, wiring, finishing, packing). Any machines worth mentioning?", "主要生产步骤顺序（分拣、切割、打孔、穿铁丝、表面处理、包装）？有没有值得介绍的设备？"),
    "Quality & certificates 质量与证书",
    ("QC", "What is checked before shipping (diameter, moisture, size, wire, mould)? Who does it? Do you use AQL?", "出货前检查哪些项目（直径、含水率、尺寸、铁丝、霉变）？由谁检查？是否采用AQL标准？"),
    ("Third party", "Do customers send third-party inspectors (SGS, Intertek, Bureau Veritas)? Can we mention it?", "客户是否会请第三方验货（SGS、Intertek、BV）？我们可以在网站上提到吗？"),
    ("Certificates", "Which certificates do you hold right now (FSC, BSCI/amfori, ISO 9001, SGS reports, others)? Number + expiry date.", "目前持有哪些证书（FSC、BSCI/amfori、ISO 9001、SGS报告等）？请提供证书编号和有效期。"),
    ("Tests", "Any test reports for formaldehyde, pesticides or heavy metals? Which products, which lab, which year?", "是否有甲醛、农药或重金属检测报告？哪些产品、哪个实验室、哪一年？"),
    ("Claims", "Typical defect/claim rate and how you handle claims.", "一般的质量问题/索赔比例是多少？如何处理索赔？"),
    "Packing & OEM 包装与贴牌",
    ("Packing", "Which packing options do you offer (shrink wrap, PE bag, woven bag, carton, pallet)? Please send a photo of each.", "提供哪些包装方式（热缩膜、PE袋、编织袋、纸箱、托盘）？请每种发一张照片。"),
    ("Labels", "Can you apply customer labels, barcodes, hang tags, printed cartons? Any extra cost or MOQ?", "可以贴客户标签、条形码、吊牌、印刷纸箱吗？是否有额外费用或起订量？"),
    ("Custom", "Which sizes/colours can be customised? Shortest and tallest height you can make?", "哪些尺寸/颜色可以定制？最矮和最高能做多少？"),
    ("Loading", "Loading port(s): Xiamen only, or also others (Ningbo, Shanghai)?", "装货港口：只有厦门，还是也可以宁波、上海等？"),
    "Story 故事",
    ("Founder", "Short history: who started the company and why bamboo? Any milestone we can tell?", "简单的公司历史：谁创办的公司？为什么做竹制品？有哪些重要节点？"),
    ("Sustainability", "Anything you do for the environment or local community (waste reuse, local farmers)?", "在环保或本地社区方面做了什么（废料利用、与当地竹农合作等）？"),
    ("Video", "Can we use the factory video (IMG_4114.MOV) on the website and YouTube?", "工厂视频（IMG_4114.MOV）可以用在网站和YouTube上吗？"),
]
qa_sheet("Factory & company 工厂与公司", factory)

# ============ Bamboo products ============
products = [
    "Open questions from the new pages 新产品页面的问题",
    ("Half-round", "Half-round fence (natural and black): standard heights are 1.0 / 1.5 / 1.8 m. Is 2.0 m also a standard height? (QC photos show 200×180 cm.)", "半圆竹篱笆（本色和黑色）：标准高度是1.0/1.5/1.8米。2.0米也是标准高度吗？（验货照片里有200×180cm。）"),
    ("Edging", "Bamboo edging '35/40 mm': is that two cane grades (35 mm and 40 mm) or one range (35–40 mm)?", "竹围边“35/40mm”是指两种规格（35mm和40mm），还是一个范围（35–40mm）？"),
    ("Tonkin", "Tonkin bamboo: we only have the framed screen 120×180 cm (22 kg). Do you also make Tonkin as a roll? Sizes?", "茶秆竹：我们只有带框屏风120×180cm（22公斤）的资料。茶秆竹也可以做成卷吗？有哪些尺寸？"),
    ("Branch panel", "Bamboo branch panel: the natural and black folders have the same photos. Please send photos that clearly show each colour.", "竹枝屏风：本色和黑色文件夹里是同样的照片。请分别发能清楚看出两种颜色的照片。"),
    ("Carbonized", "Carbonized rolls: what are the exact names/colours of the two grades (camel brown 20–30 mm, dark 10–20 mm)? Is the dark one carbonized or dyed?", "碳化竹卷：两个等级（驼色20–30mm、深色10–20mm）的准确名称/颜色是什么？深色是碳化还是染色？"),
    ("Black panel", "Fixed natural black panel: bound with galvanised wire, nylon wire, or both?", "固定式紫竹屏风：用镀锌铁丝、尼龙线，还是两种都有？"),
    ("Kumo frame", "Kumo panel: round bamboo frame, wood frame, or both? Same 5 sizes as the other framed panels?", "Kumo屏风：圆竹框、木框，还是两种都有？尺寸和其他带框屏风一样是那5个吗？"),
    "Data per product 每个产品的数据",
    ("Weight", "Weight per roll / per panel for the main sizes (e.g. 1.8×1.8 m roll).", "主要尺寸每卷/每片的重量（例如1.8×1.8米的卷）。"),
    ("40HC", "Quantity per 40HC for panels, edging, trellis and twig fence (pieces or rolls).", "竹屏风、竹围边、伸缩竹栅栏、竹枝篱笆每个40HC能装多少（片或卷）？"),
    ("Wire", "Wire: gauge/diameter and spacing between wires on fence rolls.", "竹篱笆卷的铁丝：线径多少？铁丝之间的间距多少？"),
    ("Lifespan", "Realistic outdoor lifespan per product type in a European climate (rolls, half-round, panels, edging).", "在欧洲气候下各类产品户外实际使用寿命（竹卷、半圆、屏风、围边）？"),
    ("Edging feet", "Edging with feet: length of the stakes (feet) below the edging?", "带脚竹围边：插入土中的竹脚长度是多少？"),
    ("New products", "Any bamboo fence products we don't show yet that sell well?", "还有哪些我们网站上没有、但卖得好的竹篱笆产品？"),
]
qa_sheet("Bamboo products 竹制品", products)

# ============ Photos needed ============
ph = wb.create_sheet("Photos needed 需要的照片")
header(ph, [("#", 5), ("Photo (EN)", 52), ("照片（中文）", 40), ("Have it? 有吗", 14), ("File name 文件名", 32)])
shots = [
    ("Factory entrance / building with sign", "工厂大门或带招牌的厂房"),
    ("Raw bamboo stock in the yard", "堆场里的原竹"),
    ("Sorting canes by diameter", "按直径分拣竹子"),
    ("Drying area (sun or kiln)", "干燥区（晒场或烘房）"),
    ("Carbonizing kiln / oven", "碳化炉"),
    ("Drilling and wiring the canes", "打孔和穿铁丝"),
    ("Workers making fence rolls (no faces needed)", "工人制作竹篱笆卷（不需要拍脸）"),
    ("Making framed panels", "制作带框屏风"),
    ("Moisture meter test", "含水率检测"),
    ("Measuring cane diameter", "测量竹子直径"),
    ("Each packing option (shrink wrap, bag, carton, pallet)", "每种包装方式（热缩膜、袋子、纸箱、托盘）"),
    ("Labels / barcodes on finished goods", "成品上的标签/条形码"),
    ("Warehouse with finished stock", "成品仓库"),
    ("Container loading (inside of the container)", "装柜（货柜内部）"),
    ("Office / showroom", "办公室/展厅"),
    ("Certificates (photo or scan)", "证书（照片或扫描件）"),
]
dv = DataValidation(type="list", formula1='"Yes 有,No 没有,Will take 会拍"', allow_blank=True)
ph.add_data_validation(dv)
for i, (en, zh) in enumerate(shots, start=2):
    for j, v in enumerate([i - 1, en, zh, None, None], start=1):
        c = ph.cell(i, j, v); c.alignment = wrap_top; c.border = border
    for j in (4, 5):
        ph.cell(i, j).fill = PatternFill("solid", fgColor=ANSWER)
    dv.add(ph.cell(i, 4))
    ph.row_dimensions[i].height = 22
ph.cell(len(shots) + 3, 2, "Landscape, at least 2000 px wide, real photos (no AI). 横拍，宽度至少2000像素，真实照片。").font = Font(italic=True, color=GREEN)

for ws in wb.worksheets[1:]:
    ws.page_setup.orientation = "landscape"; ws.page_setup.fitToWidth = 1
    ws.sheet_properties.pageSetUpPr.fitToPage = True; ws.page_setup.fitToHeight = 0

wb.save(OUT)
print("saved", OUT)
