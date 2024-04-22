
const results: {[n: number]: number} = {}
const fib2 = (n: number): number => {
	if (n <= 2)
		return 1
	if (results[n])
		return results[n]
	const answer = fib(n - 1) + fib(n - 2)
	results[n] = results[n] || answer
	return answer
}

const fib = (n: number): number => {
	const results: number[] = []
	for (let i = 1; i <= n; i++) {
		if (i <= 2)
			results.push(1)
		 else {
			results.push(results[i - 2] + results[i - 3])
		}
	}
	return results.pop()!
}

console.table({
	1: fib(1),
	2: fib(2),
	3: fib(3),
	5: fib(5),
	7: fib(7),
	9: fib(9),
	50: fib(50),
	99: fib(99),
	9999: fib2(9999)
})