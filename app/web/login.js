// JavaScript source code
$(document).ready(function() {
    $(".btn btn-primary btn-block").click(function () {
        var user = $("#username")
        var pass = $("#password")
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