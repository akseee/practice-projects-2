import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Aside extends Component {
	constructor(button, children) {
		super({ tag: 'div', className: '' })

		this.aside = new Component({
			tag: 'aside',
			className: 'aside ',
		})

		this.formButton = new Button('aside-button ', button, () =>
			this.handleOpenAside()
		)

		this.aside.append(children)

		this.append(this.aside)

		document.body.append(this.formButton.getNode())
		document.body.append(this.getNode())
	}

	handleOpenAside() {
		this.formButton.toggleClass('open')
		this.aside.toggleClass('open')
	}
}
