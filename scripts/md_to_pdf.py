# -*- coding: utf-8 -*-
"""Render the reed-fence supplier questions markdown into a clean branded PDF."""
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, ListFlowable, ListItem)

SRC = sys.argv[1]
OUT = sys.argv[2]
md = open(SRC, encoding="utf-8").read()

GREEN = colors.HexColor("#1E3D32")
LEAF = colors.HexColor("#84BE45")
BONE = colors.HexColor("#F6F3EC")
INK = colors.HexColor("#222222")
MUTE = colors.HexColor("#666666")

ss = getSampleStyleSheet()
def S(name, **kw):
    base = dict(fontName="Helvetica", textColor=INK, fontSize=10, leading=14)
    base.update(kw)
    return ParagraphStyle(name, parent=ss["Normal"], **base)
body = S("body", spaceAfter=6)
h1 = S("h1", fontName="Helvetica-Bold", fontSize=20, textColor=GREEN, leading=24, spaceAfter=4, spaceBefore=4)
h2 = S("h2", fontName="Helvetica-Bold", fontSize=13.5, textColor=GREEN, leading=17, spaceBefore=14, spaceAfter=6)
h3 = S("h3", fontName="Helvetica-Bold", fontSize=11, textColor=INK, leading=15, spaceBefore=8, spaceAfter=4)
li = S("li", spaceAfter=3)
quote = S("quote", textColor=MUTE, fontSize=9.5, leading=13, leftIndent=8,
          borderColor=LEAF, borderWidth=0, spaceAfter=6)
cellh = S("cellh", fontName="Helvetica-Bold", fontSize=9, textColor=colors.white, leading=11)
cell = S("cell", fontSize=9, leading=11.5)

def inline(t):
    t = t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", t)
    t = re.sub(r"`(.+?)`", r'<font face="Courier" color="#1E3D32">\1</font>', t)
    return t

flow = []
lines = md.split("\n")
i = 0
pending_list = []
def flush_list():
    global pending_list
    if pending_list:
        flow.append(ListFlowable([ListItem(Paragraph(inline(x), li), leftIndent=10,
                    value="•") for x in pending_list], bulletType="bullet",
                    start="•", leftIndent=12))
        flow.append(Spacer(1, 3))
        pending_list = []

code = S("code", fontName="Courier", fontSize=8.4, leading=11.5, textColor=INK)

while i < len(lines):
    ln = lines[i].rstrip()
    if ln.strip().startswith("```"):
        # fenced code block — render as a monospace box (good for copy-paste prompts)
        flush_list()
        i += 1
        buf = []
        while i < len(lines) and not lines[i].strip().startswith("```"):
            buf.append(lines[i])
            i += 1
        i += 1  # skip closing fence
        esc = "<br/>".join(
            x.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") or "&nbsp;"
            for x in buf)
        cellp = Paragraph(esc, code)
        box = Table([[cellp]], colWidths=[170 * mm])
        box.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F1EEE6")),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#D9D9D9")),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))
        flow.append(box)
        flow.append(Spacer(1, 10))
        continue
    if ln.startswith("| ") and i + 1 < len(lines) and set(lines[i+1].replace("|", "").strip()) <= set("-: "):
        # table
        flush_list()
        rows = []
        header = [c.strip() for c in ln.strip("|").split("|")]
        rows.append(header)
        i += 2
        while i < len(lines) and lines[i].lstrip().startswith("|"):
            rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
            i += 1
        data = [[Paragraph(inline(c), cellh if r == 0 else cell) for c in row]
                for r, row in enumerate(rows)]
        ncol = len(header)
        total = 170 * mm
        if ncol == 2:
            cw = [52 * mm, 118 * mm]
        else:
            cw = [total / ncol] * ncol
        t = Table(data, colWidths=cw, repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), GREEN),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BONE]),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#D9D9D9")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]))
        flow.append(t)
        flow.append(Spacer(1, 8))
        continue
    if ln.startswith("# "):
        flush_list(); flow.append(Paragraph(inline(ln[2:]), h1))
    elif ln.startswith("## "):
        flush_list(); flow.append(Paragraph(inline(ln[3:]), h2))
    elif ln.startswith("### "):
        flush_list(); flow.append(Paragraph(inline(ln[4:]), h3))
    elif ln.strip() == "---":
        flush_list(); flow.append(Spacer(1, 2))
        flow.append(HRFlowable(width="100%", thickness=1, color=LEAF, spaceAfter=6, spaceBefore=2))
    elif ln.startswith("> "):
        flush_list(); flow.append(Paragraph(inline(ln[2:]), quote))
    elif re.match(r"^\s*[-*] ", ln):
        pending_list.append(re.sub(r"^\s*[-*] ", "", ln))
    elif re.match(r"^\s*\d+\.\s", ln):
        flush_list()
        flow.append(Paragraph(inline(ln.strip()), li))
    elif ln.strip() == "":
        flush_list(); flow.append(Spacer(1, 4))
    else:
        flush_list(); flow.append(Paragraph(inline(ln), body))
    i += 1
flush_list()

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=20*mm, rightMargin=20*mm,
                        topMargin=18*mm, bottomMargin=16*mm,
                        title="Reed fence series — supplier questions",
                        author="BestHome / decobesthome")
def footer(canvas, d):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTE)
    canvas.drawString(20*mm, 10*mm, "decobesthome — Reed fence series · supplier questions")
    canvas.drawRightString(190*mm, 10*mm, "Page %d" % d.page)
    canvas.restoreState()
doc.build(flow, onFirstPage=footer, onLaterPages=footer)
print("Wrote", OUT)
