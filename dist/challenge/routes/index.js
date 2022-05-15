const path            = require('path');
const express         = require('express');
const fs              = require('fs')
const router          = express.Router();
const puppeteer       = require("puppeteer");
const { dirname } 	  = require('path');
const appDir 		  = dirname(require.main.filename);

router.get('/', (req, res) => {
	return res.sendFile(path.resolve('views/index.html'));
});

router.post('/search', (req, res) => {
	const url = getValidUrl(req.body.url);
	randname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + ".png";
	saveas = appDir + '/static/img/'+ randname;
	capture(url, saveas);
	res.render('redirect.handlebars', {s: "../static/img/" + randname});
});

router.get("/viewscreenshot", (req, res) => {
	res.render('viewscreenshot.handlebars', {s: "../static/img/" + randname});
});

router.get("/flag", (req, res) => {
	if(req.ip == '127.0.0.1'){
		res.status(200).send('CTF{FL4G_F0R_T3ST1NG}');
	}else{
		res.status(403).send({
			message: 'Only visible from internal network.'
		});
	} 
});

const capture = async (url, saveas) => {
	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);
	await page.screenshot({ path: saveas});
	await browser.close();
  };

const getValidUrl = (url) => {
    newUrl = url.trim().replace(/\s/g, "");

    if(/^(:\/\/)/.test(newUrl)){
        return `http${newUrl}`;
    }
    if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
        return `http://${newUrl}`;
    }

    return newUrl;
};

module.exports = router;
