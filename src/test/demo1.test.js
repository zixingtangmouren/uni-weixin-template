/**
 * @Author: tangzhicheng
 * @Date: 2021-06-02 09:17:32
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 09:29:20
 * @Description: file content
 */

const cp = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({
    //   code: 0,
    //   data: [1, 2, 3],
    //   msg: null
    // })
    reject(new Error('this is error'))
  })
}).catch((err) => {
  throw new Error(err.message)
})

async function test() {
  try {
    const result = await cp()
    console.log(result)
  } catch (error) {
    console.log('good')
  }
  console.log('123213')
}

test()
