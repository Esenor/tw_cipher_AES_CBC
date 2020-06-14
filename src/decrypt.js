const nodeForge = require('node-forge')
const fs = require('fs')
const path = require('path')


module.exports.decrypt = () => {
  const key = fs.readFileSync(path.join(__dirname, 'generated', 'secretKey')).toString()
  const iv = fs.readFileSync(path.join(__dirname, 'generated', 'initialVector')).toString()
  const data = fs.readFileSync(path.join(__dirname, 'generated', 'data')).toString()

  const inputEncrypted = nodeForge.util.createBuffer(Buffer.from(data, 'hex'))
  const decipher = nodeForge.cipher.createDecipher('AES-CBC', key)
  decipher.start({iv: iv})
  decipher.update(inputEncrypted)
  if (decipher.finish()) {
    return decipher.output.toString()
  } else {
    return null
  }
}