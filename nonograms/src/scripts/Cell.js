import Component from './common/Component'

export default class Cell extends Component {
	constructor(x, y, size) {
		super({ tag: 'button', className: 'cell' })

		this.row = x
		this.column = y

		this.fieldSize = size

		this.setAttribute('data-row', this.row)
		this.setAttribute('data-column', this.column)

		this.setEdges()

		this.addListener('click', (e) => this.handleLeftClick(e))
		this.addListener('contextmenu', (e) => this.handleRightClick(e))
	}

	setEdges() {
		if ((this.row + 1) % 5 === 0) {
			!(this.row + 1 === this.fieldSize) && this.addClass('bottom')
		}

		if ((this.column + 1) % 5 === 0) {
			!(this.column + 1 === this.fieldSize) && this.addClass('right')
		}
	}

	handleRightClick(e) {
		e.preventDefault()

		if (this.checkClass('choosen')) {
			return
		}

		if (this.getChildren().length !== 0) {
			console.log('yew')
			this.destroyChildren()
		} else {
			const cross = new Component({ tag: 'div', className: 'cross' })
			this.append(cross)
		}

		this.toggleClass('marked')
	}

	handleLeftClick(e) {
		e.preventDefault()

		if (this.checkClass('marked')) {
			this.removeClass('marked')
			this.destroyChildren()
		}

		this.toggleClass('choosen')
	}
}
