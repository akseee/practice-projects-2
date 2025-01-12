import AppModel from './AppModel'

export default class AppPresenter {
	constructor(view) {
		this.view = view
		this.data = new AppModel()

		this.view.updateRound(this.data.getCurrentRound())

		console.log(this.data)
	}

	onDifficultyChange(difficulty) {
		this.data.setDifficulty(difficulty)
		this.data.resetGame()
		this.view.updateSequence([])
	}

	generateSequence() {
		const validKeys = this.data.getValidKeys()
		const sequenceLength = this.data.getSequenceLength()

		const generated = Array.from({ length: sequenceLength }, () => {
			const randomIndex = Math.floor(Math.random() * validKeys.length)
			return validKeys[randomIndex]
		})

		this.data.setGeneratedConsequence(generated)
		this.view.updateSequence(generated)
	}

	checkSequence() {
		const player = this.data.getPlayerConsequence()
		const generated = this.data.getGeneratedConsequence()

		return player.every((key, index) => key === generated[index])
	}

	isRoundComplete() {
		return this.checkSequence()
	}

	nextRound() {
		if (
			this.data.getCurrentRound() < this.data.getMaxRounds() &&
			this.isRoundComplete()
		) {
			this.data.setCurrentRound(this.data.getCurrentRound() + 1)
			this.view.updateRound(this.data.getCurrentRound())
			console.log('Next round started')
		} else {
			this.view.showGameOver()
			this.data.resetGame()
			console.log('Game Over')
		}
	}
}
