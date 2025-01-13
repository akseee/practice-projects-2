import Component from '../base/Component'

export default class BoardKey extends Component {
	constructor({ text }) {
		super({
			tag: 'button',
			className: 'button key',
			text: text,
		})
	}
}
