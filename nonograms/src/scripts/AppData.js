import { matrix } from '../matrix'

export default class AppData {
	constructor() {
		this.allTemplates = matrix

		this.currentTemplate = null
		this.currentMatrix = null
		this.difficulty = 'easy'

		this.isStarted = false
		this.settingsReady = false

		this.playersGrid = []
	}

	createPlayersGrid() {
		let temp = this.currentMatrix.length
		this.playersGrid = []
		for (let i = 0; i < temp; i++) {
			this.playersGrid.push(new Array(temp).fill(0))
		}
	}

	changePlayersGrid(x, y, value) {
		// const newValue = currentValue === 0 ? 1 : 0
		// this.changePlayersGrid(x, y, newValue)
		this.playersGrid[x][y] = value
	}

	getAllTemplates() {
		return this.allTemplates
	}

	recieveForm({ difficulty, template }) {
		this.currentTemplate = template
		this.currentMatrix = this.allTemplates[difficulty][template]
		this.difficulty = difficulty

		this.createPlayersGrid()
	}

	getTemplateMatrix() {
		return this.allTemplates[this.difficulty][this.currentTemplate]
	}

	saveInLS() {
		// localStorage.setItem('playersGrid', JSON.stringify(this.playersGrid))
	}

	getFromLS() {
		const savedGrid = localStorage.getItem('playersGrid')
		if (savedGrid) {
			this.playersGrid = JSON.parse(savedGrid)
		} else {
			console.log('No grid found in localStorage')
		}
	}

	checkGrid() {}

	setWinner() {}
}
