export function generateUUID() {
    // generate uuid of 5 chars length
    const length = 5;
    const chars = '0123456789';
    const uuid = [];
    for (let i = 0; i < length; i++) {
        uuid.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    return uuid.join('');
}