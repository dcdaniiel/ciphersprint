
function swap(str) {
    let swapped = '';
    for (let i = 0; i < str.length; i += 2) {
        // Swap pairs of characters
        if (i + 1 < str.length) {
            swapped += str[i + 1] + str[i];
        } else {
            // If the length is odd, just add the last character
            swapped += str[i];
        }
    }
    return swapped;
}

export function SwapPairs(challenge){
    const [str, task] = challenge.encrypted_path.split("_")
    const id = swap(task)
    return `task_${id}`
}
