import Component from './common/Component'

export default class Page extends Component {
	constructor(header, main, grid, popup, form) {
		super({ tag: 'div', className: 'page dark' })
		this.appendChildren([header, main, grid, popup, form])
	}

	render() {
		document.body.appendChild(this.getNode())
	}
}
