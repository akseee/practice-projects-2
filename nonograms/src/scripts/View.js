import Component from './common/Component'
import Header from './components/header/Header'
import Main from './components/main/Main'

export default class View extends Component {
	constructor() {
		super({ tag: 'div', className: 'page ' })

		// this.rules = new Rules()
		// this.asideRules = new Aside(this.rules)

		// this.leaderboard = new Leaderboard()
		// this.asideLeaderboard = new Aside(this.leaderboard)

		this.grid = null
		this.header = new Header()
		this.main = new Main()

		this.appendChildren([this.header, this.main])
	}

	setGrid(grid) {
		this.main.append(grid)
	}

	render() {
		// @ts-ignore

		document.body.appendChild(this.getNode())
	}
}
