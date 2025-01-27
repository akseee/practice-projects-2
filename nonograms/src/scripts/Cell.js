import Component from './common/Component'

export default class Cell extends Component {
	constructor(x, y, size) {
		super({ tag: 'button', className: 'cell' })

		this.row = x
		this.column = y

		this.fieldSize = size

		// this.state = {
		// 	coordinates: [x, y],
		// 	marked: false,
		// 	choosen: false,
		// 	empty: true,
		// 	value: 0,
		// }

		this.setAttribute('data-row', this.row)
		this.setAttribute('data-column', this.column)

		this.crossMark = document.createElement('div')
		this.crossMark.classList.add('cross')

		this.setEdges()
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
			this.destroyChildren()
		} else {
			this.append(this.crossMark)
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
