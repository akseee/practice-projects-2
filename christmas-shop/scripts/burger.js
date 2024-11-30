let state = false

const pageWidth = window.matchMedia("(width > 768px)")

const burgerBtn = document.querySelector(".header__nav-burger-button")
const burgerContainer = document.querySelector(".header__nav-burger__container")

const menu = document.querySelector(".header__nav-burger__menu-list")

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeBurger)
})

function openBurger() {
  state = true
  burgerContainer.classList.add("active")
  burgerBtn.classList.add("active")
  document.getElementsByTagName("body")[0].style.overflow = "hidden"
}

function closeBurger() {
  state = false
  burgerContainer.classList.remove("active")
  burgerBtn.classList.remove("active")
  document.getElementsByTagName("body")[0].style.overflow = "visible"
}

burgerBtn.addEventListener("click", () => {
  state ? closeBurger() : openBurger()
})

pageWidth.addEventListener("change", () => {
  if (pageWidth.matches && state) {
    closeBurger()
    state = false
  }
})
