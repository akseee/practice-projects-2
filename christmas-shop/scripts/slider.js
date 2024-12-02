const leftBtn = document.querySelector(".arrow-left")
const rightBtn = document.querySelector(".arrow-right")
const carousel = document.querySelector(".slider__list")

let currentSlide = 0
let currentPosition = 0

window.addEventListener("resize", () => {
  currentSlide = 0
  currentPosition = 0
  carousel.style.transform = `translateX(${currentPosition}px)`
  updateControls()
})

function getSlideWidth() {
  const width = carousel.scrollWidth - carousel.clientWidth

  return Math.ceil(width / getClicks())
}

function getClicks() {
  return window.innerWidth >= 768 ? 3 : 6
}

function updateControls() {
  leftBtn.disabled = currentSlide === 0
  rightBtn.disabled = currentSlide === getClicks()
}

updateControls()

function moveRight() {
  if (currentSlide < getClicks()) {
    currentSlide++
    currentPosition -= getSlideWidth()
    carousel.style.transform = `translateX(${currentPosition}px)`
    updateControls()
  }
}

function moveLeft() {
  if (currentSlide > 0) {
    currentSlide--
    currentPosition += getSlideWidth()
    carousel.style.transform = `translateX(${currentPosition}px)`
    updateControls()
  }
}

leftBtn.addEventListener("click", moveLeft)
rightBtn.addEventListener("click", moveRight)
