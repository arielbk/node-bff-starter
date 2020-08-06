module.exports = function translate(req, res) {
  const lang = req.query.lang && req.query.lang.toLowerCase();
  const locale = require(`../locales/${lang}.json`);
  if (!locale) {
    res.status(404).send('Language not found');
  } else {
    res.status(200).send(locale);
  }
};
