const coins = [1,2,5]
const target = 11

const coins2 = [2]
const target2 = 3

const coins3 = [1]
const target3 = 0

function coinChange(coins: number[], amount: number): number {
	const min = Math.min(...coins)
	const resultMap: {[n: number]: boolean} = {}

	function wrapper(amountLeft: number): boolean {
		if (resultMap[amountLeft] != undefined) {
			return resultMap[amountLeft]
		}

		if (amountLeft < min) {
			resultMap[amountLeft] = false
			return resultMap[amountLeft]
		}

		if (amountLeft > min) {
			return coins
				.filter(it => it <= amountLeft)
				.map(it => wrapper(amountLeft - it))
				.reduce((acc, curr) => acc + curr)
		}
		resultMap[amountLeft] = true
		return resultMap[amountLeft]
	}

	return wrapper(amount)
}

console.log(coinChange(coins, target))