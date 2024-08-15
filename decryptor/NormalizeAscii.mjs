function removeSpecialCharactersAndSpaces(input) {
    // Replace all non-alphanumeric characters (except spaces) with an empty string
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
}
function normalize(input, n) {
    let modifiedString = '';
    const number = parseInt(removeSpecialCharactersAndSpaces(n));

    for (let i = 0; i < input.length; i++) {
        // Get the ASCII value of the character
        const asciiValue = input.charCodeAt(i);

        // Add or subtract the number based on its sign
        let newAsciiValue = asciiValue + number;

        // Convert the new ASCII value back to a character
        const newChar = String.fromCharCode(newAsciiValue);

        // Append the new character to the result string
        modifiedString += newChar;
    }

    return modifiedString;
}

function extractNumber(input) {
    // Use regex to match the first sequence of digits
    const match = input.split(" ")

    // Convert the match to a number and return, or return null if no match is found
    return match[1]
}

export function NormalizeAscii(challenge){
    const [str, task] = challenge.encrypted_path.split("_")
    const number = extractNumber(challenge.encryption_method)
    const id = normalize(task, number)
    return `task_${id}`
}
