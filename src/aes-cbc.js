const nodeForge = require('node-forge')

const generateKey = () => nodeForge.random.getBytesSync(32)

const generateVector = () => nodeForge.random.getBytesSync(16)

/**
 * @param {string} key
 * @param {string} vector
 * @param {mixed} data
 */
const encrypt = (key, vector, data) => {
  const bufferizedData = Buffer.from(data)
  const cipher = nodeForge.cipher.createCipher('AES-CBC', key)
  cipher.start({iv: vector})
  cipher.update(nodeForge.util.createBuffer(bufferizedData))
  if (cipher.finish()) {
    return cipher.output.toHex()
  } else {
    throw new Error('Error when finishing the cipher buffer')
  }
}

/**
 * @param {string} key
 * @param {string} vector
 * @param {mixed} encryptedData
 */
const decrypt = (key, vector, encryptedData) => {
  const decipher = nodeForge.cipher.createDecipher('AES-CBC', key)
  decipher.start({iv: vector})
  decipher.update(nodeForge.util.createBuffer(Buffer.from(encryptedData, 'hex')))
  if (decipher.finish()) {
    return decipher.output
  } else {
    throw new Error('Error when finishing the decipher buffer')
  }
}

const key = generateKey()
const vector = generateVector()
const data =   [
  {
    id: 0,
    weight: 1,
    title: 'An album',
    description: 'Maecenas suscipit varius mi sit amet facilisis. Mauris maximus vehicula tellus, eget dictum neque. In luctus nisi eget turpis porttitor lobortis. Aliquam erat volutpat. Vestibulum vulputate vehicula augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas tristique ultrices libero. In euismod gravida luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    tab: ['text', 'article', 'blog']
  },
  {
    id: 150,
    weight: 12,
    title: 'Quisque elementum lectus metus',
    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac leo faucibus, pharetra massa eget, eleifend elit. Nullam pellentesque interdum magna sit amet faucibus. Donec egestas, ipsum ut faucibus eleifend, massa quam commodo libero, in tempor tortor lectus vitae velit. Proin id urna ac lorem tristique suscipit eget a magna. Sed facilisis aliquet dolor. Fusce lobortis dignissim mattis. Vestibulum sagittis erat dignissim dolor lobortis, pharetra blandit risus efficitur. Aenean sodales lacus eget justo malesuada, eu ultrices augue ultricies. Nulla interdum bibendum condimentum. Sed sed placerat velit. Sed ac dapibus felis. Quisque ut lectus velit. Sed tempus, diam eu hendrerit sollicitudin, ipsum est vestibulum dui, id tristique urna est a risus. Praesent viverra commodo tristique.</p><p>Ut ornare, purus id accumsan semper, nunc nulla lobortis tortor, ut aliquet justo leo aliquet nunc. Donec eu ante facilisis, ultricies massa eget, hendrerit quam. Cras laoreet nulla vitae libero molestie dictum. Sed dapibus augue vel nisl dictum dignissim tincidunt eu sapien. Cras magna mauris, tempor ut diam venenatis, auctor bibendum nibh. Ut nec feugiat elit, sed facilisis lorem. Integer eu rutrum ex. In hac habitasse platea dictumst. Ut fermentum congue lectus non ullamcorper. Vestibulum id condimentum est. Nunc gravida ornare consequat. Mauris ut ullamcorper nulla, in malesuada enim. Ut blandit eu orci sed sagittis. Nullam ac laoreet dui, vel pellentesque ante.</p><p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam aliquam orci quis sem pellentesque, vel porta urna mollis. Aliquam non enim tincidunt, pretium mauris eu, fermentum sapien. Ut elementum, ante sit amet interdum mattis, ex sem facilisis dolor, et interdum elit nisl ut est. Fusce dictum nibh vel massa pulvinar, eget viverra felis convallis. Proin commodo, purus at sodales pellentesque, neque libero aliquet orci, sit amet condimentum urna eros in lectus. Quisque elementum lectus metus, ut gravida turpis gravida et. Vivamus lobortis at lacus in ultricies. Praesent vitae neque et eros efficitur placerat. Cras placerat, turpis ut ultricies rhoncus, tortor ligula suscipit tellus, tempor mollis dui sapien sed orci. Nulla at leo vitae est tempor aliquam. Curabitur molestie et metus at condimentum. Vestibulum ipsum nisi, sollicitudin vel nulla vel, venenatis dapibus lacus. Nam ac urna sit amet ante tincidunt tincidunt. In vehicula quam vel efficitur facilisis. Suspendisse sed tellus viverra, pulvinar est a, ullamcorper sapien.</p>',
    tab: ['text', 'blog', 'html']
  }
]
const encryptedData = encrypt(key, vector, JSON.stringify(data))
const decryptedData = decrypt(key, vector, encryptedData)

console.log({key, vector, data, encryptedData, decryptedData})
