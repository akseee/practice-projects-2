import Component from '../../common/Component'
import Button from '../ui/Button'
import Info from './Info'

export default class Main extends Component {
	constructor() {
		super({ tag: 'main', className: 'main' })

		this.start = new Button('start', 'start game', () => {})
		this.restart = new Button('restart', 'restart game', () => {})
		this.load = new Button('load', 'load previous game', () => {})
		this.save = new Button('save', 'save game', () => {})
		this.solution = new Button('solution', 'solution', () => {})

		this.wrapper = new Component({ tag: 'div', className: 'controls-main' })
		this.wrapper.appendChildren([
			this.start,
			this.restart,
			this.solution,
			this.load,
			this.save,
		])

		this.info = new Info()

		this.initialButtonState()
		this.appendChildren([this.wrapper, this.info])
	}

	initialButtonState() {
		this.checkLoadings()

		this.start.setVisible(true)
		this.load.setVisible(true)

		this.restart.setVisible(false)
		this.save.setVisible(false)

		this.solution.setDisabled(true)
	}

	checkLoadings() {
		if (localStorage.getItem('save')) {
			console.log('exist')
		} else {
			this.load.setDisabled(true)
		}
	}

	setGameStartedButtons() {
		this.checkLoadings()

		this.start.setVisible(false)
		this.load.setVisible(false)

		this.restart.setVisible(true)
		this.save.setVisible(true)

		this.solution.setDisabled(false)
	}
}
