const fs = require('fs').promises;
const path = require('path');

const DATA = '../talker.json';

const readFiles = async () => {
    try {
        const file = await fs.readFile(path.resolve(__dirname, DATA));
        const talker = JSON.parse(file);
        return talker;
    } catch (error) {
        return console.log(`Erro ao ler arquivo: ${error}`);
    }
};

const idData = async (id) => {
    try {
        const file = await fs.readFile(path.resolve(__dirname, DATA));
        const talkers = JSON.parse(file).find((talk) => talk.id === Number(id));
        return talkers;
    } catch (error) {
        return console.log(`Erro ao ler arquivo: ${error}`);
    }
};
const writeFile = async (newFile) => {
    try {
        const string = JSON.stringify(newFile);
        return fs.writeFile(path.resolve(__dirname, DATA), string);
    } catch (error) {
        return console.log(`Error ao ler arquivo: ${error}`);
    }
};

module.exports = {
    readFiles,
    idData,
    writeFile,
};