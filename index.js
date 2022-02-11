const switchSimple = document.getElementById('switchSimple');
switchSimple.addEventListener('click', () => {
    const target1 = document.getElementById('CalMain');
    const target2 = document.getElementById('CalMain2');
    target1.style.display = 'grid';
    target2.style.display = 'none';
})
const switchCircle = document.getElementById('switchCircle');
switchCircle.addEventListener('click', () => {
    const target1 = document.getElementById('CalMain');
    const target2 = document.getElementById('CalMain2');
    target2.style.display = 'grid';
    target1.style.display = 'none';
})

const calcSimple=document.getElementById('calcSimple');
calcSimple.addEventListener('click',()=>{
    const messageBit=document.getElementById('messageBit').value
    const divBlockBit=document.getElementById('divBlocksBit').value
    document.getElementById('result').value=calcSimpleHash(messageBit.toString(),parseInt(divBlockBit))
})
const calcCircular=document.getElementById('calcCircular');
calcCircular.addEventListener('click',()=>{
    const messageBit=document.getElementById('messageBit1').value
    const divBlockBit=document.getElementById('divBlocksBit1').value
    document.getElementById('result').value=calcCircularHash(messageBit.toString(),parseInt(divBlockBit))
})

// let messageBit = "011000110110100100101010"
// let divBlockBit = 6;

function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

const calXOR = (a, b) => {
    let xor = "";
    for (let i = a.length - 1; i >= 0; i--) {
        xor += (parseInt(a[i]) ^ parseInt(b[i]));
    }
    return reverseString(xor);
}


const calcSimpleHash = (messageBit, divBlockBit) => {
    let blocks = [];
    let blockNum = (messageBit.length + 1) / divBlockBit
    let start = 0, end = divBlockBit;
    for (let i = 0; i < blockNum - 1; i++) {
        blocks[i] = messageBit.slice(start, end)
        start = start + divBlockBit;
        end = end + divBlockBit;
    }
    let hash = "";
    for (let i = 0; i < blocks.length - 1; i++) {
        if (hash === "") {
            hash = `${calXOR(blocks[i], blocks[i + 1])}`
            continue;
        }
        hash = calXOR(hash, blocks[i + 1]);
    }
    return hash;
}

// console.log(calcSimpleHash(messageBit, divBlockBit));;

const leftShiftString = (string) => {
    string = string.split("");
    temp = string.shift();
    string = string.toString();
    string = string.replace(/,/g, "");
    return string + temp;
}
const calcCircularHash = (messageBit, divBlockBit) => {
    let blocks = [];
    let blockNum = (messageBit.length + 1) / divBlockBit
    let start = 0, end = divBlockBit;
    for (let i = 0; i < blockNum - 1; i++) {
        blocks[i] = messageBit.slice(start, end)
        start = start + divBlockBit;
        end = end + divBlockBit;
    }
    let circularHash = Array(divBlockBit).fill(0).toString().replace(/,/g, "");
    let temp = ""
    for (let i = 0; i < blocks.length; i++) {
        if (parseInt(circularHash) === 0) {
            temp = calXOR(circularHash, blocks[i])
            circularHash = leftShiftString(temp);
            continue;
        }
        temp = calXOR(circularHash, blocks[i]);
        circularHash = leftShiftString(temp);
    }
    return temp;
}

// console.log(calcCircularHash(messageBit,divBlockBit));;