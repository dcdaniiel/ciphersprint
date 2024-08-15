import https from 'https';
import { Ascii } from "./decryptor/ascii.mjs"
import { RemoveNonHex } from "./decryptor/non-hex.mjs";
import { Rotate } from "./decryptor/rotate.mjs";
import { CustomHexDecode } from "./decryptor/custom-hex-decode.mjs";
import { MessagePack } from "./decryptor/message-pack.mjs";
import { Base64Decode } from "./decryptor/decodeBase64.mjs";
import { SwapPairs } from "./decryptor/swapPairs.mjs";
import { NormalizeAscii } from "./decryptor/NormalizeAscii.mjs";
import { XORDecrypt } from "./decryptor/XOR.mjs";

const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/;

function isValidEmail(email) {
    return emailRegex.test(email);
}

function usage() {
    console.log('Usage: node ciphersprint <your_email>');
    console.log('Please provide a valid email address to start the challenge.');
}

class Client {
    constructor(httpClient) {
        this.httpClient = httpClient || https;
        this.baseURL = 'https://ciphersprint.pulley.com';
    }

    async getChallenge(path) {
        try {
            return await this.httpGet(`${this.baseURL}/${path}`);
        } catch (error) {
            throw error;
        }
    }

    async httpGet(url) {
        const res = await fetch(url)
        return await res.json()
    }
}

async function decrypt(challenge) {
    const method = challenge.encryption_method
    if(method.includes("ASCII values")) {
        return Ascii(challenge)
    }

    if(method.includes("non-hex")) {
        return RemoveNonHex(challenge)
    }

    if(method.includes("circularly rotated")) {
        return Rotate(challenge)
    }

    if(method.includes("custom hex")) {
        return CustomHexDecode(challenge)
    }

    if(method.includes("original positions as base64")) {
        return MessagePack(challenge)
    }

    if(method.includes("encoded as base64")) {
        return Base64Decode(challenge)
    }

    if(method.includes("swapped every pair of characters")) {
        return SwapPairs(challenge)
    }

    if(method.includes("to ASCII value of each character")) {
        return NormalizeAscii(challenge)
    }

    if(method.includes("hex decoded, encrypted with XOR, hex encoded again. key:")) {
        return XORDecrypt(challenge)
    }

    return challenge.encrypted_path
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        usage();
        return;
    }

    let challengeUrl = args[0];

    if (!isValidEmail(challengeUrl)) {
        console.log('Invalid email address provided, unable to start challenge');
        usage();
        return;
    }

    const client = new Client();
    console.log(`Starting challenge with email address ${challengeUrl}\n`);

    while (true) {
        console.log(`Attempting to solve challenge ${challengeUrl}`);

        try {
            const challenge = await client.getChallenge(challengeUrl);
            console.log('Challenge:', challenge);

            if (challenge.encryption_method && challenge.encryption_method.includes('hashed with sha256')) {
                console.log('Final level, done!');
                break;
            }

            const decryptedPath = await decrypt(challenge);
            console.log(`Decrypted path: ${decryptedPath}`);

            challengeUrl = decryptedPath;
            console.log('');

        } catch (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
    }
}

main();
