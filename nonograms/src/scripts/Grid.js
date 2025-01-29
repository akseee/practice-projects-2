import Component from './common/Component'
import Field from './Field'
import Hints from './Hints'
import {
	calculateColumnHints,
	calculateRowHints,
	randomMatrix,
} from './utils/utils'

export default class Grid extends Component {
	constructor(size) {
		super({ tag: 'div', className: 'grid-wrapper' })

		this.grid = new Component({ tag: 'div', className: 'grid' })

		this.size = size

		this.field = new Field(size)
		this.filler = new Hints('filler')

		this.columnHints = new Hints('column')

		this.rowHints = new Hints('row')

		this.mock = randomMatrix(size)
		this.setRowHints()
		this.setColumnHints()

		this.grid.appendChildren([
			this.filler,
			this.columnHints,
			this.rowHints,
			this.field,
		])

		this.append(this.grid)
	}

	setRowHints() {
		// instead of mock it is gonna be the clicked one
		const data = calculateRowHints(this.mock)
		// всегда будем передавать какой то массив, даже если пустой!
		this.rowHints.createHints(data)
	}

	setColumnHints() {
		// instead of mock it is gonna be the clicked one
		const data = calculateColumnHints(this.mock)
		// всегда будем передавать какой то массив, даже если пустой!
		this.columnHints.createHints(data)
	}
}
