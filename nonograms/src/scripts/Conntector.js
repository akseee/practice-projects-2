import View from './View'
import AppData from './AppData'
import Grid from './Grid'
import Form from './components/form/Form'
import Aside from './components/aside/Aside'

export default class Connector {
	constructor() {
		this.view = new View()
		this.model = new AppData()
		this.grid = new Grid(5)

		this.form = new Form()
		this.asideForm = new Aside(this.form)
	}

	setAllTemplates() {
		const templates = this.model.getAllTemplates()
		this.form.extractFromMatrix(templates)
	}

	setGridSize(size) {
		this.grid = new Grid(size)
	}

	render() {
		this.view.setGrid(this.grid)
		this.view.render()
	}

	init() {
		this.setAllTemplates()
	}
}
