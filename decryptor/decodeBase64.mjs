export function Base64Decode(challenge){
    const [str, task] = challenge.encrypted_path.split("_")
    const id= atob(task);
    return `task_${id}`
}
