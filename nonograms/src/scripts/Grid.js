import Component from './common/Component'
import Cell from './components/grid/Cell'
import Hints from './components/grid/Hints'

import { calculateColumnHints, calculateRowHints } from './utils/utils'

export default class Grid extends Component {
	constructor(size = 5, matrix = null, handler, soundHandler) {
		super({ tag: 'div', className: 'grid-wrapper' })

		this.grid = new Component({ tag: 'div', className: 'grid' })

		this.size = size
		this.matrix = matrix

		this.cellHandler = handler
		this.soundHandler = soundHandler

		this.field = new Field(this.size, this.cellHandler, this.soundHandler)
		this.filler = new Hints('filler')
		this.columnHints = new Hints('column')
		this.rowHints = new Hints('row')

		this.grid.appendChildren([
			this.filler,
			this.columnHints,
			this.rowHints,
			this.field,
		])

		this.append(this.grid)
	}

	setMatrix(matrix) {
		this.matrix = matrix
		const row = calculateRowHints(matrix)
		const column = calculateColumnHints(matrix)
		this.rowHints.createHints(row)
		this.columnHints.createHints(column)
	}

	updateGrid(matrix) {
		this.size = matrix.length
		this.matrix = matrix
		this.destroyChildren()
		this.createGrid()
		this.setMatrix(this.matrix)
	}

	createGrid() {
		this.field = new Field(this.size, this.cellHandler, this.soundHandler)
		this.filler = new Hints('filler')
		this.columnHints = new Hints('column')
		this.rowHints = new Hints('row')

		this.grid.appendChildren([
			this.filler,
			this.columnHints,
			this.rowHints,
			this.field,
		])

		this.append(this.grid)
	}
}

class Field extends Component {
	constructor(size, cellHandler, soundHandler) {
		super({
			tag: 'div',
			className: `field ${size === 5 ? 'field-5' : size === 10 ? 'field-10' : 'field-15'}`,
		})

		this.size = size
		this.cellHandler = cellHandler
		this.soundHandler = soundHandler

		this.createField()
	}

	clearField() {
		this.destroyChildren()
		this.createField()
	}

	showField(matrix) {
		this.destroyChildren()

		for (let i = 0; i < this.size * this.size; i++) {
			const row = Math.floor(i / this.size)
			const column = i % this.size
			const cell = new Cell(
				row,
				column,
				this.size,
				this.cellHandler,
				this.soundHandler
			)
			if (matrix[row][column] === 1) {
				cell.click()
			}
			this.append(cell)
		}
	}

	loadedField(matrix) {
		console.log(matrix)
		this.destroyChildren()
		for (let i = 0; i < this.size * this.size; i++) {
			const row = Math.floor(i / this.size)
			const column = i % this.size
			const cell = new Cell(
				row,
				column,
				this.size,
				this.cellHandler,
				this.soundHandler
			)
			if (matrix[row][column] === 1) {
				cell.click()
			}
			this.append(cell)
		}
	}

	createField() {
		this.destroyChildren()
		for (let i = 0; i < this.size * this.size; i++) {
			const row = Math.floor(i / this.size)
			const column = i % this.size
			const cell = new Cell(
				row,
				column,
				this.size,
				this.cellHandler,
				this.soundHandler
			)

			this.append(cell)
		}
	}
}
