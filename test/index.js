/**
 * @Author: tangzhicheng
 * @Date: 2021-06-02 09:17:32
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 10:56:10
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
})

async function test() {
  try {
    const result = await cp()
    console.log(result)
  } catch (error) {
    console.log('good')
    throw new Error('err')
  }
  console.log('123213')
}

(async() => {
  const res = await test()
  console.log(res)
})()
