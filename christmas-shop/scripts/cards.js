function fetchData() {
  return fetch("./scripts/gifts.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Couldn't fetch data: ${res.status}`)
      }
      return res.json()
    })
    .catch((error) => {
      console.error("Couldn't fetch data: ", error)
      return null
    })
}

async function loadCards() {
  const cards = await fetchData()
  if (cards) {
    console.log(cards)
    giftTemplate(cards)
  } else {
    console.error("Something went wrong: no cards data available")
  }
}

function giftTemplate(cards) {
  const cardTemplate = document.querySelector("#gift").content
  const list = document.querySelector(".special__list")

  cards.forEach((data) => {
    const cardElement = cardTemplate.querySelector(".gift-item").cloneNode(true)

    setCardData(cardElement, data)

    cardElement.addEventListener("click", () => {
      openPopup()
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

  if (data.category === "For Harmony") {
    image.src = "../assets/gift-for-harmony.png"
    subTitle.classList.add("pink")
  } else if (data.category === "For Health") {
    image.src = "../assets/gift-for-health.png"
    subTitle.classList.add("green")
  } else {
    subTitle.classList.add("purple")
    image.src = "../assets/gift-for-work.png"
  }
}

function openPopup() {
  console.log("popup is open")
}

function closePopup() {
  console.log("popup is closed")
}

loadCards()
