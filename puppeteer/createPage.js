const puppeteer = require("puppeteer");

const createPage = async (headless = false) => {
    const ref = await puppeteer.launch({
        headless,
        args: ["--no-zygote", "--no-sandbox"],
    });

    return {
        page: await ref.newPage(),
        browser: ref,
    };
};

module.exports = {
    createPage,
};
