
const HEX_SPEAKS = [
    0x00BAB10C,
    0x1BADB002,
    0x8BADF00D,
    0xABADBABE,
    0xB105F00D,
    0xB16B00B5,
    0x0B00B135,
    0xBAAAAAAD,
    0xBAADF00D,
    0xBAD22222,
    0xBADDCAFE,
    0xCAFEB0BA,
    0xB0BABABE,
    0xBEEFBABE,
    0xC00010FF,
    0xCAFEBABE,
    0xCAFED00D,
    0xCEFAEDFE,
    0x0D15EA5E,
    0xDABBAD00,
    0xDEAD2BAD,
    0xDEADBAAD,
    0xDEADBABE,
    0xDEADBEAF,
    0xDEADBEEF,
    0xDEADC0DE,
    0xDEADDEAD,
    0xDEADD00D,
    0xDEADFA11,
    0xDEAD10CC,
    0xDEADFEED,
    0xDECAFBAD,
    0xDEFEC8ED,
    0xD0D0CACA,
    0xE011CFD0,
    0xFACEB00C,
    0xFACEFEED,
    0xFBADBEEF,
    0xFEE1DEAD,
    0xFEEDBABE,
    0xFEEDC0DE,
    0xFFBADD11,
    0xF00DBABE
];

const TOTAL = 1n << 32n;

function hexToStr(hex) {
    let hexParse = hex.toString(16).split('');
    if (hexParse.length < 8) hexParse = ((new Array(8 - hexParse.length)).fill('0')).concat(hexParse);
    return hexParse.join('');
}

function countDiff(arr) {
    let sortedArr = [...arr].sort((a, b) => a - b);
    let cnt = 1;
    for (let i = 1; i < sortedArr.length; i++) {
        if (sortedArr[i] > sortedArr[i - 1]) cnt++;
    }
    return cnt;
}

function checkSpecial(code) {
    if (HEX_SPEAKS.includes(code)) return true;

    const hexParse = hexToStr(code).split('').map(c => parseInt(c, 16));
    if (countDiff(hexParse) <= 2) return true;

    let diff = [];
    for (let i = 1; i < hexParse.length; i++) diff.push(hexParse[i] - hexParse[i - 1]);

    if (countDiff(diff) <= 2) return true;

    return false;
}

let seeds = [];
let cursor = 0n;

function makeSeeds(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        let r = BigInt(parseInt(Math.random() * (1 << 16) * (1 << 16))) % TOTAL;
        arr.push(r);
    }
    return arr;
}

function generate() {
    while (true) {
        cursor++;
        cursor = cursor % TOTAL;
        let rnd = cursor;
        seeds.forEach(seed => {
            rnd = (seed + rnd) % TOTAL;
            rnd = (rnd >> 1n) | (rnd & 1n) << 31n;
        });
        if (!checkSpecial(rnd)) return '0x' + hexToStr(rnd).toUpperCase();
    }
}

function output() {
    // initialize
    seeds = makeSeeds(4096);
    cursor = BigInt(parseInt(Math.random() * (1 << 16) * (1 << 16))) % TOTAL;
    
    // generate 1000 times
    for (let i = 0; i < 1000; i++) {
        console.log(generate());
    }
}

output();
