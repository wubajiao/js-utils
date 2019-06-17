let ModalHelper = (function (bodyCls) {
  let isOpen = false
  let scrollTop
  return {
    open: function () {
      if (isOpen) return
      isOpen = true
      scrollTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0)
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    close: function () {
      if (!isOpen) return
      isOpen = false
      document.body.classList.remove(bodyCls)
      // scrollTop lost after set position:fixed, restore it back.
      window.scrollTo(0, scrollTop)
    }
  }
})('modal-open')

export default ModalHelper
