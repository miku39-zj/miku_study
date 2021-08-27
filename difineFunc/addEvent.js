/*
 * 2021-08-25 17:37:55
 * @create by: zj
 * @Description: 
 */
const handEvent = {
  addEvent: function(dom, type, handle) {
    if (dom.addEventListener) {
      dom.addEventListener(type,handle)
    }else if (dom.attachEvent) {
      dom.attachEvent("on"+type,handle)
    }else {
      dom["on"+type] = handle
    }
  },
  removeEvnet: function (dom, type,handle) {
    if (dom.removeEventListener) {
      dom.removeEventListener(type,handle)
    }else if (dom.detachEvent) {
      dom.detachEvent("on"+type,handle)
    }else {
      dom['on'+type] = null
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault()
    }else {
      event.returnValue = false
    }
  },
  getTarget: function(e) {
    if(e.target) {
      return e.target
    }else {
      return e.srcElement
    }
  }
}
