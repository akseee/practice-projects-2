import Component from '../base/Component'

export default class Header extends Component {
	#buttons = {}

	constructor({ onDifficultyChange }) {
		super({ tag: 'header', className: 'header' })

		const title = new Component({
			tag: 'h1',
			className: 'title',
			text: 'Simon says',
		})

		const easyButton = new Component({
			tag: 'button',
			className: 'button easy active',
			text: 'easy',
		})
		const mediumButton = new Component({
			tag: 'button',
			className: 'button medium',
			text: 'medium',
		})
		const hardButton = new Component({
			tag: 'button',
			className: 'button hard',
			text: 'hard',
		})

		this.#buttons = {
			easy: easyButton,
			medium: mediumButton,
			hard: hardButton,
		}

		easyButton.addListener('click', () => onDifficultyChange)
		mediumButton.addListener('click', () => onDifficultyChange)
		hardButton.addListener('click', () => onDifficultyChange)

		const difficultyNode = new Component(
			{ tag: 'div', className: 'difficulty' },
			easyButton,
			mediumButton,
			hardButton
		)

		this.append(title)
		this.append(difficultyNode)
	}

	#handleDifficultyChange(difficulty, onDifficultyChange) {
		Object.values(this.#buttons).forEach((button) =>
			button.removeClass('active')
		)

		this.#buttons[difficulty].addClass('active')

		if (onDifficultyChange) {
			onDifficultyChange(difficulty)
		}
	}

	disableButton(difficulty) {
		this.#buttons[difficulty].setDisabled()
	}

	enableButton(difficulty) {
		this.#buttons[difficulty].removeDisabled()
	}

	setButtonText(difficulty, text) {
		this.#buttons[difficulty].setTextContent(text)
	}
}
