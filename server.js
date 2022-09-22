const convert = (string, base, toBase) => parseInt(string, base).toString(toBase).toUpperCase()

console.log(convert('ABCDEF', 16, 2))