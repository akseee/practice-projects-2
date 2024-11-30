const targetDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0))

const daysElement = document
  .querySelector(".timer__item--days")
  .querySelector(".timer__value")
const hoursElement = document
  .querySelector(".timer__item--hours")
  .querySelector(".timer__value")
const minutesElement = document
  .querySelector(".timer__item--minutes")
  .querySelector(".timer__value")
const secondsElement = document
  .querySelector(".timer__item--seconds")
  .querySelector(".timer__value")

function updateTimer() {
  const now = new Date()
  const target = targetDate - now

  if (target <= 0) {
    clearInterval(timerInterval)
    return
  }

  const days = Math.floor(target / (1000 * 60 * 60 * 24))
  const hours = Math.floor((target % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((target % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((target % (1000 * 60)) / 1000)

  daysElement.textContent = days.toString()
  hoursElement.textContent = hours.toString().padStart(2, "0")
  minutesElement.textContent = minutes.toString().padStart(2, "0")
  secondsElement.textContent = seconds.toString().padStart(2, "0")
}

const timerInterval = setInterval(updateTimer, 1000)
