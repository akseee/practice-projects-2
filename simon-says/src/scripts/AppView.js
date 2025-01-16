import Component from './base/Component'
import Button from './view/Button'
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

		this.difficulty = new Component(
			{ tag: 'div', className: 'difficulty' },
			this.easyButton,
			this.mediumButton,
			this.hardButton
		)

		this.header.appendChildren([this.title, this.difficulty])

		this.body = new Component({ tag: 'main', className: 'main' })

		this.start = new Button({ text: 'START', className: 'start' })
		this.repeat = new Button({ text: 'repeat', className: 'repeat' })
		this.restart = new Button({ text: 'new game', className: 'restart' })
		this.next = new Button({ text: 'next', className: 'next' })

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
			text: '',
		})

		this.roundsText = new Component({
			tag: 'h2',
			className: 'rounds',
			text: `:)`,
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
	}

	render() {
		this.appendChildren([this.header, this.body, this.footer])
	}

	renderKeyboard(keyboard) {
		this.keyboard = keyboard
		this.body.append(this.keyboard)
	}

	setDisabledButtons() {
		this.next.setDisabled(true)
		this.start.setDisabled(true)
		this.restart.setDisabled(true)
		this.repeat.setDisabled(true)
	}

	setInitialButtonState() {
		this.start.setDisabled(false)
		this.start.setVisible(true)

		this.next.setVisible(false)
		this.next.setDisabled(true)

		this.restart.setDisabled(true)
		this.restart.setVisible(false)

		this.repeat.setDisabled(true)
		this.repeat.setVisible(false)
	}

	setAfterRepeatButtons() {
		this.start.setVisible(false)
		this.start.setDisabled(true)

		this.next.setDisabled(true)
		this.next.setVisible(false)

		this.repeat.setVisible(true)
		this.repeat.setDisabled(true)

		this.restart.setVisible(true)
		this.restart.setDisabled(false)
	}

	setRoundButtons() {
		this.start.setVisible(false)
		this.start.setDisabled(true)

		this.next.setVisible(false)
		this.next.setDisabled(true)

		this.repeat.setDisabled(false)
		this.repeat.setVisible(true)

		this.restart.setVisible(true)
		this.restart.setDisabled(false)
	}

	setNextRoundButtons() {
		this.next.setVisible(true)
		this.next.setDisabled(false)

		this.repeat.setVisible(false)
		this.repeat.setDisabled(true)

		this.restart.setVisible(true)
		this.restart.setDisabled(false)
	}

	setGameOverButtons() {
		this.next.setVisible(false)

		this.repeat.setVisible(true)
		this.repeat.setDisabled(true)

		this.restart.setVisible(true)
		this.restart.setDisabled(false)
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

	resetRoundText() {
		this.roundsText.setTextContent(`:)`)
		this.changeInfoText('')
	}
}
