function runOnce() {
    let result = 0;
    function calculateResult() {
        if (result === 0) {
            result += 1
            return result
        } else {
            return result
        }
    }
    return calculateResult;
}

const newFunc = runOnce()
console.log(newFunc())
console.log(newFunc())