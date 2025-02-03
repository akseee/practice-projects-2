import Component from '../../common/Component'
import Button from '../ui/Button'
import Info from './Info'

export default class Main extends Component {
	constructor() {
		super({ tag: 'main', className: 'main' })

		this.restart = new Button('restart', 'restart game', () =>
			this.handelRestart()
		)
		this.load = new Button('load', 'load last saved game', () =>
			this.handleLoad()
		)
		this.save = new Button('save', 'save game', () => this.handleSave())
		this.solution = new Button('solution', 'solution', () =>
			this.handleSolution()
		)

		this.wrapper = new Component({ tag: 'div', className: 'controls-main' })
		this.wrapper.appendChildren([
			this.restart,
			this.solution,
			this.load,
			this.save,
		])

		this.info = new Info()

		this.setInitialButtonState()
		this.appendChildren([this.wrapper, this.info])

		this.handlers = {
			onStart: null,
			onRestart: null,
			onSolution: null,
			onLoad: null,
			onSave: null,
		}
	}

	setHandlers(handlers) {
		this.handlers = { ...this.handlers, ...handlers }
	}

	startTimer() {
		this.info.startTimer()
	}

	resetTimer() {
		this.info.resetTimer()
	}

	handleStart() {
		if (this.handlers.onStart) {
			this.handlers.onRestart()
			this.setInitialButtonState()
		} else {
			console.log('something is wrong with restarting handler')
		}
	}

	handelRestart() {
		if (this.handlers.onRestart) {
			this.handlers.onRestart()
			this.setInitialButtonState()
		} else {
			console.log('something is wrong with restarting handler')
		}
	}

	handleSolution() {
		if (this.handlers.onSolution) {
			this.handlers.onSolution()
			this.setAfterSolutionButtons()
		} else {
			console.log('something is wrong with solution handler')
		}
	}

	handleLoad() {
		if (this.handlers.onLoad) {
			this.handlers.onLoad()
			this.setGameStartedButtons()
		} else {
			console.log('something is wrong with loading handler')
		}
	}

	handleSave() {
		if (this.handlers.onSave) {
			this.handlers.onSave()
		} else {
			console.log('something is wrong with saving handler')
		}
	}

	setInitialButtonState() {
		this.checkLoadings()

		this.restart.setVisible(true)
		this.restart.setDisabled(true)

		this.load.setVisible(true)
		this.save.setVisible(false)

		this.solution.setDisabled(true)
	}

	setGameStartedButtons() {
		this.restart.setVisible(true)
		this.restart.setDisabled(false)

		this.load.setVisible(false)

		this.save.setVisible(true)
		this.save.setDisabled(false)

		this.solution.setDisabled(false)
	}

	setAfterSolutionButtons() {
		this.restart.setVisible(true)
		this.restart.setDisabled(false)

		this.load.setVisible(false)
		this.save.setVisible(true)
		this.save.setDisabled(true)

		this.solution.setDisabled(true)
	}

	checkLoadings() {
		if (localStorage.getItem('save')) {
			console.log('exist')
		} else {
			this.load.setDisabled(true)
		}
	}
}
