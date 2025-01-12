import Component from '../base/Component'

export default class Keyboard extends Component {
	constructor() {
		super({ tag: 'div', className: 'keyboard' })

		const keyOne = new Component({
			tag: 'button',
			className: 'button key',
			text: '1',
		})
		const keyOne1 = new Component({
			tag: 'button',
			className: 'button key',
			text: '2',
		})

		const line1 = new Component(
			{ tag: 'div', className: 'keyboard-line' },
			keyOne,
			keyOne1
		)

		const keyTwo = new Component({
			tag: 'button',
			className: 'button key',
			text: '1',
		})
		const keyTwo1 = new Component({
			tag: 'button',
			className: 'button key',
			text: '2',
		})

		const line2 = new Component(
			{ tag: 'div', className: 'keyboard-line' },
			keyTwo,
			keyTwo1
		)

		const keyThree = new Component({
			tag: 'button',
			className: 'button key',
			text: '1',
		})
		const keyThree1 = new Component({
			tag: 'button',
			className: 'button key',
			text: '2',
		})

		const line3 = new Component(
			{ tag: 'div', className: 'keyboard-line' },
			keyThree,
			keyThree1
		)

		const keyFour = new Component({
			tag: 'button',
			className: 'button key',
			text: '1',
		})
		const keyFour1 = new Component({
			tag: 'button',
			className: 'button key',
			text: '2',
		})

		const line4 = new Component(
			{ tag: 'div', className: 'keyboard-line' },
			keyFour,
			keyFour1
		)

		this.append(line1)
		this.append(line2)
		this.append(line3)
		this.append(line4)
	}
}
