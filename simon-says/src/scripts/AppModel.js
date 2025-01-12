import { levels } from './utils/constants'

export default class AppModel {
	constructor() {
		this.difficulty = 'easy'

		this.levels = levels

		this.generatedConsequence = []
		this.playerConsequence = []

		this.maxRounds = 5
		this.currentRound = 2

		this.consequenceLength = 2
		this.validKeys = this.getValidKeys()
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty
		this.validKeys = this.getValidKeys()
	}

	getDifficulty() {
		return this.difficulty
	}

	setCurrentRound(round) {
		this.currentRound = round
	}

	getCurrentRound() {
		return this.currentRound
	}

	getMaxRounds() {
		return this.maxRounds
	}

	setGeneratedConsequence(sequence) {
		this.generatedConsequence = sequence
	}

	getGeneratedConsequence() {
		return this.generatedConsequence
	}

	setPlayerConsequence(sequence) {
		this.playerConsequence = sequence
	}

	getPlayerConsequence() {
		return this.playerConsequence
	}

	setSequenceLength(length) {
		this.sequenceLength = length
	}

	getSequenceLength() {
		return 2 + (this.currentRound - 1) * 2
	}

	getValidKeys() {
		return levels[this.difficulty]
	}

	resetRound() {
		this.generatedConsequence = []
		this.playerConsequence = []
	}

	resetGame() {
		this.resetRound()
		this.currentRound = 1
	}
}
