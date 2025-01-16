export default class AppPresenter {
	constructor({ model, page, keyboard }) {
		this.model = model
		this.view = page
		this.keyboard = keyboard
		this.isInitialized = false
	}

	showSequence(repeat) {
		this.keyboard.showSequence(this.model.sequence, repeat)
	}

	// buttons listeners
	handleStartButton() {
		console.log('game started')
		this.startRound()
	}

	handleRepeatButton() {
		console.log('game repeat')
		this.repeatRound()
	}

	handleNextButton() {
		console.log('next round')
		this.startRound()
	}

	handleRestartButton() {
		console.log('restarted')
		this.resetGame()
	}

	// setup
	startRound() {
		this.model.generateSequence()
		this.model.resetClicks()
		this.keyboard.clearOutput()

		this.view.setDifficultyButtonsDisabled(true)

		this.view.changeRoundsText(this.model.currentRound)

		this.showSequence(true)
	}

	resetGame() {
		this.keyboard.disableKeyboard()
		this.keyboard.clearOutput()

		this.view.renderKeyboard(this.keyboard)
		this.view.setInitialButtonState()

		this.view.setDifficultyButtonsDisabled(false)

		this.view.resetRoundText()

		this.model.resetClicks()
		this.model.resetRounds()
		this.model.resetAttempt()
		this.model.resetSequence()
	}

	repeatRound() {
		this.showSequence(false)
		this.view.changeInfoText(this.model.info.life)
		this.model.resetClicks()
		this.keyboard.clearOutput()
	}

	nextRound() {
		this.view.setNextRoundButtons()
		this.model.currentRound += 1
		this.keyboard.disableKeyboard()
	}

	gameOver() {
		this.view.changeInfoText(this.model.info.win)
		this.view.setGameOverButtons()
	}

	completeRound() {
		this.model.resetSequence()

		if (this.model.currentRound < 5) {
			this.nextRound()
		} else {
			this.gameOver()
		}
	}

	// keyboard handlers

	handleInput(key) {
		const expected = this.model.sequence[this.model.clicks]
		this.keyboard.printKey(key)

		if (expected === key) {
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
			this.model.useAttempt()
		} else {
			this.view.changeInfoText(this.model.info.lost)
			this.view.setAfterRepeatButtons()
		}
	}

	handleDifficultyChange(difficulty) {
		this.model.setDifficulty(difficulty)

		this.keyboard.setupKeyboard(this.model.keys)
		this.keyboard.disableKeyboard()

		this.view.setActiveDifficultyButton(difficulty)
	}

	// add listeners

	bindButtonListeners() {
		this.view.start.setOnClickListener(() => this.handleStartButton())
		this.view.repeat.setOnClickListener(() => this.handleRepeatButton())
		this.view.restart.setOnClickListener(() => this.handleRestartButton())
		this.view.next.setOnClickListener(() => this.handleNextButton())

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

	// intiialize game

	render() {
		document.body.appendChild(this.view.getNode())
	}

	setup() {
		this.keyboard.setPresenter(this)
		this.keyboard.setupKeyboard(this.model.keys)

		this.keyboard.disableKeyboard()
		this.keyboard.clearOutput()

		this.view.renderKeyboard(this.keyboard)
		this.view.setInitialButtonState()

		this.bindButtonListeners()
	}
}
