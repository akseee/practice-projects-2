import Component from '../base/Component'
import BoardKey from './BoardKey'
import Output from './Output'

export default class VirtualKeyboard extends Component {
	constructor() {
		super({ tag: 'div', className: 'keyboardWrapper' })

		this.output = new Output()

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
}
