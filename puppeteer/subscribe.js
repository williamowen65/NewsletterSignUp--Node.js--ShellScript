require("dotenv").config();

function processFullName(name) {
    name = name.split(" ");
    const firstN = name[0];
    const lastN =
        name.length > 1
            ? name[name.length - 1]
            : null;
    return { firstN, lastN };
}


async function OptIn(page) {
    await page.$eval(
        "#contentbody > div.row.row-spacing.margin-top > div > div:nth-child(1) > div > div.large-12.columns.no-left-right-padding > p:nth-child(1) > a:nth-child(8)",
        (elem) => elem.click()
    );
    await page.waitForNavigation();
    await page.reload();
    return page;
}

async function FillOutInfo(contact, page) {
    await page.goto(process.env.website + "/new");
    const { firstN, lastN } = processFullName(
        contact.name
    );
    await page.type(
        "#contact_first_name",
        firstN
    );
    lastN &&
        (await page.type(
            "#contact_last_name",
            lastN
        ));
    await page.type(
        "#contact_email",
        contact.email
    );
    await page.evaluate((sel) => {
        const el = document.querySelector(
            "iframe#launcher"
        );
        if (el) {
            el.remove();
        }
    });
    await page.click("#save_site_control");
    await page.waitForNavigation();
    await page.waitForTimeout(1000);
    return page;
}

function subscribe(contact, showw, page) {
    return new Promise(async (res, rej) => {
        try {
            await console.log(
                "Currently subscribing ",
                contact,
                "to",
                showw
            );

            page = await FillOutInfo(
                contact,
                page
            );
            page = await OptIn(page);
            // await console.log(
            //     "BEFORE ADD SEGMENT, for show: ",
            //     showw
            // );

            // const btn = await page.$eval(
            //     "#edit_contacts_segments a",
            //     (el) => el.click()
            // );
            await page.click(
                "#edit_contacts_segments a"
            );
            await page.waitForTimeout(2000);
           
            let show;
            const [showBtn] = await page.$x(
                `//label[text()[contains(.,'${showw}')]]`
            );
            show = showBtn;
            (async () => {
                while (!show) {
                    await page.reload();
                    const [showBtn] =
                        await page.$x(
                            `//label[text()[contains(.,'${showw}')]]`
                        );
                    show = showBtn;
                }
            })();
            if (show) {
                await show.click();
            } else {
                throw new Error(
                    "The show " +
                        showw +
                        " didn't exist on your art store website"
                );
            }
            // await show.jsonValue().then((res) => {
            //     console.log(
            //         "SEGMENT ADDED ",
            //         res
            //     );
            // });
            // await page.waitForTimeout(1000);
            await page.evaluate((sel) => {
                //second delete
                const el =
                    document.querySelector(
                        "#launcher"
                    );
                el.remove();
            });
            // // #edit_contacts_segments > div > div:nth-child(4) > div > label
            await page.click(
                "#save_site_control"
            );
            await page.waitForNavigation();
            res(page);
        } catch (error) {
            console.warn(error);
            res(page);
        }
    });
}

module.exports = { subscribe };
