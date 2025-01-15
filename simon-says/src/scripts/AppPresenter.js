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

		this.keyboard.setPresenter(this)
		this.keyboard.setupKeyboard(this.model.keys)
		this.view.renderKeyboard(this.keyboard)

		this.view.setInitialButtonState()
	}

	onDifficultyChange(difficulty) {
		this.model.difficulty = difficulty
		this.model.generateSequence()
		this.keyboard.setupKeyboard(this.model.keys)

		this.view.setActiveDifficultyButton(difficulty)
	}

	handleStartButton() {
		console.log('gameStarted')
		this.view.setDifficultyButtonsDisabled(true)
		this.view.changeInfoText(this.model.info.start)

		this.startRound()
	}

	startRound() {
		this.view.changeRoundsText(this.model.currentRound)
		this.showSequence(true)
		this.model.isPlaying = true
	}

	handleNextButton() {
		console.log('next')
	}

	nextRound() {}

	gameOver() {}

	showSequence(repeat) {
		this.keyboard.showSequence(this.model.sequence, repeat)
	}

	handleRestartButton() {
		this.view.setInitialButtonState()
		this.resetGame()
	}

	resetGame() {
		this.model.currentRound = 1
		this.model.attempt = true
		this.model.isPlaying = false
		this.model.generateSequence()
		this.view.changeInfoText(this.model.info.idle)
		this.view.changeRoundsText(1)
	}

	handleRepeatButton() {
		this.view.changeInfoText(this.model.info.life)
		this.showSequence(false)
		this.view.changeInfoText(this.model.info.life)
	}

	handleInput(key) {
		if (1) {
			this.keyboard.highlightKey(key)
		} else {
			this.handleWrongInput()
			this.keyboard.highlightKey(key, false)
		}
	}

	handleWrongInput() {
		if (1) {
			this.model.attempt = false
			this.view.changeInfoText(this.model.info.life)
			this.view.changeInfoText(this.model.info.wrong)

			console.log('one more life')
		} else {
			this.view.changeInfoText(this.model.info.lost)
			this.view.changeInfoText(this.model.info.wrong)

			console.log('no more life')
		}
	}
}
