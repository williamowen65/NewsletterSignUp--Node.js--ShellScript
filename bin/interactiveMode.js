const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");
const {
    createPage,
} = require("../puppeteer/createPage");
const {
    getShows,
} = require("../puppeteer/getShows");
const { login } = require("../puppeteer/login");
const {
    subscribe,
} = require("../puppeteer/subscribe");
const { sleep, padding } = require("../util/etc");

async function welcome() {
    const spinner = createSpinner(
        "Okay Let's do this... I am fetching the latest list of shows. Hold on..."
    ).start();
    ///run function that gets shows and writes them to file
    let { page: backgroundPage, browser } =
        await createPage(true);
    backgroundPage = await login(backgroundPage);
    const shows = await getShows(
        backgroundPage,
        browser
    );

    spinner.success({
        text: "Just fetched latest list of shows",
    });

    return { shows };
}

async function createShowPrompt() {
    const res = await inquirer.prompt({
        name: "newShowName",
        type: "input",
        message:
            "Provide the name of the new show: ",
    });

    return res.newShowName;
}

async function showQuery(shows) {
    /// get shows from data
    const answers = await inquirer.prompt({
        name: "show",
        type: "list",
        message:
            "What show are you adding subscribers for?",
        choices: ["Create new show", ...shows],
    });
    return answers.show;
}

async function subscriberQuery() {
    const answers = await inquirer.prompt({
        name: "subscribers",
        type: "input",
        message: "Provide your new subscribers",
        default() {
            return "right-click to paste";
        },
    });
    return JSON.parse(answers.subscribers);
}

async function subscriptionPrompt(show) {
    try {
        const subscribers =
            await subscriberQuery();
        let { page, browser } =
            await createPage();
        page = await login(page);

        await subscribers.reduceRight(
            async (prevProm, subscriber) => {
                const page = await prevProm;
                return subscribe(
                    subscriber,
                    show,
                    page
                );
            },
            Promise.resolve(page)
        );

        browser.close();
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    welcome,
    showQuery,
    createShowPrompt,
    subscriptionPrompt,
};
