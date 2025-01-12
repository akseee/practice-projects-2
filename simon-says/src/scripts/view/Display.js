import Component from '../base/Component'

export default class Display extends Component {
	constructor() {
		super({ tag: 'div', className: 'display' })

		const outputKey1 = new Component({
			tag: 'div',
			className: 'output-key',
			text: 'B',
		})
		const outputKey2 = new Component({
			tag: 'div',
			className: 'output-key',
			text: 'B',
		})
		const outputKey3 = new Component({
			tag: 'div',
			className: 'output-key',
			text: 'B',
		})

		const output = new Component(
			{ tag: 'div', className: 'output' },
			outputKey1,
			outputKey2,
			outputKey3
		)

		const displayWrapper = new Component(
			{
				tag: 'div',
				className: 'display-wrapper',
			},
			output
		)

		this.append(displayWrapper)
	}
}
