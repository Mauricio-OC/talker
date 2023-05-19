const express = require('express');
const { idData, readFiles } = require('./utils/readFile');
const { validateEmail, validatePassword } = require('./utils/emailValidate');
const createToken = require('./utils/createToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readFiles();
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
const { id } = req.params;
const talkers = await idData(id);
if (talkers) {
  return res.status(200).json(talkers);
}
return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail,
 validatePassword, async (_req, res) => {
  const token = createToken();
   return res.status(200).json({ token });
 });

app.listen(PORT, () => {
  console.log('Online');
});
