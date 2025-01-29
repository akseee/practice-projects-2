import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Header extends Component {
	constructor() {
		super({ tag: 'header', className: 'header' })

		this.title = new Component({ tag: 'h1', className: 'title' })
		this.title.setTextContent('nonograms')

		this.controls = new Component({ tag: 'div', className: 'controls' })

		this.leaderboard = new Button('leaderboard', 'leaderboard', () => {})
		this.setup = new Button('setup', 'setup game', () => {})
		this.volume = new Button('volume ', '', () => {
			this.volume.toggleClass('active')
		})
		this.theme = new Button('theme ', 'theme', () => {})

		this.controls.appendChildren([
			this.volume,
			this.theme,
			this.leaderboard,
			this.setup,
		])

		this.appendChildren([this.title, this.controls])
	}
}
