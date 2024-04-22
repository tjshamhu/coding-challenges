function encode(text: string) {
	let count = 0
	let encodedString = ''
	for (let i = 0; i < text.length; i++) {
		const char = text[i]
		const nextLetter = text[i+1]
		count++
		if (char != nextLetter) {
			encodedString += count + char
			count = 0
		}
	}
	return encodedString
}

console.log(encode('AAAABBBCCDAA'))