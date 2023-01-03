module.exports = function toReadable(n) {
    if (n === 0) { return 'zero' }
    let result = '';
    let counter;
    let remainder;
    let dictionaryIndex0 = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine'
    }
    let dictionaryEnd = {
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
    }
    let dictionaryIndex1 = {
        2: 'twenty',
        3: 'thirty',
        4: 'forty',
        5: 'fifty',
        6: 'sixty',
        7: 'seventy',
        8: 'eighty',
        9: 'ninety'
    }
    let dictionaryCounter = {
        2: 'thousand',
        3: 'million',
        4: 'billion'
    }

    counter = parseInt((n.toString().length) / 3);
    if (parseInt((n.toString().length) % 3)) { counter++ };

    for (let i = counter; i > 0; i--) {
        let array = [];

        let divider = 1000;
        remainder = Math.trunc(n / Math.pow(divider, i - 1));
        if (i == 1) { remainder = n % divider; }

        let arrayOfStrings = (((remainder % 1000).toString()).split(''));
        arrayOfStrings.map(el => array.push(+el));

        if (array.length < 3) { for (let i = 3 - array.length; i > 0; i--) { array.unshift(0) } }

        array.forEach((el, ind, array) => {
            if (el && ind == 0) {
                for (key in dictionaryIndex0) {
                    if (el == key) { result += ` ${dictionaryIndex0[key]} hundred` }
                }
            }
            if (el && ind == 1) {
                for (key in dictionaryIndex1) {
                    if (el == key && el !== 1) { result += ` ${dictionaryIndex1[key]}` }
                    if (el == 1) {
                        for (key in dictionaryEnd) {
                            if ((el * 10) + array[ind + 1] == key) {
                                result += ` ${dictionaryEnd[key]}`;
                                el = 0;
                                array[ind + 1] = 0;
                            }
                        }
                    }
                }
            }
            if (el && ind == 2) {
                for (key in dictionaryIndex0) {
                    if (el == key) { result += ` ${dictionaryIndex0[key]}` }
                }
            }
        })
        for (key in dictionaryCounter) {
            if (i == key) {
                result += ` ${dictionaryCounter[key]}`;
            }
        }
    }
    return result.trim();
}
