import View from './View'
import AppData from './AppData'
import Grid from './Grid'
import Form from './Form'
import Aside from './components/aside/Aside'
import Rules from './components/rules/Rules'
import Leaderboard from './components/leaderboard/Leaderboard'
import Notification from './components/aside/Notification'

export default class Connector {
	constructor() {
		this.view = new View()
		this.model = new AppData()
		this.grid = new Grid(5, null, this.onCellUpdate.bind(this))

		this.form = new Form(this.handleSubmitForm.bind(this))
		this.asideForm = new Aside('form', this.form)

		this.leaderboard = new Leaderboard()
		this.asideLeaderboard = new Aside('leaderboard', this.leaderboard)

		this.rules = new Rules()
		this.asideRules = new Aside('rules', this.rules)

		this.notification = new Notification()
		this.asideNotification = new Aside('notification', this.notification)
		this.asideNotification.hideButton()

		this.view.header.setHandlers({
			onRulesOpen: this.handleRulesOpen.bind(this),
			onLeaderboardOpen: this.handleLeaderboardOpen.bind(this),
			onSetupOpen: this.handleSetupOpen.bind(this),
		})

		this.view.main.setHandlers({
			onStart: this.handleGameStart.bind(this),
			onRestart: this.handleGameRestart.bind(this),
			onSolution: this.handleSolutionShowing.bind(this),
			onLoad: this.handleLoadGame.bind(this),
			onSave: this.handleGameSave.bind(this),
		})
	}

	onCellUpdate(row, column, action) {
		if (!this.model.isStarted && !this.model.settingsReady) {
			console.log('nothing is ready')
			return
		}
		if (this.model.settingsReady && !this.model.isStarted) {
			console.log('starting game')
			this.handleGameStart()
		}

		if (this.model.settingsReady && this.model.isStarted) {
			console.log('game is in progress')
			const value = action === 'add' ? 1 : 0
			this.model.changePlayersGrid(row, column, value)

			let player = this.model.playersGrid
			let original = this.model.currentMatrix

			if (this.compareMatrix(player, original)) {
				this.openNotififcation(
					'Congratulations! You won! Try another one, maybe make it more difficult now?'
				)
			}
		}
	}

	compareMatrix(player, original) {
		console.log(JSON.stringify(player) === JSON.stringify(original))
		return JSON.stringify(player) === JSON.stringify(original)
	}

	handleGameStart() {
		this.view.main.startTimer()
		this.model.isStarted = true

		console.log('start')
	}

	handleGameRestart() {
		this.view.main.resetTimer()
		console.log('restart')
	}

	handleSolutionShowing() {
		this.openNotififcation('soltuion')
		console.log('solution')
	}

	handleLoadGame() {
		this.openNotififcation('loading')
		console.log('loading')
	}

	handleGameSave() {
		this.openNotififcation('saving')
		console.log('saving')
	}

	setAllTemplates() {
		const templates = this.model.getAllTemplates()
		this.form.extractFromMatrix(templates)
	}

	handleSubmitForm(formData) {
		this.asideForm.closeAside()

		this.model.recieveForm(formData)
		this.model.settingsReady = true

		const matrix = this.model.getTemplateMatrix()

		this.grid.updateGrid(matrix)
	}

	handleRulesOpen() {
		this.asideRules.openAside()
	}

	handleLeaderboardOpen() {
		this.asideLeaderboard.openAside()
	}

	handleSetupOpen() {
		this.asideForm.openAside()
	}

	openNotififcation(text) {
		this.notification.setMessage(text)
		this.asideNotification.openAside()
	}

	render() {
		this.view.setGrid(this.grid)
		this.view.render()
	}

	init() {
		this.setAllTemplates()
	}
}
