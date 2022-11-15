#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const {
    createPage,
} = require("../puppeteer/createPage");
const { login } = require("../puppeteer/login");
const { padding } = require("../util/etc");
const {
    createNewShow,
} = require("./createNewShow");
const {
    welcome,
    showQuery,
    createShowPrompt,
    subscriptionPrompt,
} = require("./interactiveMode");

require("dotenv").config();

yargs(hideBin(process.argv))
    .command(
        "*",
        "artstore command by itself",
        (yargs) => {
            return yargs;
        },
        async (argv) => {
            const { uname, pword, website } =
                process.env;
            if (!uname || !pword || !website) {
                throw new Error(
                    "You have no credentials or website info here.. 😕 Try creating a dot env file"
                );
            }

            const { shows } = await welcome();
            let show = await showQuery(shows);
            if (show === "Create new show") {
                const newShowName =
                    await createShowPrompt();
                const success =
                    await createNewShow(
                        newShowName
                    );
                if (success) {
                    show = newShowName;
                } else {
                    throw new Error(
                        "something went wrong with creating a new show.. 😕"
                    );
                }
            }
            await subscriptionPrompt(show);
            padding();
            console.log(
                "Confirm uploads and proceed to delete list from tablet"
            );
        }
    )
    .parse();
