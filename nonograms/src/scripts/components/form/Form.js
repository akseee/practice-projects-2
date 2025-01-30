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
		super({ tag: 'div', className: '' })

		this.formButton = new Button('aside-button ', 'SETUP-FORM', () =>
			this.handleFormOpen()
		)

		this.title = new Component({ tag: 'h2', className: 'setup-title' })
		this.title.setTextContent('Settings')

		this.tempalteFieldset = new Component({ tag: 'fieldset' })
		this.difficultyFieldset = new Component({ tag: 'fieldset' })

		this.form = new Component(
			{ tag: 'div', className: 'setup-form' },
			this.title,
			this.tempalteFieldset,
			this.difficultyFieldset
		)

		this.aside = new Component(
			{
				tag: 'aside',
				className: 'setup-form-wrapper ',
			},
			this.form
		)

		this.createTemplateFieldset(options)
		this.createDifficultyFieldset(difficulties)

		this.append(this.aside)
		document.body.append(this.formButton.getNode())
		document.body.append(this.getNode())
	}

	handleFormOpen() {
		this.formButton.toggleClass('open')
		this.aside.toggleClass('open')
	}

	createTemplateFieldset(options) {
		this.templateLabel = new Component({ tag: 'label' })
		this.templateLabel.setTextContent('Select a template:')
		this.templateLabel.setAttribute('for', 'templates')

		this.select = new Component({
			tag: 'select',
			className: '',
			id: 'templates',
			name: 'templates',
		})

		options.forEach((optionData) => {
			const option = new Component({ tag: 'option' })
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
