// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

const options = [
	{ value: '', text: '-- Choose a template --' },
	{ value: 'dog', text: 'Dog' },
	{ value: 'cat', text: 'Cat' },
	{ value: 'hamster', text: 'Hamster' },
	{ value: 'parrot', text: 'Parrot' },
	{ value: 'spider', text: 'Spider' },
	{ value: 'goldfish', text: 'Goldfish' },
]

const difficulties = [
	{ id: 'easy', value: 'easy', text: 'easy' },
	{ id: 'medium', value: 'medium', text: 'medium' },
	{ id: 'hard', value: 'hard', text: 'hard' },
]

export default class Form extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Settings')

		this.tempalteFieldset = new Component({
			tag: 'fieldset',
			className: 'template-field',
		})
		this.difficultyFieldset = new Component({
			tag: 'fieldset',
			className: 'difficulty-field',
		})

		this.randomButton = new Button('random', 'randomize template', () => {})

		this.submit = new Button('submit', 'submit settings', () => {})
		this.submit.setAttribute('type', 'submit')

		this.createTemplateFieldset(options)
		this.createDifficultyFieldset(difficulties)

		this.appendChildren([
			this.title,
			this.tempalteFieldset,
			this.difficultyFieldset,
			this.randomButton,
			this.submit,
		])
	}

	createTemplateFieldset(options) {
		this.templateLabel = new Component({ tag: 'label' })
		this.templateLabel.setAttribute('for', 'templates')

		this.legend = new Component({ tag: 'legend' })
		this.legend.setTextContent('Select a template:')
		this.tempalteFieldset.append(this.legend)
		this.select = new Component({
			tag: 'select',
			className: 'select',
		})
		this.select.setAttribute('id', 'templates')
		this.select.setAttribute('name', 'templates')

		options.forEach((optionData) => {
			const option = new Component({ tag: 'option', className: 'option' })
			option.setTextContent(optionData.text)
			option.setAttribute('value', optionData.value)
			this.select.append(option)
		})

		this.templateLabel.append(this.select)

		this.tempalteFieldset.append(this.templateLabel)
	}

	createDifficultyFieldset(difficulties) {
		this.legend = new Component({ tag: 'legend' })
		this.legend.setTextContent('Select a difficulty:')
		this.difficultyFieldset.append(this.legend)

		difficulties.forEach((diff) => {
			const input = new Component({
				tag: 'input',
			})
			input.setAttribute('type', 'radio')
			input.setAttribute('value', diff.value)
			input.setAttribute('id', diff.id)
			input.setAttribute('name', 'difficulty')

			const label = new Component({ tag: 'label' })

			label.setTextContent(diff.text)
			label.setAttribute('for', diff.id)

			this.difficultyFieldset.appendChildren([input, label])
		})
	}
}
