document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.querySelector(".scroll")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300 && window.innerWidth <= 768) {
      scrollBtn.classList.add("active")
    } else {
      scrollBtn.classList.remove("active")
    }
  })

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
    })
  })
})
