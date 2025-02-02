import { matrix } from '../matrix'
import { randomMatrix } from './utils/utils'

export default class AppData {
	constructor() {
		this.allTemplates = matrix

		this.size = 5
		this.currentTemplate = null

		this.difficulty = 'easy'

		this.isStarted = false
	}

	getAllTemplates() {
		return this.allTemplates
	}

	saveInLS() {
		// localStorage
	}

	setTemplate(template) {
		this.currentTemplate = template
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty
	}

	setRandom() {
		this.currentTemplate = randomMatrix(this.size)
	}

	getFromLS() {
		//
	}

	checkGrid() {}

	setWinner() {}
}
