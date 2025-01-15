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
	}
	setDisabled(disabled) {
		// @ts-ignore
		this.getNode().disabled = disabled
	}
}
