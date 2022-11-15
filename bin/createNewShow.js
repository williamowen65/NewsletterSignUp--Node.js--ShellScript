const { createSpinner } = require("nanospinner");
const {
    createPage,
} = require("../puppeteer/createPage");
const { login } = require("../puppeteer/login");
const { sleep } = require("../util/etc");
require("dotenv").config();

async function createNewShow(show) {
    let success = false;
    try {
        const spinner = createSpinner(
            "Hold on while I create that segment..."
        ).start();
        let { page, browser } = await createPage(
            true
        );
        page = await login(page);
        await page.goto(process.env.website);
        await page.reload();
        await page.click(
            "#index_contacts_segments a[href='#panel1']"
        );
        await page.click("#new_segment");
        await sleep(2000);
        // await page.waitForNavigation();
        await page.type("#segment_name", show);
        await page.click("input[value=Create]");
        await page.waitForNavigation();
        success = true;
        if (!success) {
            console.warn(
                "new show might not have been created"
            );
        }
        browser.close();
        spinner.success({
            text: `Segment added and you are set to add subscribers from ${show}`,
        });
        return success;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createNewShow,
};
