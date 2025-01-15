import Component from './base/Component'
import DifficultyButton from './view/DifficultyButton'

import Link from './view/Link'

export default class AppView extends Component {
	constructor() {
		super({ tag: 'div', className: 'page' })

		this.header = new Component({
			tag: 'header',
			className: 'header',
		})

		this.title = new Component({
			tag: 'h1',
			className: 'title',
			text: 'Simon Saysssss',
		})

		this.easyButton = new DifficultyButton('easy')

		this.mediumButton = new DifficultyButton('medium')

		this.hardButton = new DifficultyButton('hard')

		this.easyButton.addListener('click', () =>
			this.presenter.onDifficultyChange('easy')
		)
		this.mediumButton.addListener('click', () =>
			this.presenter.onDifficultyChange('medium')
		)
		this.hardButton.addListener('click', () =>
			this.presenter.onDifficultyChange('hard')
		)

		this.difficulty = new Component(
			{ tag: 'div', className: 'difficulty' },
			this.easyButton,
			this.mediumButton,
			this.hardButton
		)

		this.header.appendChildren([this.title, this.difficulty])

		this.body = new Component({ tag: 'main', className: 'main' })

		this.start = new Component({
			tag: 'button',
			className: 'button start ',
			text: 'START',
		})

		this.start.addListener('click', () => {
			this.presenter.startGame()
		})

		this.repeat = new Component({
			tag: 'button',
			className: 'button repeat ',
			text: 'repeat',
		})
		this.repeat.addListener('click', () => this.presenter.handleRepeatButton())

		this.restart = new Component({
			tag: 'button',
			className: 'button restart ',
			text: 'new game',
		})

		this.next = new Component({
			tag: 'button',
			className: 'button next',
			text: 'next',
		})

		this.controls = new Component({ tag: 'div', className: 'controls' })
		this.controls.appendChildren([
			this.start,
			this.next,
			this.repeat,
			this.restart,
		])

		this.infoText = new Component({
			tag: 'p',
			className: 'info',
			text: '...waiting for the game to start',
		})

		this.roundsText = new Component({
			tag: 'h2',
			className: 'rounds',
			text: `Round 1/5`,
		})

		this.status = new Component({ tag: 'div', className: 'status' })
		this.status.appendChildren([this.infoText, this.roundsText])

		this.information = new Component({ tag: 'div', className: 'information' })
		this.information.appendChildren([this.controls, this.status])

		this.keyboard = null
		this.body.append(this.information)

		this.footer = new Component({
			tag: 'footer',
			className: 'footer',
		})

		this.footer.append(
			new Link({
				className: '',
				text: 'gh@akseee',
				href: 'https://github.com/akseee',
				onClick: () => {},
			})
		)
		this.render()
		this.setInitialButtonState()
	}

	setPresenter(presenter) {
		this.presenter = presenter
	}

	render() {
		this.appendChildren([this.header, this.body, this.footer])
	}

	renderKeyboard(keyboard) {
		this.keyboard = keyboard
		this.body.append(this.keyboard)
	}

	setInitialButtonState() {
		this.next.setVisible(false)
		this.restart.setDisabled(true)
		this.repeat.setDisabled(true)
	}

	setToggleButton(playing) {
		if (playing) {
			this.setActivateNext(playing)
			this.start.setVisible(false)
		} else {
			this.setInitialButtonState()
		}
	}

	setDisableRepeat(disabled) {
		this.repeat.setDisabled(disabled)
	}

	setActiveOptions() {
		this.next.setDisabled(false)
		this.repeat.setDisabled(false)
		this.restart.setDisabled(false)
	}

	setActivateNext(valid) {
		this.next.setVisible(true)
		this.setActiveOptions()
		if (!valid) {
			this.next.setDisabled(false)
		} else {
			this.next.setDisabled(true)
		}
	}

	setActiveDifficultyButton(difficulty) {
		;[this.easyButton, this.mediumButton, this.hardButton].forEach((button) => {
			if (button.getAttribute('data-difficulty') === difficulty) {
				button.setActive(true)
			} else {
				button.setActive(false)
			}
		})
	}

	setDifficultyButtonsDisabled(disabled) {
		;[this.easyButton, this.mediumButton, this.hardButton].forEach((button) => {
			button.setDisabled(disabled)
		})
	}

	changeInfoText(text) {
		this.infoText.setTextContent(text)
	}

	changeRoundsText(round) {
		this.roundsText.setTextContent(`Round ${round}/5`)
	}

	changeStartText(text) {
		this.start.setTextContent(text)
	}

	displaySequence() {}

	disabledKeyboard() {}

	updateStateText() {}
}
