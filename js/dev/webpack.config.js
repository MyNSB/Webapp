module.exports = {
    entry: {
        "4u": "./src/4u.js",
        "timetable": "./src/timetable.js"
    },
    output: {
        path: __dirname,
        filename: "../[name].js"
    },
    resolve: {
        modules: ["modules"]
    }
};
