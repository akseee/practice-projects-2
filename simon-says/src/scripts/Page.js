import Component from './base/Component'
import Body from './view/Body'
import Footer from './view/Footer'
import Header from './view/Header'

export default class Page extends Component {
	#header
	#main
	#footer

	constructor() {
		super({ tag: 'div', className: 'page' })

		this.#header = new Header({
			onDifficultyChange: (difficulty) => {
				console.log(`test difficulty: ${difficulty}`)
			},
		})

		this.#main = new Body()
		this.#footer = new Footer()

		this.append(this.#header)
		this.append(this.#main)
		this.append(this.#footer)
	}
}
