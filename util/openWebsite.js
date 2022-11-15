const {
    createPage,
} = require("../puppeteer/createPage");
const { login } = require("../puppeteer/login");
require("dotenv").config();

(async function () {
    let { page, browser } = await createPage();
    page = await login(page);

    await page.goto(process.env.website);
})();
