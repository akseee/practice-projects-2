import View from './View'
import AppData from './AppData'
import Grid from './Grid'
import Form from './components/form/Form'
import Aside from './components/aside/Aside'
import Leaderboard from './components/leaderboard/Leaderboard'

export default class Connector {
	constructor() {
		this.view = new View()
		this.model = new AppData()
		this.grid = new Grid(5)

		this.form = new Form()
		this.asideForm = new Aside('form', this.form)

		this.leaderboard = new Leaderboard()
		this.asideLeaderboard = new Aside('leaderboard', this.leaderboard)

		this.rules = new Leaderboard()
		this.asideForm = new Aside('rules', this.rules)
	}

	setAllTemplates() {
		const templates = this.model.getAllTemplates()
		this.form.extractFromMatrix(templates)
	}

	setGridSize(size) {
		this.grid = new Grid(size)
	}

	handleSubmitForm() {
		// add to form
		this.asideForm.closeAside()
	}

	render() {
		this.view.setGrid(this.grid)
		this.view.render()
	}

	init() {
		this.setAllTemplates()
	}
}
