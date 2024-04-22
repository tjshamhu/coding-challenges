const input = [[0, 15, 3], [4, 11, 5], [19, 23, 4]]

const drawSkyline = (input: number[][]) => {
	const minX = Math.min(...input.map(it => it[0]))
	const maxX = Math.max(...input.map(it => it[1]))

	const result: [number, number][] = []
	let lastHeight = 0

	for (let x = minX; x <= maxX; x++) {
		const appearingAtX = input.filter(it => it[0] <= x && it[1] > x)
		const tallestAtX = Math.max(...appearingAtX.map(it => it[2]), 0)

		if (lastHeight == tallestAtX)
			continue

		result.push([x, tallestAtX])
		lastHeight = tallestAtX
	}

	return result
}

const output = drawSkyline(input)
console.log(output)