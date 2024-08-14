export function Ascii(challenge) {
    const [_, task] = challenge.encrypted_path.split("_")
    const id = Array.from(JSON.parse(task))
        .filter(code => code >= 32 && code <= 126) // Filter for valid ASCII range (printable characters)
        .map(code => String.fromCharCode(code))
        .join("")
    return `task_${id}`
}
