const express = require('express');
const cors = require('cors');
const app = express();
/* CORS tuki lisätään palvelimeen tukemaan api kutsuja */ 
app.use(cors());

app.use(express.json());

app.use(require('./routes/userRoute'));
app.use(require('./routes/stuffRoute'));
app.use(require('./routes/loanRoute'));

app.listen(3000, () => console.log('Server running on port 3000'));