import Component from '../base/Component'

export default class OutputKey extends Component {
	constructor({ text }) {
		super({
			tag: 'div',
			className: 'output-key',
			text: text,
		})
	}
}
