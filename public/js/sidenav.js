$(document).ready(() => {
    $(".button-collapse").sideNav();
});

$(document).ready(function() {
    $('select').material_select();
});

CKEDITOR.replace("body", {
    plugins: "wysiwygarea,toolbar,basicstyles,link"
});