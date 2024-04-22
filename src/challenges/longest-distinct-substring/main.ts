const longestDistinctSubstring = (str: string, k: number) => {
	let longestSubstring = ''
	for (let i = 0; i < str.length; i++) {
		let substring = str[i]
		let distinctLetterUsed = 1
		let offset = 1
		let nextLetter  = str[i + offset]

		while (distinctLetterUsed <= k && nextLetter) {
			const substringHasNextLetter = substring.includes(nextLetter)
			if (distinctLetterUsed == k && !substringHasNextLetter)
				break

			if (!substringHasNextLetter)
				distinctLetterUsed++

			substring += nextLetter
			offset++
			nextLetter = str[i + offset]
		}

		longestSubstring = substring.length > longestSubstring.length ? substring : longestSubstring
	}
	return longestSubstring
}

const longestDistinctSubstringWithRecursion = (str: string, k: number): string => {

	const worker = (str: string, k: number): string[] => {
		if (k == 1)
			return str.split('')

		const substrings = worker(str.slice(1), k - 1) // [a, b, c]

		return substrings
			.map(it => str[0] + it)
			.filter(it => new Set(...it.split('')).size <= k)
	}

	let solution = ''
	for (let i = 0; i < str.length; i++) {
		worker(str.slice(i), k)
			.forEach(s => {
			solution = solution.length < s.length ? s : solution
		})
	}

	return solution

}

// console.log(longestDistinctSubstring('abcba', 2))

console.log(longestDistinctSubstringWithRecursion('abcba', 2))