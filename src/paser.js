/*
 * 2021-09-08 10:14:19
 * @create by: zj
 * @Description:  状态机 解析 HTML
 */

class geneData {
  constructor() {
    this.START_TAG = 0
    this.END_TAG = 1
    this.ALL_TAG_START = 2
    this.ALL_TAG_END = 3
    this.CUR_TAG = ''
    this.TAG_STACK = []
    this.CURRENT = this.START_TAG
    this.richText = []
  }
  paserHTML(html) {
    for(let char of html){
      this.paserChar(char)
    }
  }
  paserChar(char) {
    if (this.CURRENT === this.START_TAG && char !== '>' && char !== '/' && char !== '<') {
      this.CUR_TAG += char
    } else if (char === '>' && this.CURRENT === this.START_TAG) {
      this.TAG_STACK.push(this.CUR_TAG)
      const lastText = !!this.richText.length ? this.richText[this.richText.length - 1] : {}

      if(this.CUR_TAG === 'p') {
        this.richText.push({ 'text': '','font': {'size':13}})
      }else if (this.CUR_TAG === 'u'){
        if(lastText.text !== '') {
          this.richText.push({'text': '', 'font': {'underline': true,'size':13}})
        }else {
          lastText.font.underline = true
        }
      }else if(this.CUR_TAG === 'em') {
        if(lastText.text !== '') {
          this.richText.push({'text': '', 'font': {'italic': true,'size':13}})
        }else {
          lastText.font.italic = true
        }
      }else if(this.CUR_TAG === 'strong') {
        if(lastText.text !== '') {
          this.richText.push({'text': '', 'font': {'bold': true,'size':13}})
        }else {
          lastText.font.bold = true
        }
      }else if (this.CUR_TAG === 'h1') {
        this.richText.push({ 'text': '','font': {'size': 26}})
      }else if (this.CUR_TAG === 'h2') {
        this.richText.push({ 'text': '','font': {'size': 19.5}})
      }
      this.CURRENT =  this.ALL_TAG_START
      this.CUR_TAG = ''
    } else if (this.ALL_TAG_START===this.CURRENT && char !== '<') {
      const lastText = this.richText[this.richText.length - 1]
      lastText.text += char
    }else if (this.ALL_TAG_START === this.CURRENT && char === '<') {
      this.CURRENT = this.START_TAG
    }else if(this.CURRENT === this.START_TAG && char === '/') {
      this.CURRENT = this.END_TAG
    }else if(this.CURRENT === this.END_TAG && char !== '>') {
      this.CUR_TAG += char
    }else if (char === '>' && this.CURRENT === this.END_TAG) {
      if(['p','h1','h2'].includes(this.CUR_TAG)) {
        this.TAG_STACK.pop()
        const lastText = this.richText[this.richText.length - 1]
        lastText.text += '\n'
      }else {
        this.TAG_STACK.pop()
        for(let i = 0; i < this.TAG_STACK.length; i++) {
          if(i === 0 && this.TAG_STACK[i] === 'p') {
            this.richText.push({ 'text': '','font': {'size':13}})
          }else if (i === 0 && this.TAG_STACK[i] === 'h1') {
            this.richText.push({ 'text': '','font': {'size':26}})
          }else if (i === 0 && this.TAG_STACK[i] === 'h2') {
            this.richText.push({ 'text': '','font': {'size':19.5}})
          }else if (this.TAG_STACK[i] === 'u') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.underline = true
          }else if (this.TAG_STACK[i] === 'em') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.italic = true
          }else if (this.TAG_STACK[i] === 'strong') {
            const lastText = this.richText[this.richText.length - 1]
            lastText.font.bold = true
          }
        }
      }
      this.CURRENT = this.ALL_TAG_END
      this.CUR_TAG = ''
    }else if (this.ALL_TAG_END === this.CURRENT && char === '<'){
      this.CURRENT = this.START_TAG
    }else if(this.ALL_TAG_END === this.CURRENT && char !== '<') {
      const lastText = this.richText[this.richText.length - 1]
      lastText.text += char
    }
  }
}

const parser = new geneData()
parser.paserHTML('<p>asd<u>afsdf</u><em>afsd</em></p>')
console.log(parser.richText,12);