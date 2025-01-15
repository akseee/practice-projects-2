export default class AppPresenter {
	constructor({ model, page, keyboard }) {
		this.model = model
		this.view = page
		this.keyboard = keyboard
	}

	render() {
		document.body.appendChild(this.view.getNode())
	}

	init() {
		this.model.generateSequence()

		this.view.setPresenter(this)

		this.keyboard.setupKeyboard(this.model.keys)
		this.view.renderKeyboard(this.keyboard)
	}

	onDifficultyChange(difficulty) {
		this.model.difficulty = difficulty
		this.model.generateSequence()
		this.keyboard.setupKeyboard(this.model.keys)

		this.view.setActiveDifficultyButton(difficulty)
	}
}
