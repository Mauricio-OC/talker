const talkValidate = ((req, res, next) => {
    const { talk } = req.body;
      if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
      }
      if (!talk.watchedAt === []) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
      }
      if (talk.watchedAt === undefined) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
      const watchedAtRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!watchedAtRegex.test(talk.watchedAt)) {
  return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  });
  
  module.exports = talkValidate;