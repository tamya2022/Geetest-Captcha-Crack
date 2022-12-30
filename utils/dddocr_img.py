import ddddocr


def get_notch_position_x(bg, fullbg):
    bg.save("./static/img/bg.png")
    with open("./static/img/bg.png", "rb") as f:
        bg_content = f.read()

    fullbg.save("./static/img/fullbg.png")
    with open("./static/img/fullbg.png", "rb") as f:
        fullbg_content = f.read()

    slide = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    res = slide.slide_comparison(bg_content, fullbg_content)
    return res["target"][0]
