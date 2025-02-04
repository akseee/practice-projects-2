import Component from '../../common/Component'

const mock = [
	{
		template: 'cat',
		difficulty: 'hard',
		time: 110,
	},
	{
		template: 'cat',
		difficulty: 'hard',
		time: 120,
	},
	{
		template: 'dog',
		difficulty: 'easy',
		time: 40,
	},
]

export default class Leaderboard extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Leaderboard')

		this.list = new Component({ tag: 'ul', className: 'leaderboard-list' })

		this.appendChildren([this.title, this.list])
		this.createList(mock)
		this.setLeaderboardList()
	}

	setLeaderboardList() {
		if (localStorage.getItem('nono-leaderboard')) {
			// console.log('not empty')
			return []
		} else {
			// console.log('empty')
		}
	}

	createList(data) {
		// template -- difficulty -- time
		data
			.sort((a, b) => {
				return a.time - b.time
			})
			.forEach((result, index) => {
				const element = new Component({
					tag: 'li',
					className: 'leaderboard-list-item',
				})
				element.setTextContent(
					`${index + 1}: ${result.template} - ${result.difficulty} - ${Math.floor(result.time / 60)}:${String(result.time % 60).padStart(2, '0')} - ${new Date().toLocaleDateString()} `
				)
				this.list.append(element)
			})
	}
}
