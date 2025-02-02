// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'
import DifficultyFieldset from './DifficultyFieldset'
import TemplateFieldset from './TemplateFieldset'

export default class Form extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.levels = ['easy', 'medium', 'hard']
		this.templatess = {}
		this.difficulty = 'easy'

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Settings')

		this.templateFieldset = new TemplateFieldset()

		this.difficultyFieldset = new DifficultyFieldset(this.levels)
		this.difficultyFieldset.addListener('change', (e) => {
			this.difficulty = e.target.value
			this.templateFieldset.setTemplates(this.templatess[this.difficulty])
		})

		this.randomButton = new Button('random', 'randomize template', () => {
			this.handleRandomizer()
		})

		this.submit = new Button('submit', 'submit settings', () =>
			this.handleFormSubmit()
		)
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

		console.log('sent form data:')
		console.log(formData)
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
