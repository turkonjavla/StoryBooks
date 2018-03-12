const moment = require("moment");

module.exports = {
    stripTags: function(input) {
        return input.replace(/<(?:.|\n)*?>/gm, "");
    },
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    select: function(selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), 'selected="selected"$&');
    }
}