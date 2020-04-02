var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3002, () => {
  console.log('Example app listening on port ' + (process.env.PORT || 3002))
})
