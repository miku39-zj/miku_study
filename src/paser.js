/*
 * 2021-09-08 10:14:19
 * @create by: zj
 * @Description:  状态 解析 HTML 
 */
class geneData {
  constructor() {
    this.START_TAG = 0
    this.END_TAG = 1

    this.ALL_TAG_START = 2 // 标签内容开始
    this.ALL_TAG_END = 3 // 标签内容结束

    this.TAG_BLANK = 4 // 空格

    this.ATTR_START = 5 //

    this.ATTR_END = 6

    this.ATTR_NAME_START = 7

    this.ATTR_CONTENT_START = 8
    this.ATTR_CONTENT_END = 9

    this.CUR_ATTR = '' // 记录当前样式
    this.CUR_TAG = ''
    this.CUR_ATTR_NAME = ''
    this.CUR_ATTR_CONTENT = ''
    this.CUR_CLASS = ''
    this.ATTR_NAME = [] //保存标签属性 只考虑 style 和 class
    this.ATTR_STYLE = {}
    this.TAG_STACK = []

    this.CURRENT = this.START_TAG
    this.richText = []
  }

  getRichText() {
    return this.richText
  }
  initRichText() {
    this.richText = []
  }
  geneColor(rgb) {
    const ox = colorHex(rgb)
    console.log(ox,'oxa123');
    return ox.replace(/#/, 'ff')
  }
  getSize(str, init) {
    let size = init
    switch (str) {
    case 'ql-size-huge':
      size = 32
      break
    case 'ql-size-large':
      size = 26
      break
    case 'ql-size-small':
      size = 9
      break
    default:
      size = init
      break
    }
    return size
  }
  paserHTML(html) {
    for (let char of html) {
      this.paserChar(char)
    }
  }
  paserChar(char) {
    if (this.CURRENT === this.START_TAG && char !== '>' && char !== '/' && char !== '<' && char !== ' ') {
      this.CUR_TAG += char
    } else if (char === ' ' && this.CURRENT === this.START_TAG) { // 处理有属性的
      this.CURRENT = this.TAG_BLANK // 标签内空格 状态
    } else if (char !== ' ' && this.CURRENT === this.TAG_BLANK && char !== '=') {
      this.CUR_ATTR += char // 属性
    } else if (char === '=' && this.CURRENT === this.TAG_BLANK) {
      if (this.CUR_ATTR === 'style' || this.CUR_ATTR === 'class') {
        this.ATTR_NAME.push(this.CUR_ATTR)
      }
      this.CURRENT = this.ATTR_START
    } else if (char === '\"' && this.CURRENT === this.ATTR_START) {
      this.CURRENT = this.ATTR_NAME_START // 样式名称 状态
    } else if (char !== ':' && char !== '\"' && this.CURRENT === this.ATTR_NAME_START) {
      if (this.CUR_ATTR === 'style') {
        this.CUR_ATTR_NAME += char // 样式名称 ，例如 color
      } else if (this.CUR_ATTR === 'class') {
        this.CUR_CLASS += char
      }
    } else if (char === '\"' && this.CURRENT === this.ATTR_NAME_START) {
      this.CUR_ATTR = ''
      this.CURRENT = this.ATTR_END // 样式名称开始 状态
    } else if (char === ':' && this.CURRENT === this.ATTR_NAME_START) {
      this.CURRENT = this.ATTR_CONTENT_START // 样式内容状态
    } else if (char !== ';' && char !== ' ' && this.CURRENT === this.ATTR_CONTENT_START) {
      this.CUR_ATTR_CONTENT += char
    } else if (char === ';' && this.CURRENT === this.ATTR_CONTENT_START) {
      this.ATTR_STYLE[this.CUR_ATTR_NAME] = this.CUR_ATTR_CONTENT // 将样式存
      this.CUR_ATTR_NAME = ''
      this.CUR_ATTR_CONTENT = ''
      this.CURRENT = this.ATTR_CONTENT_END // 样式 结束
    } else if (char === ' ' && this.CURRENT == this.ATTR_CONTENT_END) {
      this.CURRENT = this.ATTR_NAME_START // 样式名称开始 状态
    } else if (char === '\"' && this.CURRENT == this.ATTR_CONTENT_END) {
      this.CUR_ATTR = ''
      this.CURRENT = this.ATTR_END // 属性结束 状态
    } else if (char === ' ' && this.CURRENT == this.ATTR_END) {
      this.CURRENT = this.TAG_BLANK // 标签内空格 状态
    } else if (char === '>' && (this.CURRENT === this.START_TAG || this.CURRENT == this.ATTR_END)) {
      this.TAG_STACK.push(this.CUR_TAG)
      const lastText = !!this.richText.length ? this.richText[this.richText.length - 1] : {}
      const hasStyle = this.ATTR_NAME.includes('style')
      const hasClass = this.ATTR_NAME.includes('class')
      if (this.CUR_TAG === 'p') {
        this.richText.push({ 'text': '', 'font': { 'size': 13 } })
      } else if (this.CUR_TAG === 'u') {
        if (lastText.text !== '') {
          const size = lastText.font.size ? lastText.font.size : 13
          this.richText.push({ 'text': '', 'font': { 'underline': true, 'size': this.getSize(this.CUR_CLASS, size) } })
        } else {
          lastText.font.underline = true
          lastText.font.size = this.getSize(this.CUR_CLASS, lastText.font.size)
        }
      } else if (this.CUR_TAG === 'em') {
        if (lastText.text !== '') {
          const size = lastText.font.size ? lastText.font.size : 13
          this.richText.push({ 'text': '', 'font': { 'italic': true, 'size': this.getSize(this.CUR_CLASS, size) } })
        } else {
          lastText.font.italic = true
          lastText.font.size = this.getSize(this.CUR_CLASS, lastText.font.size)
        }

      } else if (this.CUR_TAG === 'strong') {
        if (lastText.text !== '') {
          const size = lastText.font.size ? lastText.font.size : 13
          this.richText.push({ 'text': '', 'font': { 'bold': true, 'size': this.getSize(this.CUR_CLASS, size) } })
        } else {
          lastText.font.bold = true
          lastText.font.size = this.getSize(this.CUR_CLASS, lastText.font.size)
        }
      } else if (this.CUR_TAG === 'h1') {
        this.richText.push({ 'text': '', 'font': { 'size': this.getSize(this.CUR_CLASS, 26) } })
      } else if (this.CUR_TAG === 'h2') {
        this.richText.push({ 'text': '', 'font': { 'size': this.getSize(this.CUR_CLASS, 19.5) } })
      } else if (this.CUR_TAG === 'span') {
        if (lastText.text !== '') {
          const size = lastText.font.size ? lastText.font.size : 13
          this.richText.push({ 'text': '', 'font': { 'underline': true, 'size': this.getSize(this.CUR_CLASS, size) } })
        } else {
          lastText.font.size = this.getSize(this.CUR_CLASS, size)
        }
      }
      if (hasStyle) {
        this.richText[this.richText.length - 1].font.color = this.geneColor(this.ATTR_STYLE.color)
      }
      this.CURRENT = this.ALL_TAG_START
      this.ATTR_STYLE = {}
      this.ATTR_NAME = []
      this.CUR_TAG = ''
      this.CUR_CLASS = ''
    } else if (this.ALL_TAG_START === this.CURRENT && char !== '<') {
      const lastText = this.richText[this.richText.length - 1]
      lastText.text += char
    } else if (this.ALL_TAG_START === this.CURRENT && char === '<') {
      this.CURRENT = this.START_TAG
    } else if (this.CURRENT === this.START_TAG && char === '/') {
      this.CURRENT = this.END_TAG
    } else if (this.CURRENT === this.END_TAG && char !== '>') {
      this.CUR_TAG += char
    } else if (char === '>' && this.CURRENT === this.END_TAG) {
      if (['p', 'h1', 'h2'].includes(this.CUR_TAG)) {
        this.TAG_STACK.pop()
        const lastText = this.richText[this.richText.length - 1]
        lastText.text += '\n'
      } else {
        this.TAG_STACK.pop()
        for (let i = 0; i < this.TAG_STACK.length; i++) {
          if (i === 0 && this.TAG_STACK[i] === 'p') {
            this.richText.push({ 'text': '', 'font': { 'size': 13 } })
          } else if (i === 0 && this.TAG_STACK[i] === 'h1') {
            this.richText.push({ 'text': '', 'font': { 'size': 26 } })
          } else if (i === 0 && this.TAG_STACK[i] === 'h2') {
            this.richText.push({ 'text': '', 'font': { 'size': 19.5 } })
          } else if (this.TAG_STACK[i] === 'u') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.underline = true
          } else if (this.TAG_STACK[i] === 'em') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.italic = true
          } else if (this.TAG_STACK[i] === 'strong') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.bold = true
          }
        }
      }
      this.CURRENT = this.ALL_TAG_END
      this.CUR_TAG = ''
    } else if (this.ALL_TAG_END === this.CURRENT && char === '<') {
      this.CURRENT = this.START_TAG
    } else if (this.ALL_TAG_END === this.CURRENT && char !== '<') {
      const lastText = this.richText[this.richText.length - 1]
      lastText.text += char
    }
  }
}

//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
//转换为十六进制方法
function colorHex(string) { // rgb 转 16进制
  if (/^(rgb|RGB)/.test(string)) {
    var aColor = string.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = string;
    }
    return strHex;
  } else if (reg.test(string)) {
    var aNum = string.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return string;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return string;
  }
}

const parser = new geneData()
parser.paserHTML('<p>asd<span style="color: rgb(230, 0, 0);" class="ql-size-large">qweqwe</span><u>afsdf</u><em>afsd</em></p>')
console.log(parser.richText, 12);