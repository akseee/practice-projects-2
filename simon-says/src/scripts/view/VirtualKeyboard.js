import Component from '../base/Component'
import BoardKey from './BoardKey'

export default class VirtualKeyboard extends Component {
	constructor() {
		super({ tag: 'div', className: 'keyboardWrapper' })

		this.output = new Component({
			tag: 'input',
			className: 'output',
		})

		this.output.setAttribute('readonly', true)

		this.display = new Component(
			{ tag: 'div', className: 'display' },
			this.output
		)

		this.keyboard = new Component({ tag: 'div', className: 'keyboard' })

		this.render()
	}

	render() {
		this.appendChildren([this.display, this.keyboard])
	}

	setupKeyboard(keys) {
		this.keyboard.destroyChildren()
		this.keyboard.appendChildren(
			keys.map((key) => new BoardKey({ text: key, disabled: false }))
		)
	}

	getKey(keyValue) {
		return this.keyboard.querySelector(`[data-key="${keyValue.toLowerCase()}"]`)
	}

	getAllKeys() {
		return this.keyboard.getChildren()
	}

	highlightKey(keyValue, isValid) {
		const key = this.getKey(keyValue)
		if (key) {
			key.disabled = false
			key.classList.add(isValid ? 'active' : 'wrong')
			setTimeout(() => key.classList.remove('active', 'wrong'), 500)
		}
	}

	showSequence(sequence) {
		sequence.forEach((key, index) => {
			setTimeout(() => {
				this.disableKeyboard()
				this.highlightKey(key, true)
			}, 750 * index)
		})
		setTimeout(() => {
			this.enableKeyboard()
		}, 750 * sequence.length)
	}

	enableKeyboard() {
		this.getAllKeys().map((key) => key.setDisabled(false))
	}

	disableKeyboard() {
		this.getAllKeys().map((key) => key.setDisabled(true))
	}
}
