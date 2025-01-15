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

		this.optionalBtn = new Component({
			tag: 'button',
			className: 'button option ',
			text: 'click above to start game :)',
		})
		this.optionalBtn.setDisabled(true)
		this.startBtn = new Component({
			tag: 'button',
			className: 'button start ',
			text: 'start new game',
		})

		this.controls = new Component({ tag: 'div', className: 'controls' })
		this.controls.appendChildren([this.startBtn, this.optionalBtn])

		this.infoText = new Component({
			tag: 'p',
			className: 'info',
			text: '...waiting for the game to start',
		})

		this.roundsText = new Component({
			tag: 'h2',
			className: 'rounds',
			text: `Round 1/6`,
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

	setActiveDifficultyButton(difficulty) {
		;[this.easyButton, this.mediumButton, this.hardButton].forEach((button) => {
			if (button.getAttribute('data-difficulty') === difficulty) {
				button.setActive(true)
			} else {
				button.setActive(false)
			}
		})
	}
}
