function removeNonHexCharacters(input) {
    return input.replace(/[^a-fA-F0-9]/g, '');
}

export function RemoveNonHex(challenge) {
    const [_, hex] = challenge.encrypted_path.split("_")
    const id = removeNonHexCharacters(hex)

    return `task_${id}`
}
