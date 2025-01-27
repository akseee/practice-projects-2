import Component from './common/Component'
import Field from './Field'
import Hints from './Hints'

export default class Grid extends Component {
	constructor(size) {
		super({ tag: 'div', className: 'grid-wrapper' })

		this.grid = new Component({ tag: 'div', className: 'grid' })

		this.field = new Field(size)
		this.filler = new Hints('filler', size)

		this.columnHints = new Hints('column', size)

		this.rowHints = new Hints('row', size)

		this.createRowHints()
		this.createColumnHints()

		this.grid.appendChildren([
			this.filler,
			this.columnHints,
			this.rowHints,
			this.field,
		])

		this.append(this.grid)
	}

	createRowHints() {
		// всегда будем передавать какой то массив, даже если пустой!
		this.rowHints.createHints([[1, 2, 1], [2, 2], [2], [1, 2], []])
	}

	createColumnHints() {
		// всегда будем передавать какой то массив, даже если пустой!
		this.columnHints.createHints([[1, 2, 1], [2, 2], [2], [1, 2], [2]])
	}
}
