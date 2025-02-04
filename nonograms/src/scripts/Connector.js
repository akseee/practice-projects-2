import View from './View'
import AppData from './AppData'
import Grid from './Grid'
import Form from './Form'
import Aside from './components/aside/Aside'
import Rules from './components/rules/Rules'
import Leaderboard from './components/leaderboard/Leaderboard'
import Notification from './components/aside/Notification'

import startingSound from '../assets/start.mp3'
import vistorySound from '../assets/victory.mp3'
import clickingSound from '../assets/click.mp3'

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
			onVolumeToggle: this.handleVolumeToggle.bind(this),
		})

		this.view.main.setHandlers({
			onRestart: this.handleGameRestart.bind(this),
			onSolution: this.handleSolutionShowing.bind(this),
			onLoad: this.handleLoadGame.bind(this),
			onSave: this.handleGameSave.bind(this),
		})

		this.startSound = new Audio(startingSound)
		this.victorySound = new Audio(vistorySound)
		this.clickingSound = new Audio(clickingSound)
		document.addEventListener('click', () => console.log(this.model.state))
	}

	handleSubmitForm(formData) {
		this.asideForm.closeAside()
		this.clickingSound.play()

		this.model.setState('ready')

		this.model.recieveForm(formData)

		const matrix = this.model.getTemplateMatrix()

		this.grid.updateGrid(matrix)
	}

	startingGame() {
		this.startSound.play()
		this.view.main.handleStart()
		this.model.setState('playing')
	}

	endingGame() {
		this.view.main.handleOver()
		this.model.setState('waiting')
	}

	initiatePlayerVictory() {
		this.victorySound.play()
		const time = this.view.main.getTime()
		const template = this.model.currentTemplate
		const difficulty = this.model.difficulty

		this.openNotififcation(
			`Congratulations! You compelted ${template} within ${time} seconds on ${difficulty} difficulty! ${difficulty !== 'hard' ? 'Try another one, maybe make it more difficult now?' : ''}`
		)

		this.view.main.stopTimer()

		this.model.saveLeaderboardVictory(template, difficulty, time)
		this.leaderboard.setLeaderboardList()

		this.endingGame()
	}

	onCellUpdate(row, column, action) {
		if (this.model.state === 'setting') {
			return
		}

		if (this.model.state === 'ready') {
			this.startingGame()
		}

		if (this.model.state === 'playing') {
			const value = action === 'add' ? 1 : 0
			this.model.changePlayersGrid(row, column, value)

			if (this.compareMatrix() && !this.model.solution) {
				this.initiatePlayerVictory()
			}
		}
	}

	handleGameRestart() {
		this.startingGame()
		this.grid.field.clearField()
	}

	handleSolutionShowing() {
		this.clickingSound.play()
		this.openNotififcation(
			'Now you can see the original image. You cannot continue the game'
		)

		this.endingGame()
		this.showMatrix()
	}

	handleLoadGame() {
		this.clickingSound.play()
		this.openNotififcation('loading')
	}

	handleGameSave() {
		this.clickingSound.play()
		this.openNotififcation('saving')
		console.log('saving')
	}

	setAllTemplates() {
		const templates = this.model.getAllTemplates()
		this.form.extractFromMatrix(templates)
	}

	handleRulesOpen() {
		this.clickingSound.play()
		this.asideRules.openAside()
	}

	handleLeaderboardOpen() {
		this.clickingSound.play()
		this.asideLeaderboard.openAside()
	}

	handleSetupOpen() {
		this.clickingSound.play()
		this.asideForm.openAside()
	}

	handleVolumeToggle(activate) {
		this.startSound.muted = activate
		this.victorySound.muted = activate
		this.clickingSound.muted = activate
	}

	openNotififcation(text) {
		this.notification.setMessage(text)
		this.asideNotification.openAside()
	}

	compareMatrix() {
		let player = this.model.playersGrid
		let original = this.model.currentMatrix
		return JSON.stringify(player) === JSON.stringify(original)
	}

	showMatrix() {
		let original = this.model.currentMatrix
		this.grid.field.showField(original)
	}

	render() {
		this.view.setGrid(this.grid)
		this.view.render()
	}

	init() {
		this.setAllTemplates()
	}
}
