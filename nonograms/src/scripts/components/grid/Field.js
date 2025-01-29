import Component from '../../common/Component'
import Cell from './Cell'

export default class Field extends Component {
	constructor(size) {
		super({
			tag: 'div',
			className: `field ${size === 5 ? 'field-5' : size === 10 ? 'field-10' : 'field-15'}`,
		})

		this._size = size
		this.destroyChildren()
		this.createField()
	}

	set size(newSize) {
		this._size = newSize
	}

	get size() {
		return this._size
	}

	createField() {
		for (let i = 0; i < this.size * this.size; i++) {
			const row = Math.floor(i / this.size)
			const column = i % this.size
			const cell = new Cell(row, column, this.size)
			this.append(cell)
		}
	}
}
