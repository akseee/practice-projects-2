export default class AppPresenter {
	constructor({ model, page, keyboard }) {
		this.model = model
		this.view = page
		this.keyboard = keyboard
	}

	setup() {
		this.keyboard.setPresenter(this)
		this.keyboard.setupKeyboard(this.model.keys)
		this.keyboard.disableKeyboard()
		this.view.renderKeyboard(this.keyboard)

		this.view.setInitialButtonState()
		this.bindButtonListeners()
	}

	render() {
		document.body.appendChild(this.view.getNode())
	}

	startRound() {
		this.model.resetClicks()
		this.model.generateSequence()
		this.keyboard.clearOutput()
		this.view.changeRoundsText(this.model.currentRound)
		this.showSequence(true)
	}

	completeRound() {
		if (this.model.currentRound < 5) {
			this.view.setNextRoundButtons()
			this.model.currentRound += 1
			this.keyboard.disableKeyboard()
		} else {
			this.view.changeInfoText(this.model.info.win)
			this.gameOver()
		}
	}

	gameOver() {
		this.keyboard.disableKeyboard()
		this.view.setRoundButtons()
	}

	resetGame() {
		this.model.currentRound = 1
		this.model.resetAttempt()
		this.model.resetClicks()

		this.view.changeInfoText(this.model.info.idle)
		this.view.changeRoundsText(1)
		this.view.setDifficultyButtonsDisabled(false)
	}

	// keyboard handlers

	showSequence(repeat) {
		this.keyboard.showSequence(this.model.sequence, repeat)
	}

	handleInput(key) {
		const expected = this.model.sequence[this.model.clicks]
		if (expected === key) {
			this.keyboard.printKey(key)
			this.keyboard.highlightKey(key, true)
			this.model.clicks += 1

			if (this.model.sequence.length === this.model.clicks) {
				this.completeRound()
			}
		} else {
			this.keyboard.highlightKey(key, false)
			this.handleWrongInput()
		}
	}

	handleWrongInput() {
		this.keyboard.disableKeyboard()
		if (this.model.attempt) {
			this.view.changeInfoText(this.model.info.incorrect)
			this.keyboard.disableKeyboard()
			this.keyboard.clearOutput()
			this.model.useAttempt()
		} else {
			this.view.changeInfoText(this.model.info.lost)
			this.view.setAfterRepeatButtons()
		}
	}

	// buttons listeners

	handleStartButton() {
		console.log('Game is started! Good luck')

		this.view.setDifficultyButtonsDisabled(true)
		this.view.changeInfoText(this.model.info.start)
		this.startRound()
	}

	handleRepeatButton() {
		this.showSequence(false)
		this.view.changeInfoText(this.model.info.life)
	}

	handleNextButton() {
		this.startRound()
	}

	handleRestartButton() {
		this.setup()
		this.resetGame()
	}

	handleDifficultyChange(difficulty) {
		this.model.setDifficulty(difficulty)
		this.model.generateSequence()
		this.keyboard.setupKeyboard(this.model.keys)

		this.view.setActiveDifficultyButton(difficulty)
		this.keyboard.disableKeyboard()
	}

	bindButtonListeners() {
		this.view.start.addListener('click', () => {
			this.handleStartButton()
		})

		this.view.repeat.addListener('click', () => this.handleRepeatButton())
		this.view.restart.addListener('click', () => this.handleRestartButton())
		this.view.next.addListener('click', () => this.handleNextButton())

		this.view.easyButton.addListener('click', () =>
			this.handleDifficultyChange('easy')
		)
		this.view.mediumButton.addListener('click', () =>
			this.handleDifficultyChange('medium')
		)
		this.view.hardButton.addListener('click', () =>
			this.handleDifficultyChange('hard')
		)
	}
}
