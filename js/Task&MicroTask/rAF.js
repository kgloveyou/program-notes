let i = 10
let req = () => {
  i--
  requestAnimationFrame(() => {
    document.body.style.background = "red"
    requestAnimationFrame(() => {
      document.body.style.background = "blue"
      if (i > 0) {
        req()
      }
    })
  })
}

req()
