const s1 = 'abc'
const s2 = 'bcd'

const canBeMapped = (s1: string, s2: string) => {
	if (!s1 || s1.length != s2.length)
		return false
	const charMap: {[s: string]: string} = {}
	for (let i = 0; i < s1.length; i++) {
		const char = s1[i]
		const correspondingChar = s2[i]

		charMap[char] = charMap[char] || correspondingChar
		if (correspondingChar != charMap[char])
			return false
	}
	return true
}

console.log(canBeMapped(s1, s2))