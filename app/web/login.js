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
                    alert(msg.msg);
                    window.location = "error.html";
                } else {
                    if ($("#username")[0].value == "user") {
                        window.location = "dashboard.html"
                    } else {
                        window.location = "admin.html";
                    }
                }
        });
    });
});