import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Header extends Component {
	constructor() {
		super({ tag: 'header', className: 'header' })

		this.title = new Component({ tag: 'h1', className: 'title' })
		this.title.setTextContent('nonograms')

		this.theme = new Button('theme ', 'theme', () => {
			this.handleThemeChange()
		})
		this.volume = new Button('volume ', '', () => {
			this.handleVolume()
		})

		this.wrapper = new Component({ tag: 'div', className: 'controls-header' })
		this.wrapper.appendChildren([this.volume, this.theme])

		this.leaderboard = new Button('leaderboard', 'leaderboard', () => {
			this.handleLeaderboardOpen()
		})

		this.rules = new Button('rules', 'rules', () => {
			this.handleRulesOpen()
		})
		this.controls = new Component({ tag: 'div', className: 'controls' })
		this.setup = new Button('setup', 'setup game', () => {
			this.handleSetupOpen()
		})

		this.controls.appendChildren([
			this.wrapper,
			this.setup,
			this.leaderboard,
			this.rules,
		])

		this.appendChildren([this.title, this.controls])

		this.handlers = {
			onRulesOpen: null,
			onLeaderboardOpen: null,
			onSetupOpen: null,
		}
	}

	setHandlers(handlers) {
		this.handlers = { ...this.handlers, ...handlers }
	}

	handleRulesOpen() {
		if (this.handlers.onRulesOpen) {
			this.handlers.onRulesOpen()
		} else {
			console.log('something is wrong with rules handler')
		}
	}

	handleLeaderboardOpen() {
		if (this.handlers.onLeaderboardOpen) {
			this.handlers.onLeaderboardOpen()
		} else {
			console.log('something is wrong with leaderboard handler')
		}
	}

	handleSetupOpen() {
		if (this.handlers.onSetupOpen) {
			this.handlers.onSetupOpen()
		} else {
			console.log('something is wrong with setup handler')
		}
	}

	handleThemeChange() {
		const setTheme = (theme) => {
			document.body.classList.remove('dark', 'light')
			document.body.classList.add(theme)
		}

		if (document.body.classList.contains('light')) {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	handleVolume() {
		this.volume.toggleClass('active')
		console.log('toggled volume')
	}
}
