import fs from 'fs'
import path from 'path'

function* read7() {
	const data = fs
		.readFileSync(
			path.join(__dirname, '../../resources/a-cautionary-tale-for-humanity.txt'),
			{encoding: 'utf-8'}
		)
	for (let startIdx = 0; startIdx < data.length; startIdx += 7) {
		const subText = data.slice(startIdx, startIdx + 7)
		yield subText
	}
}

const gen = read7()

function* readN(n: number) {
	if (n <= 0) {
		yield ""
	}
	let text = gen.next()
	let remainder = ""

	while(!text.done) {
		let result = ""
		result += remainder

		while (result.length < n) {
			result = result + text.value
			text = gen.next()
		}

		remainder = result.slice(n)
		yield result.slice(0, n)
	}
}

const readNGen = readN(32)

console.log(readNGen.next().value)
console.log(readNGen.next().value)
console.log(readNGen.next().value)