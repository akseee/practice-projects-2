// @ts-nocheck
import Component from '../../common/Component'
import Button from '../ui/Button'

export default class Form extends Component {
	constructor() {
		super({ tag: 'div', className: '' })

		this.formButton = new Button('aside-button open', 'SETUP-FORM', () => {})

		this.title = new Component({ tag: 'h2', className: 'setup-title' })
		this.title.setTextContent('Settings')

		this.form = new Component(
			{ tag: 'div', className: 'setup-form' },
			this.title
		)

		this.aside = new Component(
			{
				tag: 'aside',
				className: 'setup-form-wrapper open',
			},
			this.form
		)

		this.append(this.aside)
		document.body.append(this.formButton.getNode())
		document.body.append(this.getNode())
	}
}
