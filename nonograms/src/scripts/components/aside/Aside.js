// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Aside extends Component {
	constructor(name, children) {
		super({
			tag: 'aside',
			className: 'aside ',
		})
		this.append(children)
		this.name = name

		this.button = new Button(`aside-button ${this.name}`, `${this.name}`, () =>
			this.toggleAside()
		)

		this.overlay = new Component({ tag: 'div', className: 'overlay' })
		this.overlay.setVisible(false)
		this.overlay.addListener('click', () => {
			this.closeAside()
		})
		document.body.append(this.overlay.getNode())

		if (this.name === 'notification') {
			this.addListener('click', () => {
				this.closeAside()
			})
		}

		document.body.append(this.button.getNode())
		document.body.append(this.getNode())
	}

	closeAside() {
		this.button.setTextContent(this.name)
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

	hideButton() {
		this.button.setVisible(false)
	}

	toggleAside() {
		if (!this.checkClass('open')) {
			this.openAside()
		} else {
			this.closeAside()
		}
	}
}
