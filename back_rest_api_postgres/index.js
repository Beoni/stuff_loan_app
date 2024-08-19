const express = require('express')

const app = express()

app.use(express.json())

app.use(require('./routes/userRoute'))
app.use(require('./routes/stuffRoute'))
app.use(require('./routes/loanRoute'))

app.listen(3000, () => console.log('Server running on port 3000'))