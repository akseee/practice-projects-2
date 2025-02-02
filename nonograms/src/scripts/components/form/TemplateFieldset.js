import Component from '../../common/Component'

export default class TemplateFieldset extends Component {
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
