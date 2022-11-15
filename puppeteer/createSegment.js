const { createPage } = require("./createPage");
const { login } = require("./login");
require("dotenv").config();

async function createSegment() {
    try {
        let { page, browser } = await createPage(
            false
        );
        page = await login(page);
        await page.goto(process.env.website);
        await page.reload();
        await page.click(
            "#index_contacts_segments a[href='#panel1']"
        );
    } catch (error) {}
}

module.exports = {
    createSegment,
};
