export default class AppPresenter {
	constructor({ model, page }) {
		this.model = model
		this.view = page
		console.log(this.view)
	}

	renderView() {
		console.log(this.view)
		document.body.appendChild(this.view.getNode())
	}
}
