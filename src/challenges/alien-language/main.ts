const words = ['hello', 'uber']
const alphabet = 'huabcdefgijklmnopqrstvwxyz'

const words2 = ['word', 'world', 'row']
const alphabet2 = 'worldabcefghijkmnpqstuvxyz'


const isLexi = (input: string[], alphabet: string): boolean => {
	let lastIndex = 0
	const wordsToCompare: string[] = []

	for (const word of input) {
		const indexOfWord = input.indexOf(word)
		const firstLetter = word[0]
		const indexOfLetter = alphabet.indexOf(firstLetter)
		if (lastIndex > indexOfLetter) {
			return false
		}
		lastIndex = indexOfLetter

		const previousWord = input[indexOfWord - 1]
		const firstLetterOfPreviousWord = previousWord && previousWord[0]
		if (firstLetter === firstLetterOfPreviousWord) {
			if (!wordsToCompare?.find(it => it[0] === firstLetter)) {
				wordsToCompare.push(previousWord.slice(1))
			}
			wordsToCompare.push(word.slice(1))
		}
	}

	if (wordsToCompare.length) {
		return isLexi(wordsToCompare, alphabet)
	}

	return true
}

const isLexi3 = (input: string[], alphabet: string): boolean => {
	for (let i = 0; i < input.length; i++) {
		const word = input[i]
		const nextWord = input[i + 1]

		if (!nextWord)
			return true

		const othersOfSameLetter = input.filter(it => it[0] == word[0])
		if (othersOfSameLetter.length) {
			const othersAreLexi = isLexi3(othersOfSameLetter.map(it => it.slice(1)), alphabet)
			if (!othersAreLexi)
				return false
			else
				i += othersOfSameLetter.length - 1
		}
		if (alphabet.indexOf(word[0]) > alphabet.indexOf(nextWord[0]))
			return false
	}
	return true
}

const isLexi4 = (input: string[], alphabet: string): boolean => {
	if (input.length <= 1) return true

	for (let i = 0; i <= input.length - 2; i++) {
		const word = input[i]
		const nextWord = input[i + 1]

		if (alphabet.indexOf(word[0]) < alphabet.indexOf(nextWord[0])) {
			continue
		}
		if (alphabet.indexOf(word[0]) > alphabet.indexOf(nextWord[0])) {
			return false
		}

		const sameLetterWords = [word]
		let j = i + 1

		while (input[j]?.[0] == input[i]?.[0]) {
			sameLetterWords.push(input[j])
			j++
		}

		const subResult = isLexi4(
			sameLetterWords.map(it => it.slice(1)),
			alphabet
		)

		if (!subResult) {
			return false
		}

		i += sameLetterWords.length - 1
	}

	return true
}

console.time()
console.log(isLexi(words, alphabet))
console.log(isLexi(words2, alphabet2))
console.timeEnd()

console.time()
console.log(isLexi3(words, alphabet))
console.log(isLexi3(words2, alphabet2))
console.timeEnd()

console.time()
console.log(isLexi4(words, alphabet))
console.log(isLexi4(words2, alphabet2))
console.timeEnd()
