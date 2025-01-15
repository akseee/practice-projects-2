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

		this.handlePhysicalPress = this.handlePhysicalPress.bind(this)
		this.render()
	}

	setPresenter(presenter) {
		this.presenter = presenter
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

	highlightKey(keyValue, isValid = true) {
		const key = this.getKey(keyValue)
		if (key) {
			key.disabled = false
			key.classList.add(isValid ? 'active' : 'wrong')
			setTimeout(() => key.classList.remove('active', 'wrong'), 500)
		}
	}

	showSequence(sequence, repeat) {
		sequence.forEach((key, index) => {
			setTimeout(() => {
				this.disableKeyboard()
				this.highlightKey(key, true)
				this.presenter.view.setDisabledButtons()
			}, 750 * index)
		})
		setTimeout(() => {
			this.enableKeyboard()
			if (repeat) {
				this.presenter.view.setRoundButtons()
			} else {
				this.presenter.view.setAfterRepeatButtons()
			}
		}, 750 * sequence.length)
	}

	enableKeyboard() {
		this.getAllKeys().forEach((key) => {
			key.setDisabled(false)

			key.setClickListener(() => {
				this.presenter.handleInput(key.getValue())
			})
		})

		document.addEventListener('keydown', this.handlePhysicalPress)
	}

	disableKeyboard() {
		this.getAllKeys().map((key) => key.setDisabled(true))
		document.removeEventListener('keydown', this.handlePhysicalPress)
	}

	handlePhysicalPress(event) {
		const keyValue = event.key.toLowerCase()
		const availableKeys = this.getAllKeys().map((key) =>
			key.getValue().toLowerCase()
		)

		if (availableKeys.includes(keyValue)) {
			this.presenter.handleInput(keyValue)
		}
	}

	printKey(key) {
		const currentText = this.output.getAttribute('value') || ''
		this.output.setAttribute('value', currentText + key)
	}

	clearOutput() {
		this.output.setAttribute('value', '')
	}
}
