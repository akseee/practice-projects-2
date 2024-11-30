function fetchData() {
  return fetch("../scripts/gifts.json")
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

function checkCategory(category, img, title) {
  if (category === "For Harmony") {
    img.src = "../assets/gift-for-harmony.png"
    title.classList.add("pink")
  } else if (category === "For Health") {
    img.src = "../assets/gift-for-health.png"
    title.classList.add("green")
  } else {
    title.classList.add("purple")
    img.src = "../assets/gift-for-work.png"
  }
}

function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
