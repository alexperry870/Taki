Date.subtractMinutes = function (start) {
    var end = new Date();
    var diffMs = (end - start); // milliseconds 
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var res = diffMins + (diffHrs * 60) + (diffDays *60 * 24); 
    return res;
};
Date.subtractSeconds = function (start) {
    var end = new Date();
    var diffMs = (end - start); // milliseconds 
    var res = diffMs / 1000;
    return res;
};