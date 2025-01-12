import Component from './base/Component'
import Body from './view/Body'
import Footer from './view/Footer'
import Header from './view/Header'

export default class AppView extends Component {
	#header
	#main
	#footer

	#presenter

	constructor(presenter) {
		super({ tag: 'div', className: 'page' })

		this.#presenter = presenter

		this.#header = new Header({
			onDifficultyChange: (difficulty) => {
				this.#presenter.onDifficultyChange(difficulty)
			},
		})

		this.#main = new Body()
		this.#footer = new Footer()

		this.append(this.#header)
		this.append(this.#main)
		this.append(this.#footer)
	}

	updateDifficulty(difficulty) {
		// this.#main.setKeyboard(difficulty)
		// передать в body - keyboard
	}

	updateSequence(sequence) {
		// set disabled lines
		// set active lines
	}

	updateRound(round) {
		// update current round in status - info
		// give it to body
	}

	updateDifficultyButtons() {
		// give it to Header
	}

	updateStatusText(text) {
		// updates
	}

	showGameOver() {
		// updates
		// give it to body - status
	}

	setKeyboard() {
		// accept from presenter
	}
}
