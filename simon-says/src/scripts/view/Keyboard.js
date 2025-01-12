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

		this.append(keyOne)
		this.append(keyOne1)
		this.append(keyTwo)
		this.append(keyTwo1)
		this.append(keyThree)
		this.append(keyThree1)
	}

	// setKeyboard(difficulty) {
	// 	const keys = this.getKeys()
	// 	keys.forEach((key) => {
	// 		if (this.isKeyDisabled(key, difficulty)) {
	// 			key.classList.add('disabled')
	// 		} else {
	// 			key.classList.remove('disabled')
	// 		}
	// 	})
	// }

	// isKeyDisabled(key, difficulty) {
	// 	if (difficulty === 'easy' && key.match(/[0-9]/)) return true
	// 	if (difficulty === 'medium' && key.match(/[a-z]/)) return true
	// 	if (difficulty === 'hard') return false
	// 	return false
	// }
}
