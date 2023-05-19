const express = require('express');
const { idData, readFiles, writeFile } = require('./utils/readFile');
const { validateEmail, validatePassword } = require('./utils/emailValidate');
const createToken = require('./utils/createToken');
const tokenAuthorization = require('./utils/tokenAutho');
const nameValidate = require('./utils/nameValidate');
const ageValidate = require('./utils/ageValidate');
const talkValidate = require('./utils/talkValidate');
const rateValidate = require('./utils/rateValidate');

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

 app.post('/talker',
  tokenAuthorization, nameValidate, ageValidate, talkValidate, rateValidate, async (req, res) => {
  const talk = await readFiles();
  const newTalk = {
    id: talk.length + 1, ...req.body,
  };
  talk.push(newTalk);
  writeFile(talk);
  res.status(201).json(newTalk);
 });

app.put('/talker/:id',
 tokenAuthorization, nameValidate, ageValidate, talkValidate, rateValidate, async (req, res) => {
const { id } = req.params;
const { name, age, talk } = req.body;
const talkers = await readFiles();
const newTalk = talkers.find((t) => t.id === Number(id));
if (!newTalk) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
newTalk.name = name;
newTalk.age = age;
newTalk.talk = talk;
writeFile(talkers);
return res.status(200).json(newTalk);
 });

 app.delete('/talker/:id', tokenAuthorization, async (req, res) => {
  const { id } = req.params;
  const talker = await readFiles();
  const talkers = talker.find((talk) => talk.id === Number(id));
  if (talkers) {
    const i = talker.indexOf(talkers);
    talker.splice(i, 1);
    writeFile(talker);
    return res.status(204).json();
  }
 });

app.listen(PORT, () => {
  console.log('Online');
});
