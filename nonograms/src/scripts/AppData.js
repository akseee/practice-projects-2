import { matrix } from '../matrix'

export default class AppData {
	constructor() {
		this.allTemplates = matrix

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

	getTemplateMatrix() {
		return this.allTemplates[this.difficulty][this.currentTemplate]
	}

	getFromLS() {
		//
	}

	checkGrid() {}

	setWinner() {}
}
