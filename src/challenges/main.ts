function climb(stairs: number, cache: Record<number, number> = {}): number {
	if (stairs == 2) return 2
	if (stairs == 1 ) return 1
	if (stairs <= 0) return 0
	if (cache[stairs]) return cache[stairs]
	cache[stairs-1] = climb(stairs - 1, cache)
	cache[stairs-2] = climb(stairs - 2, cache)
	return cache[stairs-1] + cache[stairs-2]
}

console.log(climb(99))
