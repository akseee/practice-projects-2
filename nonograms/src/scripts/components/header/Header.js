import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Header extends Component {
	constructor() {
		super({ tag: 'header', className: 'header' })

		this.title = new Component({ tag: 'h1', className: 'title' })
		this.title.setTextContent('nonograms')

		this.theme = new Button('theme ', 'theme', () => {})
		this.volume = new Button('volume ', '', () => {
			this.volume.toggleClass('active')
		})

		this.wrapper = new Component({ tag: 'div', className: 'controls-header' })
		this.wrapper.appendChildren([this.volume, this.theme])

		this.leaderboard = new Button('leaderboard', 'leaderboard', () => {})
		this.rules = new Button('rules', 'rules', () => {})
		this.controls = new Component({ tag: 'div', className: 'controls' })
		this.setup = new Button('setup', 'setup game', () => {})

		this.controls.appendChildren([
			this.wrapper,
			this.setup,
			this.leaderboard,
			this.rules,
		])

		this.appendChildren([this.title, this.controls])
	}
}
