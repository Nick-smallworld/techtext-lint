// vim:set ts=2 et:
const TextLintEngine = require('textlint').TextLintEngine;
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000

// 静的ファイルをpublic でホスト
app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// allow cors
app.use(cors());

// 8080番ポートで待ちうける
app.listen(PORT, () => {
    console.log('Running at Port 5000...');
});

app.post('/', (req, res, next) => {
    const req_text = req.body.text;
    const options = {
    };
    const engine = new TextLintEngine(options);
    engine.executeOnText(req_text).then(results => {
        res.json({
            messages: results[0].messages
        });
    });
});

// 404エラー
app.use((req, res) => {
    var url = req.protocol + '://' + req.headers.host + req.url;
    console.log(url);
    res.sendStatus(404);
});

