// JavaScript source code
$(document).ready(function() {
    $(".login").click(function () {
        var user = $("#user")
        var pass = $("#pass")
        $.post("action/login", {
            username: user,
            password: pass
        });
    });
});