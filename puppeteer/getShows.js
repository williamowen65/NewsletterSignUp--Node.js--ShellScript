// import dotenv from "dotenv";
require("dotenv").config();

async function getShows(page, browser) {
    try {
        await page.goto(process.env.website);
        await page.reload();
        await page.click(
            "#index_contacts_segments a[href='#panel1']"
        );
        // const res = []
        const result = await page.evaluate(() => {
            const el = document.querySelector(
                "#index_contacts_segments > div > table > tbody"
            );
            const rows = Array.from(
                el.querySelectorAll("tr")
            );
            return rows.map((el) =>
                el.textContent
                    .replace(
                        /[\n\r]+|[\s]{2,}/g,
                        " "
                    )
                    .trim()
            );
        });

        await browser.close();
        // console.log(3);

        // res.locals.result = result
        // console.log(result);
        return result;
        // next()
    } catch (error) {
        await browser?.close();
        console.log("error from getSHOWS", error);
    }
}

module.exports = { getShows };
