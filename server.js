const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;


const keywordToUrls = {
    "текст": ["https://disk.yandex.ru/d/7DUlJlDfvAIqNQ", "https://disk.yandex.ru/d/5OSbSrHQM7vBxQ"],
};


app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/get-urls', (req, res) => {
    const keyword = req.body.keyword;
    const urls = keywordToUrls[keyword];
    if (urls) {
        res.json({ urls });
    } else {
        res.status(404).json({ message: "Ключевое слово не найдено" });
    }
});


app.post('/download', async (req, res) => {
    const url = req.body.url;
    try {
        const response = await axios.get(url);
        res.json({ content: response.data });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при скачивании контента" });
    }
});


app.listen(port, () => {
    console.log(`Cервер запущен на http://localhost:${port}`);
});