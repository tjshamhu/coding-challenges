const input = [3, 1, 8, 2, 5]

const longestSequence = (input: number[]) => {

	const treeMap: {[n: number]: number[]} = {}

	// {
	// '3': [],
	// '1': [],
	// '8': [ 1, 3 ],
	// '2': [ 1 ],
	// '5': [ 2, 1, 3 ]
	// }

	//                5              2          8         1        3
	//              / | \           /         /  \
	//             2  1  3         1         1    3
	//            /
	//           1

	// create the trees we see here --^
	for (let i = input.length - 1; i >= 0; i--) {
		const element = input[i]
		treeMap[element] = treeMap[element] || []
		for (let j = i - 1; j >= 0; j--) {
			const comparisonElement = input[j]
			if (comparisonElement < element) {
				treeMap[element].push(comparisonElement)
			}
		}
	}

	const lengths = Object.keys(treeMap).map(it => {
		const options = treeMap[it as any]
		return getLongest(Number(it), options)
	})

	function getLongest(val: number, options: number[]): number[] {
		if (!val) return []
		const longestLengths = options.map(o => getLongest(o, treeMap[o]))
		const longestLength = longestLengths.sort((a, b) => a.length - b.length).pop() || []
		return [val, ...longestLength]
	}

	return lengths
		.sort((a, b) => a.length - b.length)
		.pop()
}

console.log(longestSequence(input))

