const chai = require('chai').expect
const keys = require('./keys')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')
const { expect } = require('chai')
const { it, describe } = require('mocha')

describe('node-forge cipher AES-CBC methods', () => {
  const data = JSON.stringify({
    fii: 'foo',
    bar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  })
  keys.generateKeys()

  it('1) Should encrypt and decrypt JSON object with valid key', () => {
    encrypt.encrypt(data)
    expect(decrypt.decrypt()).to.be.equal(data)
    expect(decrypt.decrypt()).to.be.deep.equal(data)
  })

  it('2) Should decrypt JSON object with valid key', () => {
    expect(decrypt.decrypt()).to.be.equal(data)
    expect(decrypt.decrypt()).to.be.deep.equal(data)
  })
})
