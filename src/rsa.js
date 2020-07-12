const nodeForge = require('node-forge')
const pki = nodeForge.pki
const rsa = pki.rsa
const md = nodeForge.md.sha1.create()
const fs = require('fs')
const path = require('path')

rsa.generateKeyPair({ bits: 2048, workers: 2}, (error, keypair) => {
  if (!error) {
    const privateKey = keypair.privateKey
    const pemPivateKey = pki.privateKeyToPem(privateKey)
    const publicKey = keypair.publicKey
    const pemPublicKey = pki.publicKeyToPem(publicKey)

    console.log('pem private key', pemPivateKey)
    fs.writeFileSync(path.join(__dirname, 'generated', 'pemPivateKey'), pemPivateKey)
    console.log('pem public key', pemPublicKey)
    fs.writeFileSync(path.join(__dirname, 'generated', 'pemPublicKey'), pemPublicKey)

    md.update('lorem ipsum en dolo', 'utf8')
    const signature = privateKey.sign(md)

    console.log('signature', signature)

    const isVerified = publicKey.verify(md.digest().bytes(), signature)

    console.log('isVerified', isVerified)

    const encrypted = publicKey.encrypt(Buffer.from(JSON.stringify({
      fii: 'foo',
      id: 42
    })))

    fs.writeFileSync(path.join(__dirname, 'generated', 'encryptedRsa'), encrypted)

    console.log('encrypted string', encrypted)

    const decrypted = JSON.parse(privateKey.decrypt(encrypted))
    console.log('decrypted string', decrypted)
  }
})