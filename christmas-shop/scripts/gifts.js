async function loadCards() {
  const cards = await fetchData()
  if (cards) {
    const newArr = shuffleArray(cards)
    giftTemplate(newArr, ".gift__list")
  } else {
    console.error("Something went wrong: no cards data available")
  }
}

loadCards()
