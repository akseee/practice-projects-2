import Component from '../../common/Component'

export default class Leaderboard extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('Leaderboard')

		this.list = new Component({ tag: 'ul', className: 'leaderboard-list' })

		this.appendChildren([this.title, this.list])
		this.setLeaderboardList()
	}

	setLeaderboardList() {
		const victoryData = localStorage.getItem('victory')
		if (victoryData) {
			try {
				const parsedData = JSON.parse(victoryData)
				this.createList(parsedData)
			} catch (e) {
				console.error('parsing error: ', e)
			}
		} else {
			console.log('empty')
		}
	}

	createList(data) {
		this.list.destroyChildren()

		data
			.sort((a, b) => {
				return a.time - b.time
			})
			.splice(0, 5)
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
