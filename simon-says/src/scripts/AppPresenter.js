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

	startGame() {
		console.log('gameStarted')
		this.showSequence()
		this.view.setDifficultyButtonsDisabled(true)
		this.view.changeInfoText(this.model.info.start)
		this.view.changeRoundsText(this.model.currentRound)
		this.view.setToggleButton(true)
		this.showSequence()
	}

	gameOver() {}

	async showSequence() {
		this.keyboard.showSequence(this.model.sequence)
	}

	handleRepeatButton() {
		this.view.setDisableRepeat(true)
		this.view.changeInfoText(this.model.info.life)
		this.keyboard.showSequence(this.model.sequence)
	}

	handleWrongInput() {
		this.view.changeInfoText(this.model.info.wrong)

		if (this.model.attempt) {
			this.model.attempt = false
			this.view.changeInfoText(this.model.info.life)
			console.log('one more life')
		} else {
			this.view.changeInfoText(this.model.info.lost)
			console.log('no more life')
		}
	}

	startRound() {
		this.model.setIsPlaying(true)
	}
}
