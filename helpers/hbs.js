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
    },
    editIcon: function(storyUser, loggedUser, storyId, floating = true) {
        if(storyUser === loggedUser) {
            if(floating) {
                return `<a href="stories/${storyId}/edit" class="btn-floating halfway-fab amber darken-2"><i class="fa fa-pencil-alt"></i></a>`;
            }
            else {
                return `<a class="btn-floating waves-effect amber darken-2 " href="/stories/${storyId}/edit"><i class="fa fa-pencil-alt"></i></a>`;
            }
        }
        else {
            return '';
        }
    }
}