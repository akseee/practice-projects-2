function giftTemplate(cards, container) {
  const cardTemplate = document.querySelector("#gift").content
  const list = document.querySelector(container)

  cards.forEach((data) => {
    const cardElement = cardTemplate.querySelector(".gift-item").cloneNode(true)

    setCardData(cardElement, data)

    cardElement.addEventListener("click", () => {
      openPopup(data)
    })

    return list.append(cardElement)
  })
}

function setCardData(card, data) {
  const title = card.querySelector(".gift__title")
  const subTitle = card.querySelector(".gift__subtitle")
  const image = card.querySelector(".gift__image img")

  title.textContent = data.name
  subTitle.textContent = data.category
  image.alt = data.category

  checkCategory(data.category, image, subTitle)
}
