function fetchData(path) {
  return fetch(`${checkPath()}scripts/gifts.json`)
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
function checkPath() {
  const currentPage = window.location.pathname
  if (currentPage.includes("index.html")) {
    return "./"
  } else if (currentPage.includes("gifts.html")) {
    return "../"
  }
}

function checkCategory(category, img, title) {
  title.classList.remove("pink")
  title.classList.remove("purple")
  title.classList.remove("green")
  if (category === "For Harmony") {
    img.src = `${checkPath()}assets/gift-for-harmony.png`
    title.classList.add("pink")
  } else if (category === "For Health") {
    img.src = `${checkPath()}assets/gift-for-health.png`
    title.classList.add("green")
  } else {
    title.classList.add("purple")
    img.src = `${checkPath()}assets/gift-for-work.png`
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
