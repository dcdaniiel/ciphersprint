import msgpack from "msgpack5";

function decodeBase64MessagePack(base64Str) {
    // Step 1: Decode the Base64 string
    const binaryString = atob(base64Str);

    // Convert binary string to Uint8Array
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Step 2: Parse the MessagePack data
    const decodedData = msgpack().decode(uint8Array);

    return decodedData;
}

function unscrambleData(data, originalPositions) {
    const unscrambledData = new Array(data.length);

    // Place each item from data to its original position
    for (let i = 0; i < data.length; i++) {
        const originalPosition = originalPositions[i];
        unscrambledData[originalPosition] = data[i];
    }

    return unscrambledData;
}


export function MessagePack(challenge) {
    const [str, task] = challenge.encrypted_path.split("_")
    const [base64, _] = challenge.encryption_method.split(" ").reverse()

    const originalPosition = decodeBase64MessagePack(base64)

    const id = unscrambleData(task, originalPosition).join("")

    return `task_${id}`
}
