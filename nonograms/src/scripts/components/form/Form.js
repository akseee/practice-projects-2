// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'
import DifficultyFieldset from '../ui/DifficultyFieldset'

export default class Form extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.levels = ['easy', 'medium', 'hard']
		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Settings')

		this.templateFieldset = new Component({
			tag: 'fieldset',
			className: 'template-field',
		})

		this.difficultyFieldset = new DifficultyFieldset(this.levels)
		this.difficultyFieldset.addListener('change', (e) => {
			this.difficulty = e.target.value
			this.createTemplateFieldset(this.templatess[this.difficulty])
		})

		this.randomButton = new Button('random', 'randomize template', () => {
			this.handleRandomizer()
		})

		this.submit = new Button('submit', 'submit settings', () =>
			this.handleFormSubmit()
		)
		this.submit.setAttribute('type', 'submit')

		this.templatess = {}
		this.difficulty = 'easy'

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
			this.templatess[difficulty] = names
		}
		this.setInitialFormData()
	}

	handleFormSubmit() {
		const formData = {
			template: this.templateFieldset.querySelector('select').value,
			difficulty: this.difficultyFieldset.querySelector('input:checked')?.value,
		}
		this.difficulty =
			this.difficultyFieldset.querySelector('input:checked')?.value
	}

	handleRandomizer() {}

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

	setInitialFormData() {
		this.createTemplateFieldset(this.templatess[this.difficulty])
	}
}
