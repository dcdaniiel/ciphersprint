function rotate(str, k) {
    const n = str.length;
    k = k % n; // Normalize k to ensure it's within the length of the string

    if (k === 0) return str; // No rotation needed

    // Slice the string into two parts and concatenate them in reversed order
    const part1 = str.slice(0, n - k);
    const part2 = str.slice(n - k);

    return part2 + part1;
}

export function Rotate(challenge) {
    const [s, task] = challenge.encrypted_path.split("_")
    const [by, _] = challenge.encryption_method.split(" ").reverse()
    const id = rotate(task, by)

    return `task_${id}`
}
