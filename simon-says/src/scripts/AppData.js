export default class AppState {
	constructor() {
		this.difficulty = 'easy'

		this.modelConsequence = []
		this.playerConsequence = []

		this.maxRounds = 5
		this.currentRound = 1

		this.consequenceLength = 2
		this.validKeys = this.getValidKeys()
	}

	// difficulty
	setDifficulty(difficulty) {
		this.difficulty = difficulty
	}

	getDifficulty() {
		return this.difficulty
	}

	// rounds
	setCurrentRound(round) {
		this.currentRound = round
	}

	getCurrentRound() {
		return this.currentRound
	}

	getMaxRounds() {
		return this.maxRounds
	}

	// consequence
	// data
	setModelConsequence(sequence) {
		this.modelConsequence = sequence
	}

	getModelConsequence() {
		return this.modelConsequence
	}

	setPlayerConsequence(sequence) {
		this.playerConsequence = sequence
	}

	getPlayerConsequence() {
		return this.playerConsequence
	}

	// rules
	setSequenceLength(length) {
		this.sequenceLength = length
	}

	getSequenceLength() {
		return 2 + (this.currentRound - 1) * 2
	}

	getValidKeys() {
		const levels = {
			easy: 'abcdefghijklmnopqrstuvwxyz',
			medium: 'abcdefghijklmnopqrstuvwxyz0123456789',
			hard: 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
		}
		return levels[this.difficulty].split('')
	}

	resetRound(resetAll = false) {
		if (resetAll) {
			this.modelConsequence = []
			this.playerConsequence = []
		}
	}

	resetGame() {
		this.resetRound(true)

		this.maxRounds = 5
		this.currentRound = 1

		this.validKeys = this.getValidKeys()
	}
}
