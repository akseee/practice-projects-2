import Component from '../base/Component'

export default class Link extends Component {
	constructor({ className, text, href, onClick }) {
		super({ tag: 'a', className, text })

		this.onClick = onClick
		this.setAttribute('href', href)
		if (onClick) {
			this.onClick = onClick
			this.addListener('click', this.onClick)
		}
	}

	setHref(href) {
		this.setAttribute('href', href)
	}

	destroy() {
		this.removeListener('click', this.onClick)
		super.destroy()
	}
}
