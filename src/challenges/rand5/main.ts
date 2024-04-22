function rand7() {
	let rand = Math.random()
	return Math.floor(rand * 10000) % 7 + 1
}

function rand5() {
	let num = rand7()

	while(num > 5) {
		num = rand7()
	}

	return num
}

console.log(rand5())
console.log(rand5())
console.log(rand5())