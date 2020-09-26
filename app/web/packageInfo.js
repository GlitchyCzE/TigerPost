// JavaScript source code
//document.username for admin name
$(document).ready(function () {
    $("#welcome")[0].innerText = "Welcome, " + document.cookie.substr(9)
    $(".btn btn-primary").click(function (event) {
        event.preventDefault();
        var tid = $("#trackingID").val();
        var name = $("#name").val();
        var address = $("#address").val();
        $.post("action/createPackage", {
            tid: tid,
            to: name,
            address: address
        }, function (response) {
                if (response.error) {
                    alert("Could not create package: " + response.msg);
                    window.location = "error.html";
                }
        });
    });
    $("#logout").click(function (event) {
        event.preventDefault();
        $.post("action/logout");
        window.location = "index.html";
    })
});