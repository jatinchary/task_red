const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = "https://news.ycombinator.com/";
const pagesToScrape = 3;

async function getData() {
	try {
		for (let i = 1; i <= pagesToScrape; i++) {
            const url = `${baseUrl}?p=${i}`;

            const response = await axios.get(url);
            const html = response.data;

            const $ = cheerio.load(html);
			const tbody = $('#hnmain > tbody > tr:nth-child(3) > td > table > tbody');
			const children = tbody.children('tr');

			for (let ind = 0; ind < children.length-2; ind=ind+3) {
				const rank = $(children[ind]).find('> td:nth-child(1) > span').text().slice(0, -1);
				const title = $(children[ind]).find('> td:nth-child(3) > span > a').text();
				const url = $(children[ind]).find('> td:nth-child(3) > span > a').attr('href');
				const upvotes = $(children[ind+1]).find('td.subtext > span > span.score').text().split(' ')[0];
				const posted_on = $(children[ind+1]).find('td.subtext > span > span.age').attr('title');
				const number_of_comments = $(children[ind+1]).find('> td.subtext > span > a:last-child').text().trim();
			}
        }

	} catch (error) {
		console.log(error);
	}

}

getData();