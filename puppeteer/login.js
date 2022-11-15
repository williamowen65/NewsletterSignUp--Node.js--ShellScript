const { sleep } = require("../util/etc");

require("dotenv").config();

const login = async (page) => {
    // Login
    await page.goto(
        "https://app.artstorefronts.com/sessions/new"
    );
    await page.type(
        "#first_form_field",
        process.env.uname
    );
    await page.type(
        "#password",
        process.env.pword
    );
    await page.click("input[type=submit]");
    await sleep(2000);
    return page;
};

module.exports = {
    login,
};
