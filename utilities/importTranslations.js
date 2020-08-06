const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');

// for the project id and api key
const { poeditConfig } = require('../config');

// imports all translations from PoEditor
async function importTranslations() {
  try {
    // get list of languages
    const langResponse = await axios.post(
      'https://api.poeditor.com/v2/languages/list',
      querystring.stringify({
        id: poeditConfig.projectId,
        api_token: poeditConfig.apiToken,
      })
    );
    const { languages } = langResponse.data.result;

    // iterate through each language and get a download link
    languages.forEach(async (lang) => {
      const exportResponse = await axios.post(
        'https://api.poeditor.com/v2/projects/export',
        querystring.stringify({
          id: poeditConfig.projectId,
          api_token: poeditConfig.apiToken,
          language: lang.code,
          type: 'key_value_json',
        })
      );
      const { url } = exportResponse.data.result;

      // fetch from the download link and write the JSON to disk
      const jsonResponse = await axios.get(url);
      const jsonData = jsonResponse.data;

      if (Object.keys(jsonData) < 1) {
        throw new Error('No terms found');
      }

      const filepath = `../locales/${lang.code}.json`;
      console.log(`Importing language: ${lang.code}`, '- path: ', filepath);
      fs.writeFileSync(filepath, JSON.stringify(jsonData, null, 2));
      console.log(`Importing language: ${lang.code} complete`);
    });
  } catch (e) {
    console.error(e);
    console.log('\x1b[31m');
    console.error('Error occurred while importing translations -- see above');
    console.log('\x1b[0m');
  }
}

module.exports = importTranslations;
