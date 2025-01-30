import Component from '../../common/Component'
import Button from '../ui/Button'
import Info from './Info'

export default class Main extends Component {
	constructor(grid) {
		super({ tag: 'main', className: 'main' })

		this.start = new Button('start', 'start game', () => {})
		this.restart = new Button('restart', 'restart game', () => {})
		this.load = new Button('load', 'load previous game', () => {})
		this.save = new Button('save', 'save game', () => {})

		this.wrapper = new Component({ tag: 'div', className: 'controls-main' })
		this.wrapper.appendChildren([
			this.start,
			this.restart,
			this.load,
			this.save,
		])

		this.info = new Info()

		this.initialButtonState()
		this.appendChildren([this.wrapper, this.info, grid])
	}

	initialButtonState() {
		this.checkLoadings()

		this.start.setVisible(true)
		this.restart.setVisible(false)
		this.load.setVisible(true)
		this.save.setVisible(false)
	}

	checkLoadings() {
		this.load.setDisabled(true)
	}
}
