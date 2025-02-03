// @ts-nocheck
import Component from './common/Component'
import Button from './components/ui/Button'

export default class Form extends Component {
	constructor(onSubmit) {
		super({ tag: 'form', className: 'aside-content' })

		this.levels = ['easy', 'medium', 'hard']
		this.templatess = {}
		this.difficulty = 'easy'

		this.onSubmit = onSubmit

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Settings')

		this.templateFieldset = new TemplateFieldset()

		this.difficultyFieldset = new DifficultyFieldset(this.levels)
		this.difficultyFieldset.addListener('change', (e) => {
			this.difficulty = e.target.value
			this.templateFieldset.setTemplates(this.templatess[this.difficulty])
		})

		this.randomButton = new Button('random', 'randomize template', (e) => {
			this.handleRandomizer()
		})

		this.submit = new Button('submit', 'submit settings', (e) => {
			e.preventDefault()
			this.handleFormSubmit()
		})
		this.submit.setAttribute('type', 'submit')

		this.appendChildren([
			this.title,
			this.templateFieldset,
			this.difficultyFieldset,
			this.randomButton,
			this.submit,
		])

		this.formData = {
			template: this.templateFieldset.querySelector('select').value,
			difficulty: this.difficultyFieldset.querySelector('input:checked')?.value,
		}
	}

	extractFromMatrix(matrix) {
		for (const difficulty in matrix) {
			const names = Object.keys(matrix[difficulty])
			this.templatess[difficulty] = names
		}
		this.setInitialFormData()
	}

	setInitialFormData() {
		this.templateFieldset.setTemplates(this.templatess[this.difficulty])
	}

	handleFormSubmit() {
		const formData = {
			template: this.templateFieldset.querySelector('select').value,
			difficulty: this.difficultyFieldset.querySelector('input:checked')?.value,
		}

		if (this.onSubmit) {
			this.onSubmit(formData)
		}
	}

	handleRandomizer() {
		const randomDifficulty =
			this.levels[Math.floor(Math.random() * this.levels.length)]

		const templates = this.templatess[randomDifficulty]
		const randomTemplate =
			templates[Math.floor(Math.random() * templates.length)]

		this.setActiveDifficulty(randomDifficulty)

		this.templateFieldset.setTemplates(templates)
		this.templateFieldset.setSelectedTemplate(randomTemplate)

		this.formData = {
			template: randomTemplate,
			difficulty: randomDifficulty,
		}

		console.log('randomized:', this.formData)
	}

	setActiveDifficulty(diff) {
		this.difficultyFieldset.setActive(diff)
	}
}

class DifficultyFieldset extends Component {
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

class TemplateFieldset extends Component {
	constructor(options = []) {
		super({
			tag: 'fieldset',
			className: 'template-field',
		})

		this.options = options
		this.templateLabel = new Component({ tag: 'label' })
		this.templateLabel.setAttribute('for', 'templates')

		this.legend = new Component({ tag: 'legend' })
		this.legend.setTextContent('Select a template:')
		this.append(this.legend)

		this.select = new Component({
			tag: 'select',
			className: 'select',
		})
		this.select.setAttribute('id', 'templates')
		this.select.setAttribute('name', 'templates')

		this.setTemplates(options)
	}

	setSelectedTemplate(template) {
		const select = this.querySelector('select')
		if (select) {
			select.value = template
		}
	}

	setTemplates(options) {
		this.destroyChildren()
		this.append(this.legend)

		options.forEach((item) => {
			this.option = new Component({ tag: 'option', className: 'option' })
			this.option.setTextContent(item)
			this.option.setAttribute('value', item)
			this.select.append(this.option)
		})

		this.templateLabel.append(this.select)
		this.append(this.templateLabel)
	}
}
