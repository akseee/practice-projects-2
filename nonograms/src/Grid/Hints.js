import Component from '../scripts/common/Component'

export default class Hints extends Component {
	constructor(type) {
		super({
			tag: 'div',
			className: `${type === 'column' ? 'top-columns' : type === 'row' ? 'left-rows' : 'filler'}`,
		})

		this.type = type
	}

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
	constructor(type, i) {
		super({ tag: 'div', className: 'cell-info' })
		this.setAttribute('data-type', type)
		this.setAttribute('data-i', i)
	}

	setHints(hints) {
		for (let number of hints) {
			const hint = new Component({ tag: 'span', className: 'hint' })
			hint.setTextContent(number)
			hint.addListener('click', () => hint.toggleClass('marked'))
			this.append(hint)
		}
	}
}
