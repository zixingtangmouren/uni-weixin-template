/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 09:52:22
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 10:06:04
 * @Description: 测试服务
 */

const express = require('express')

const app = express()

const MOCK_PORT = 3000

const server = (PORT) => {
  app.get('/success', (req, res) => {
    res.status(200).send({
      code: 0,
      data: 'success',
      msg: null,
    })
  })

  app.get('/fail', (req, res) => {
    res.status(200).send({
      code: -1,
      data: null,
      msg: '业务报错',
    })
  })

  app.get('/error', (req, res) => {
    res.status(500).send({
      code: -1,
      data: null,
      msg: 'GG',
    })
  })

  app.listen(PORT, () => {
    console.log('mock server is runing')
    console.log(`http://localhost:${PORT}/`)
  })
}

server(MOCK_PORT)
