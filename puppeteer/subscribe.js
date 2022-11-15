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
// async function subscribe(contacts, showw, page) {

//     let promiseList = [];
//     try {
//         // console.log('login and sub attempt', args)

//         promiseList.push(
//             new Promise(async (res, rej) => {
//                 await page.setDefaultNavigationTimeout(
//                     0
//                 );

//                 // Login
//                 await page.goto(
//                     "https://app.artstorefronts.com/sessions/new"
//                 );
//                 await page.type(
//                     "#first_form_field",
//                     process.env.uname
//                 );
//                 await page.type(
//                     "#password",
//                     process.env.pword
//                 );
//                 await page.click(
//                     "input[type=submit]"
//                 );
//                 await sleep(2000);
//                 console.log("Login success");
//                 res(page);
//             })
//         );

//         contacts.forEach((contact) => {
//             promiseList.push(
//                 new Promise(async (res, rej) => {
//                     await add(contact, page);
//                     res(
//                         `last contact ${contact} ${page}`
//                     );
//                 })
//             );
//         });

//         console.log("promiselist", promiseList);
//         // // add user

//         promiseList.reduce(
//             async (prevPromise, nextPromise) => {
//                 // curr.then(() => {
//                 // console.log(
//                 //     "Trying to add ",
//                 //     subscriber
//                 // );
//                 const res = await prevPromise;
//                 page = res;
//                 console.log(
//                     "res: ",
//                     res,
//                     nextPromise
//                 );
//                 return nextPromise;
//             },
//             Promise.resolve()
//         );

//         async function add(contact, page) {
//             try {
//                 const { name, email } = contact;
//                 console.log(
//                     "inside add: ",
//                     contact,
//                     module.page
//                 );
//                 const parts =
//                     processFullName(name);
//                 const firstN = parts[0];
//                 const lastN =
//                     parts.length > 1
//                         ? parts[parts.length - 1]
//                         : null;
//                 await page.goto(

//                 );
//                 await page.type(
//                     "#contact_first_name",
//                     firstN
//                 );
//                 lastN &&
//                     (await page.type(
//                         "#contact_last_name",
//                         lastN
//                     ));
//                 await page.type(
//                     "#contact_email",
//                     email
//                 );
//                 // await page.waitForSelector('#Embed > div > div > button')
//                 await page.evaluate((sel) => {
//                     //first delete
//                     const el =
//                         document.querySelector(
//                             "iframe#launcher"
//                         );
//                     if (el) {
//                         el.remove();
//                     }
//                 });
//                 await page.click(
//                     "#save_site_control"
//                 );
//                 await page.waitForNavigation();
//                 await page.waitForTimeout(1000);
//                 // const [btn] = await page.$x(`//a[contains(@authenticity_token, "true")]`);
//                 // console.log(btn);
//                 // if (btn) {
//                 //   btn.click()
//                 // } else {
//                 //   throw new Error("Opt in btn not found")
//                 // }

//                 await page.$eval(
//                     "#contentbody > div.row.row-spacing.margin-top > div > div:nth-child(1) > div > div.large-12.columns.no-left-right-padding > p:nth-child(1) > a:nth-child(8)",
//                     (elem) => elem.click()
//                 );
//                 console.log("opt in success");
//                 await page.waitForNavigation();
//                 await page.reload();
//                 await console.log(
//                     "BEFORE ADD SEGMENT, for show: ",
//                     showw
//                 );

//                 // Add user to correct segment
//                 // await page.click(
//                 //     "#edit_contacts_segments > p > a"
//                 // );
//                 let [btn] = await page.$x(
//                     `//a[contains(., 'segments')]`
//                 );
//                 if (btn) {
//                     btn.click();
//                 } else {
//                     await page.reload();
//                     [btn] = await page.$x(
//                         `//a[contains(., 'segments')]`
//                     );
//                     if (btn) {
//                         btn.click();
//                     }
//                 }
//                 const [show] = await page.$x(
//                     `//label[contains(., '${showw}')]`
//                 );
//                 if (show) {
//                     show.click();
//                 } else {
//                     throw new Error(
//                         "The show " +
//                             showw +
//                             " didn't exist on artstorefronts"
//                     );
//                 }
//                 await show
//                     .jsonValue()
//                     .then((res) => {
//                         console.log(
//                             "SEGMENT ADDED ",
//                             res
//                         );
//                     });
//                 await page.waitForTimeout(1000);
//                 await page.evaluate((sel) => {
//                     //second delete
//                     const el =
//                         document.querySelector(
//                             "#launcher"
//                         );
//                     el.remove();
//                 });
//                 // #edit_contacts_segments > div > div:nth-child(4) > div > label
//                 await page.click(
//                     "#save_site_control"
//                 );

//                 console.log("end ");
//             } catch (error) {
//                 return;
//             }
//         }

//         // console.log("segment success?");
//         // await browser.close();

//         // return {
//         //     ...contact,
//         //     status: "complete",
//         // };
//     } catch (error) {
//         // if (browser) {
//         //     await browser.close();con
//         // }
//         console.error(
//             "SUBSCRIBE DID NOT WORK",
//             error
//         );
//     }
// }

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
            // let btn;
            // while (!btn) {
            //     await page.reload();

            //     const [BTN] = await page.$x(
            //         `//a[contains(., 'segments')]`
            //     );
            //     btn = BTN;
            // }
            // if (btn) {
            // btn.click();
            // } else {
            //     console.error(
            //         "couldn't find button for segments"
            //     );
            //     // await page.reload();
            //     // [btn] = await page.$x(
            //     //     `//a[contains(., 'segments')]`
            //     // );
            //     // if (btn) {
            //     //     btn.click();
            //     // }
            // }

            // page.click()
            // const labels = await page.$$(
            //     "#edit_contacts_segments label"
            // );

            // console.log(
            //     "trying to get show ",
            //     showw
            // );
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
