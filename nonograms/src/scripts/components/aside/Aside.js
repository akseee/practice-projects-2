// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Aside extends Component {
	constructor(children) {
		super({
			tag: 'aside',
			className: 'aside ',
		})

		this.button = new Button('aside-button ', 'open', () => this.toggleAside())

		// this.overlay = new Component({ tag: 'div', className: 'overlay' })
		// this.append(this.overlay)
		this.append(children)

		document.body.append(this.button.getNode())
		document.body.append(this.getNode())
	}

	toggleAside() {
		if (!this.checkClass('open')) {
			this.button.setTextContent('close')
			this.button.addClass('open')

			this.addClass('open')
		} else {
			this.button.setTextContent('opem')
			this.button.removeClass('open')

			this.removeClass('open')
		}
	}
}
