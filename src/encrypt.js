const nodeForge = require('node-forge')
const fs = require('fs')
const path = require('path')


module.exports.encrypt = (data) => {
  const key = fs.readFileSync(path.join(__dirname, 'generated', 'secretKey')).toString()
  const iv = fs.readFileSync(path.join(__dirname, 'generated', 'initialVector')).toString()

  const bufferData = Buffer.from(data)
  const cipher = nodeForge.cipher.createCipher('AES-CBC', key)
  cipher.start({iv: iv})
  cipher.update(nodeForge.util.createBuffer(bufferData))
  if (cipher.finish()) {
    fs.writeFileSync(path.join(__dirname, 'generated', 'data'), cipher.output.toHex())
  } else {
    return null
  }
}
