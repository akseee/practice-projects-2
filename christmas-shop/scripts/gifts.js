const tabs = document.querySelectorAll(".gift__controls .gift__controls-item")

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((element) => {
      element.classList.remove("active")
    })
    e.target.classList.add("active")

    const selectedCategory = e.target.dataset.category
    loadCards(selectedCategory)
  })
})

function sortTabs(list, tab) {
  if (tab === "all") {
    return list
  }
  return list.filter((card) => {
    return card.category === tab
  })
}

async function loadCards(category = "all") {
  const cards = await fetchData()
  if (cards) {
    const newArr = shuffleArray(cards)
    const sortedArr = sortTabs(newArr, category)
    giftTemplate(sortedArr, ".gift__list")
  } else {
    console.error("Something went wrong: no cards data available")
  }
}

loadCards()
