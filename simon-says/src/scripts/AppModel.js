import AppState from './AppData'

export default class AppModel {
	constructor() {
		this.data = new AppState()
	}

	generateSequence() {
		const validKeys = this.data.getValidKeys()
		const sequenceLength = this.data.getSequenceLength()

		const generated = Array.from({ length: sequenceLength }, () => {
			const randomIndex = Math.floor(Math.random() * validKeys.length)
			return validKeys[randomIndex]
		})

		this.data.setModelConsequence(generated)
	}

	checkSequence() {
		const player = this.data.getPlayerConsequence()
		const model = this.data.getModelConsequence()

		return player.every((key, index) => key === model[index])
	}

	isRoundComplete() {
		return this.checkSequence()
	}

	nextRound() {
		if (this.data.getCurrentRound() < this.data.getMaxRounds()) {
			this.data.setCurrentRound(this.data.getCurrentRound() + 1)
			console.log('Next round started')
		} else {
			console.log('Game Over')
		}
	}
}
