import Component from './common/Component'
import Button from './components/ui/Button'

export default class Page extends Component {
	constructor(header, main) {
		super({ tag: 'div', className: 'page ' })
		this.appendChildren([header, main])
	}

	render() {
		// @ts-ignore
		document.body.appendChild(this.getNode())
	}
}
