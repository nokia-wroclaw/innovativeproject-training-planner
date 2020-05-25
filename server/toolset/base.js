module.exports = {
  transformDate: function(dateStr, timeStr) {
    let datetime = dateStr + ' ' + timeStr;
    datetime = new Date(datetime);
    return datetime;
  },

  getNameFromEmail: function(email) {
    const nameJoined = email.replace(/\d*@.*$/, '');
    const nameArray = nameJoined.split('.');
    for (const i in nameArray) {
      nameArray[i] =
        nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1);
    }
    return nameArray.join(' ');
  },
};
