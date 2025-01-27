import Component from './common/Component'

export default class Hints extends Component {
	constructor(type, count) {
		super({
			tag: 'div',
			className: `${type === 'column' ? 'top-columns' : type === 'row' ? 'left-rows' : 'filler'}`,
		})

		this.type = type
	}
	// [[1, 2, 1], [2, 2], [2], [1, 2], []]
	createHints(data) {
		if (this.type === 'filler') return

		for (let i = 0; i < data.length; i++) {
			const cell = new InfoCell(this.type, i)

			if (data[i]) {
				cell.setHints(data[i])
			}
			this.append(cell)
		}
	}
}

class InfoCell extends Component {
	constructor(type, count) {
		super({ tag: 'div', className: 'cell-info' })
		this.setAttribute('data-type', type)
		this.setAttribute('data-i', count)
	}

	setHints(hints) {
		for (let number of hints) {
			const hint = new Component({ tag: 'span', className: 'hint' })
			hint.setTextContent(number)
			// hint.addListener('click', () => this.toggleClass('marked'))
			this.append(hint)
		}
	}
}
