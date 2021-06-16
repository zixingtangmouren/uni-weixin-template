/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 09:52:22
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 16:00:15
 * @Description: 测试服务
 */

const express = require('express')

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const MOCK_PORT = 3000

const task = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, (Math.random() * 10).toFixed(1) * 1000)
})

const server = (PORT) => {
  app.get('/success', (req, res) => {
    task().then(() => {
      res.status(200).send({
        code: 0,
        data: 'success',
        msg: null
      })
    })
  })

  app.post('/post', (req, res) => {
    res.status(200).send({
      code: 0,
      data: req.body,
      msg: null
    })
  })

  app.get('/fail', (req, res) => {
    res.status(200).send({
      code: -1,
      data: null,
      msg: '业务报错'
    })
  })

  app.get('/error', (req, res) => {
    res.status(500).send({
      code: -1,
      data: null,
      msg: 'GG'
    })
  })

  app.listen(PORT, () => {
    console.log('mock server is runing')
    console.log(`http://localhost:${PORT}/`)
  })
}

server(MOCK_PORT)
