const nodeForge = require('node-forge')
const pki = nodeForge.pki
const rsa = pki.rsa
const md = nodeForge.md.sha1.create()

rsa.generateKeyPair({ bits: 2048, workers: 2}, (error, keypair) => {
  if (!error) {
    const privateKey = keypair.privateKey
    const pemPivateKey = pki.privateKeyToPem(privateKey)
    const publicKey = keypair.publicKey
    const pemPublicKey = pki.publicKeyToPem(publicKey)

    console.log('pem private key', pemPivateKey)
    console.log('pem public key', pemPublicKey)

    md.update('lorem ipsum en dolo', 'utf8')
    const signature = privateKey.sign(md)

    console.log('signature', signature)

    const isVerified = publicKey.verify(md.digest().bytes(), signature)

    console.log('isVerified', isVerified)

    const encrypted = publicKey.encrypt(Buffer.from(JSON.stringify({
      fii: 'foo',
      id: 42
    })))
    console.log('encrypted string', encrypted)

    const decrypted = JSON.parse(privateKey.decrypt(encrypted))
    console.log('decrypted string', decrypted)
  }
})