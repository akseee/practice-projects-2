import Component from '../../common/Component'

export default class DifficultyFieldset extends Component {
	constructor(levels) {
		super({
			tag: 'fieldset',
			className: 'difficulty-field',
		})

		this.levels = levels

		this.legend = new Component({ tag: 'legend' })
		this.legend.setTextContent('Select difficulty:')

		this.append(this.legend)

		this.levels.forEach((diff) => {
			this.input = new Component({
				tag: 'input',
				className: 'difficulty-input',
			})
			this.input.setAttribute('name', 'difficulty')
			this.input.setAttribute('type', 'radio')
			this.input.setAttribute('value', diff)
			this.input.setAttribute('id', diff)

			this.label = new Component({
				tag: 'label',
				className: 'difficulty-label',
			})
			this.label.setTextContent(diff)
			this.label.setAttribute('for', diff)

			if (diff === 'easy') {
				this.input.getNode().checked = true
			}

			this.appendChildren([this.input, this.label])
		})
	}

	setActive(diff) {
		this.querySelector(`#${diff}`).checked = true
	}
}
