
const findAllPalindromes = (input: string) => {
	const possibleStarts: Record<number, string> = {}
	for (let i = 0; i < input.length; i++) {
		let letter = input[i]
		let prevIndex = i-1
		let nextIndex = i+1

		if (letter == input[nextIndex] && (input[prevIndex] !== input[nextIndex])) {
			letter = letter + input[nextIndex]
			nextIndex = i+2
			i++
		}

		let longestPalindrome = letter

		while (input[prevIndex] && input[prevIndex] == input[nextIndex]) {
			longestPalindrome = input[prevIndex] + longestPalindrome + input[nextIndex]
			prevIndex--
			nextIndex++
		}

		possibleStarts[i] = longestPalindrome
	}

	return possibleStarts
}

const findLongestPalindrome = (input: string) => {
	const palindromes = findAllPalindromes(input)
	return Object.values(palindromes).sort((a, b) => b.length - a.length)[0]
}

const findPalindromes = (input: string) => {
	let _input = input
	const palindromes = []

	while (_input.length) {
		const longestPalindrome = findLongestPalindrome(_input)
		palindromes.push(longestPalindrome)
		_input = _input.replace(longestPalindrome, '')
	}

	return palindromes.sort((a, b) => input.indexOf(a) - input.indexOf(b))
}

console.log(findPalindromes('racecarannakayak'))
console.log(findPalindromes('abc'))