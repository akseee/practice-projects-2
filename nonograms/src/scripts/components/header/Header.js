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
			this.handleRulesOpen()
		})
		this.rules = new Button('rules', 'rules', () => {
			this.handleRulesOpen
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
	}

	handleRulesOpen() {
		console.log('opened rules')
	}

	handleLeaderboardOpen() {
		console.log('opened leaderboard')
	}
	handleSetupOpen() {
		console.log('opeend settings')
	}

	handleThemeChange() {
		const setTheme = (theme) => {
			document.body.classList.remove('dark', 'light')
			document.body.classList.add(theme)
		}

		if (document.body.classList.contains('dark')) {
			setTheme('light')
		} else {
			setTheme('dark')
		}
	}

	handleVolume() {
		// this.volume.toggleClass('active')
		console.log('toggled volume')
	}
}
