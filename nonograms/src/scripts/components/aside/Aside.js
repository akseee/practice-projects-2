// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Aside extends Component {
	constructor(children) {
		super({
			tag: 'aside',
			className: 'aside ',
		})
		this.append(children)

		this.button = new Button('aside-button ', 'open', () => this.toggleAside())

		this.overlay = new Component({ tag: 'div', className: 'overlay' })
		this.overlay.setVisible(false)
		this.overlay.addListener('click', () => {
			this.closeAside()
		})
		document.body.append(this.overlay.getNode())

		document.body.append(this.button.getNode())
		document.body.append(this.getNode())
	}

	closeAside() {
		this.button.setTextContent('open')
		this.button.removeClass('open')
		this.overlay.setVisible(false)
		this.removeClass('open')
	}

	openAside() {
		this.button.setTextContent('close')
		this.button.addClass('open')
		this.overlay.setVisible(true)
		this.addClass('open')
	}

	toggleAside() {
		if (!this.checkClass('open')) {
			this.openAside()
		} else {
			this.closeAside()
		}
	}
}
