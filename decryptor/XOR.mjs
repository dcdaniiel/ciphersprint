// Helper function for XOR decryption
function xorDecrypt(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result;
}

function reverseOperations(input, key) {
    // Step 1: Hex decode
    const hexDecoded = Buffer.from(input, 'hex').toString('utf-8');
    // Step 2: XOR decrypt
    const decrypted = xorDecrypt(hexDecoded, key);
    // Step 3: Hex encode
    return Buffer.from(decrypted, 'utf-8').toString('hex');
}


export function XORDecrypt(challenge) {
    const [str, task] = challenge.encrypted_path.split("_")
    const [secret, _] = challenge.encryption_method.split(" ").reverse()
    const id = reverseOperations(task, secret)

    return `task_${id}`
}
