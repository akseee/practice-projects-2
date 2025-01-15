import Component from '../base/Component'

export default class BoardKey extends Component {
	constructor({ text, disabled = false }) {
		super({
			tag: 'button',
			className: 'button key',
			text: text,
		})
		this.setAttribute('data-key', text.toLowerCase())
		this.setDisabled(disabled)
		this.clickListener = null
	}

	setDisabled(disabled) {
		// @ts-ignore
		this.getNode().disabled = disabled
	}

	getValue() {
		return this.getAttribute('data-key')
	}

	setClickListener(listener) {
		if (this.clickListener) {
			this.removeListener('click', this.clickListener)
		}
		this.clickListener = listener
		this.addListener('click', listener)
	}
}
