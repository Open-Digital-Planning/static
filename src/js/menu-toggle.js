;(function () {
  const overlay = document.createElement('div')
  overlay.classList.add('menu-overlay')
  document.body.appendChild(overlay)
  const openButton = document.querySelector('.js-menu-toggle-open')
  const closeButton = document.querySelector('.js-menu-toggle-close')
  const firstLink = document.querySelector(
    '.js-menu-list .js-menu-item:first-child a'
  )
  const lastLink = document.querySelector(
    '.js-menu-list .js-menu-item:last-child a'
  )
  let menuIsOpen = false
  let mql = window.matchMedia('(max-width: 47.99999999em)')
  let isMobile = mql.matches

  const menuWrapper = document.querySelector('.js-menu-wrapper')
  const openMenu = function () {
    document.body.style.overflow = 'hidden'
    overlay.style.opacity = '1'
    overlay.style.display = 'block'
    menuWrapper.classList.toggle('open')
    setTimeout(function () {
      firstLink.focus()
    }, 301)
    menuIsOpen = true
  }
  const closeMenu = function () {
    document.body.style.overflow = ''
    overlay.style.opacity = '0'
    overlay.style.display = 'none'
    menuWrapper.classList.toggle('open')
    setTimeout(function () {
      openButton.focus()
    }, 301)
    menuIsOpen = false
  }
  lastLink &&
    lastLink.addEventListener('keydown', function (e) {
      if (isMobile && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        closeButton.focus()
      }
    })
  closeButton &&
    closeButton.addEventListener('keydown', function (e) {
      if (isMobile && e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        lastLink.focus()
      }
    })
  menuWrapper &&
    menuWrapper.addEventListener('keydown', function (e) {
      if (isMobile && menuIsOpen && e.key === 'Escape') {
        closeMenu()
      }
    })
  openButton && openButton.addEventListener('click', openMenu)
  closeButton && closeButton.addEventListener('click', closeMenu)
})()
