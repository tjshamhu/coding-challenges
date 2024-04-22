const input: string  = 'CAKE'

const getPermutations = (str: string): string[] => {
	if (str.length == 1) {
		return [str]
	}

	const result = []
	const permutations = getPermutations(str.slice(1))

	for (const permutation of permutations) {
		for (let i = 0; i < permutation.length; i++) {
			const newString = permutation.slice(0, i) + str[0] + permutation.slice(i)
			result.push(newString)
		}
		result.push(permutation + str[0])
	}

	return result
}


const getPermutationsWithTabulation = (str: string): string[] => {

	const lastLetter = str[str.length - 1]
	let previousPermutations = [lastLetter]

	for (let i = str.length - 2; i >= 0; i--) {
		const currentLetter = str[i]

		const _results = []
		for (const perm of previousPermutations) {
			for (let i = 0; i < perm.length; i++) {
				_results.push(
					perm.slice(0, i) + currentLetter + perm.slice(i)
				)
			}
			_results.push(perm + currentLetter)
		}

		previousPermutations = _results
	}
	return previousPermutations
}

console.time()
console.log(getPermutations("ABCDEFGHIJK"))
console.timeEnd()

console.time()
console.log(getPermutationsWithTabulation('ABCDEFGHIJK'))
console.timeEnd()