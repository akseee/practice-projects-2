import Component from '../../common/Component'

export default class Info extends Component {
	constructor() {
		super({ tag: 'div', className: 'info' })

		this.text = new Component({ tag: 'p', className: 'info-text' })
		this.timer = new Component({ tag: 'div', className: 'info-timer' })

		this.text.setTextContent('hihi')
		this.timer.setTextContent('00:00')

		this.appendChildren([this.text, this.timer])

		this.seconds = 0
		this.intervalId = null
		this.startTimer()
	}

	getTime() {
		return this.seconds
	}

	startTimer() {
		if (this.intervalId !== null) return

		this.intervalId = setInterval(() => {
			this.seconds++
			const minutes = Math.floor(this.seconds / 60)
			const secs = this.seconds % 60
			const timeString = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
			this.timer.setTextContent(timeString)
		}, 1000)
	}

	stopTimer() {
		if (this.intervalId === null) return

		clearInterval(this.intervalId)
		this.intervalId = null
	}

	resetTimer() {
		this.stopTimer()
		this.seconds = 0
		this.timer.setTextContent('00:00')
	}
}
