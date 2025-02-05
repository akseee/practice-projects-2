import Component from '../../common/Component'

let isMouseDown = false
let current = null

document.addEventListener('mouseup', () => {
	isMouseDown = false
	current = null
})

export default class Cell extends Component {
	constructor(x, y, size, cellHandler, soundHandler) {
		super({ tag: 'button', className: 'cell' })

		this.row = x
		this.column = y
		this.fieldSize = size
		this.cellHandler = cellHandler
		this.soundHandler = soundHandler

		this.setAttribute('data-row', this.row)
		this.setAttribute('data-column', this.column)

		this.setEdges()

		this.addListener('contextmenu', (e) => e.preventDefault())
		this.addListener('mousedown', (e) => this.handleMouseDown(e))
		this.addListener('mouseenter', (e) => this.handleMouseEnter(e))
	}

	setEdges() {
		if ((this.row + 1) % 5 === 0) {
			!(this.row + 1 === this.fieldSize) && this.addClass('bottom')
		}

		if ((this.column + 1) % 5 === 0) {
			!(this.column + 1 === this.fieldSize) && this.addClass('right')
		}
	}

	click() {
		this.addChoosen()
	}

	handleMouseDown(e) {
		e.preventDefault()
		isMouseDown = true
		this.soundHandler(e.button)
		if (e.button === 0) {
			this.handleLeftClick(e)
		} else if (e.button === 2) {
			this.handleRightClick(e)
		}
	}

	handleMouseEnter(e) {
		if (isMouseDown && current) {
			if (current === 'set-marked') {
				this.addMarked()
			} else if (current === 'set-choosen') {
				this.addChoosen(e)
			} else if (current === 'remove-marked') {
				this.removeMarked()
			} else if (current === 'remove-choosen') {
				this.removeChoosen(e)
			}
		}
	}

	handleLeftClick(e) {
		if (this.checkClass('choosen')) {
			this.removeChoosen(e)
			current = 'remove-choosen'
		} else {
			this.addChoosen(e)
			current = 'set-choosen'
		}
	}

	handleRightClick(e) {
		if (this.checkClass('marked')) {
			this.removeMarked()
			current = 'remove-marked'
		} else {
			this.addMarked()
			current = 'set-marked'
		}
	}

	addMarked() {
		if (this.checkClass('choosen')) {
			return
		}
		if (!this.checkClass('marked')) {
			this.addClass('marked')
			const cross = new Component({ tag: 'div', className: 'cross' })
			this.append(cross)
		}
	}

	removeMarked(e) {
		if (this.checkClass('marked')) {
			this.removeClass('marked')
			this.destroyChildren()
		}
	}

	addChoosen(e) {
		if (this.checkClass('choosen')) {
			return
		}

		if (this.checkClass('marked')) {
			this.removeMarked()
		}

		this.addClass('choosen')
		this.cellHandler(this.row, this.column, 'add', e)
	}

	removeChoosen(e) {
		if (!this.checkClass('choosen')) {
			return
		}
		this.removeClass('choosen')

		this.cellHandler(this.row, this.column, 'remove', e)
	}
}
