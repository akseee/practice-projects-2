import Component from '../../common/Component'

const rules = `Nonograms is a puzzle game to reveal a hidden picture by looking at the number clues.
The clues are given at the top and left side of the grid. Each number in these clue defines a block of black cell.
A number indicates an unbroken line of black cells, and they are in the same order as the lines.
These puzzles are often black and white—describing a binary image—but they can also be colored.`

export default class Rules extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: '' })
		this.title.setTextContent('what is this game?')

		this.text = new Component({ tag: 'p', className: 'rules-text' })
		this.text.setTextContent(rules)
		this.appendChildren([this.title, this.text])
	}
}
