import { randomBytes, createHash } from 'node:crypto'
export class CodeChallange {
    codeVerifier = this.getVerifier()
    codeChallange = this.getCodeChallange()
    constructor() {
        this.generateVerifier()
        this.generateCodeChallange()
    }

    getVerifier (): Buffer {
        return this.codeVerifier;
    }

    getCodeChallange () {

    }

    private base64Encode(buffer: Buffer) {
        return buffer.toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    private generateVerifier () {
        return this.base64Encode(randomBytes(32))
    }

    private sha256(buffer: Buffer) {
        return createHash('sha256').update(buffer).digest();
    }

    private generateCodeChallange() {
        return this.base64Encode(this.sha256(this.getVerifier()))
    }
}