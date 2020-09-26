// JavaScript source code
$(document).ready(function() {
    $("#login").click(function (event) {
        event.preventDefault();
        var user = $("#username")[0].value;
        var pass = $("#password")[0].value;
        $.post("action/login", {
            username: user,
            password: pass
        }, function (msg) {
                if (msg.error) {
                    window.location("error.html")
                    alert(msg.msg)
                } else {
                    window.location("dashboard.html")
                }
        });
    });
});