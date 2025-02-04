import { matrix } from '../matrix'

// gameState = playing || ready || settingup ||

export default class AppData {
	constructor() {
		this.allTemplates = matrix

		this.currentTemplate = null
		this.currentMatrix = null
		this.difficulty = 'easy'

		this.isPlaying = false
		this.isReady = false
		this.solution = false

		this.state = 'waiting'
		// waitingf:
		// no setup,
		// not started

		// ready:
		// setup
		// not started

		// playing
		// setup
		// started

		this.gameState = this.playersGrid = []
	}

	setState(state) {
		this.state = state
	}

	createPlayersGrid() {
		let temp = this.currentMatrix.length
		this.playersGrid = []
		for (let i = 0; i < temp; i++) {
			this.playersGrid.push(new Array(temp).fill(0))
		}
	}

	changePlayersGrid(x, y, value) {
		this.playersGrid[x][y] = value
	}

	loadPlayerGrid(template, difficulty, matrix) {
		this.playersGrid = matrix
		this.currentTemplate = template
		this.currentMatrix = this.allTemplates[difficulty][template]
		this.difficulty = difficulty
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

	saveGame(template, difficulty, time, matrix) {
		const save = { template, difficulty, time, matrix }
		localStorage.setItem('save', JSON.stringify(save))
	}

	getSave() {
		return localStorage.getItem('save')
	}

	saveLeaderboardVictory(template, difficulty, time) {
		const currentLeaderboard = JSON.parse(localStorage.getItem('victory')) || []

		const newVictory = { template, difficulty, time }
		currentLeaderboard.push(newVictory)

		localStorage.setItem('victory', JSON.stringify(currentLeaderboard))
	}

	getFromLS() {
		const savedGrid = localStorage.getItem('playersGrid')
		if (savedGrid) {
			this.playersGrid = JSON.parse(savedGrid)
		} else {
			console.log('No grid found in localStorage')
		}
	}
}
