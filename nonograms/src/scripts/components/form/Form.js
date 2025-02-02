// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Form extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Settings')

		this.templateFieldset = new Component({
			tag: 'fieldset',
			className: 'template-field',
		})
		this.difficultyFieldset = new Component({
			tag: 'fieldset',
			className: 'difficulty-field',
		})

		this.randomButton = new Button('random', 'randomize template', () => {})

		this.submit = new Button('submit', 'submit settings', () =>
			this.handleFormSubmit()
		)
		this.submit.setAttribute('type', 'submit')

		this.templates = {}
		this.difficulty = 'easy'

		this.difficultyFieldset.addListener('change', (e) => {
			this.difficulty = e.target.value
			this.createTemplateFieldset(this.templates[this.difficulty])
		})

		this.appendChildren([
			this.title,
			this.templateFieldset,
			this.difficultyFieldset,
			this.randomButton,
			this.submit,
		])
	}

	extractFromMatrix(matrix) {
		for (const difficulty in matrix) {
			const names = Object.keys(matrix[difficulty])
			this.templates[difficulty] = names
		}
		this.setInitialFormData()
	}

	createTemplateFieldset(options) {
		this.templateFieldset.destroyChildren()

		const templateLabel = new Component({ tag: 'label' })
		templateLabel.setAttribute('for', 'templates')

		const legend = new Component({ tag: 'legend' })
		legend.setTextContent('Select a template:')
		this.templateFieldset.append(legend)

		const select = new Component({
			tag: 'select',
			className: 'select',
		})
		select.setAttribute('id', 'templates')
		select.setAttribute('name', 'templates')

		options.forEach((item) => {
			const option = new Component({ tag: 'option', className: 'option' })
			option.setTextContent(item)
			option.setAttribute('value', item)
			select.append(option)
		})

		templateLabel.append(select)
		this.templateFieldset.append(templateLabel)
	}

	createDifficultyFieldset() {
		const levels = ['easy', 'medium', 'hard']
		const legend = new Component({ tag: 'legend' })
		legend.setTextContent('Select a difficulty:')

		this.difficultyFieldset.append(legend)

		levels.forEach((diff) => {
			const input = new Component({
				tag: 'input',
				className: 'difficulty-input',
			})
			input.setAttribute('name', 'difficulty')
			input.setAttribute('type', 'radio')
			input.setAttribute('value', diff)
			input.setAttribute('id', diff)

			const label = new Component({
				tag: 'label',
				className: 'difficulty-label',
			})
			label.setTextContent(diff)
			label.setAttribute('for', diff)

			if (diff === 'easy') {
				input.getNode().checked = true
			}

			this.difficultyFieldset.appendChildren([input, label])
		})
	}

	handleFormSubmit() {
		const formData = {
			template: this.templateFieldset.querySelector('select').value,
			difficulty: this.difficultyFieldset.querySelector('input:checked')?.value,
		}
		this.difficulty =
			this.difficultyFieldset.querySelector('input:checked')?.value
		console.log(formData)
	}

	setInitialFormData() {
		this.createTemplateFieldset(this.templates[this.difficulty])
		this.createDifficultyFieldset()
	}
}
