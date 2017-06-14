function toastIt (msg, time) {
  if (time === undefined) {
    time = 2500
  }
  var t = document.getElementById('toastc')
  t.innerHTML = msg
  t.style.visibility = 'visible'
  t.style.opacity = '1'
  t.style.top = '30px'
  setTimeout(function () {
    t.style.visibility = 'hidden'
    t.style.opacity = '0'
    t.style.top = '100px'
  }, time)
}

export function toast (msg, time) {
  toastIt(msg, time)
}
