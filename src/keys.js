const nodeForge = require('node-forge')
const fs = require('fs')
const path = require('path')

module.exports.generateKeys = () => {
  const keySize = 32
  const ivSize = 16

  const key = nodeForge.random.getBytesSync(keySize)
  const iv = nodeForge.random.getBytesSync(ivSize)

  fs.writeFileSync(path.join(__dirname, 'generated', 'secretKey'), key)
  fs.writeFileSync(path.join(__dirname, 'generated', 'initialVector'), iv)
} 
