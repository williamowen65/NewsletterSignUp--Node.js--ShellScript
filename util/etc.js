const sleep = (ms = 2000) =>
    new Promise((r) => setTimeout(r, ms));
const padding = (rows) => {
    console.log(
        `
    `
    );
};

module.exports = {
    sleep,
    padding,
};
