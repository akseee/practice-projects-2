import Component from './common/Component'
import Button from './components/ui/Button'

export default class Page extends Component {
	constructor(header, main, popup) {
		super({ tag: 'div', className: 'page ' })
		this.appendChildren([header, main, popup])
	}

	render() {
		// @ts-ignore
		document.body.appendChild(this.getNode())
	}
}
