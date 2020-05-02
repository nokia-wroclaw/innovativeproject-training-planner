module.exports = {
    transformDate: function (dateStr, timeStr) {
        let datetime = dateStr + " " + timeStr;
        datetime = new Date(datetime);
        return datetime;
    },
};