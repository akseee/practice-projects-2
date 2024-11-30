const popup = document.querySelector(".popup")
const overlay = document.getElementById("overlay")

function setPopupData(popup, data) {
  const title = popup.querySelector(".popup__title")
  const subTitle = popup.querySelector(".popup__subtitle")
  const image = popup.querySelector(".popup__image img")
  const description = popup.querySelector(".popup__description")

  title.textContent = data.name
  subTitle.textContent = data.category
  image.alt = data.category
  description.textContent = data.description

  checkCategory(data.category, image, subTitle)

  const ratingLive = popup.querySelector(".type-live .price")
  const ratingCreate = popup.querySelector(".type-create .price")
  const ratingLove = popup.querySelector(".type-love .price")
  const ratingDream = popup.querySelector(".type-dream .price")

  ratingLive.textContent = data.superpowers.live
  ratingCreate.textContent = data.superpowers.create
  ratingLove.textContent = data.superpowers.love
  ratingDream.textContent = data.superpowers.dream
}

function openPopup(data) {
  const closeButton = popup.querySelector(".popup__close-btn")

  popup.classList.add("popup_is-opened")
  overlay.classList.remove("visually-hidden")
  document.getElementsByTagName("body")[0].style.overflow = "hidden"

  setPopupData(popup, data)

  closeButton.addEventListener("click", () => {
    closePopup()
  })
}

function closePopup() {
  document.getElementsByTagName("body")[0].style.overflow = "visible"
  popup.classList.remove("popup_is-opened")
  overlay.classList.add("visually-hidden")
}

popup.addEventListener("click", (e) => {
  e.stopPropagation()
  if (e.target.classList.contains("popup_is-opened")) closePopup()
})
