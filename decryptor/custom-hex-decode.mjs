function decodeCustomHex(encodedMessage, customSet) {
    const standardHex = '0123456789abcdef';
    const decodeMap = {};
    for (let i = 0; i < 16; i++) {
        decodeMap[customSet[i]] = standardHex[i];
    }

    return encodedMessage
        .toLowerCase()
        .split('')
        .map(char => {
            return decodeMap[char];
        })
        .join('');
}

export function CustomHexDecode(challenge) {
    const [str, task] = challenge.encrypted_path.split("_")
    const [customSet, _] = challenge.encryption_method.split(" ").reverse()

    const id = decodeCustomHex(task, customSet)

    return `task_${id}`
}
