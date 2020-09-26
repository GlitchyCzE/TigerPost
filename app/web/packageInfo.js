// JavaScript source code
//document.username for admin name
$(document).ready(function () {
    $(".btn btn-primary").click(function () {
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
                    window.location("error.html");
                }
        });
    });
    $(".btn btn-primary btn-block btn-sm").click(function () {
        $.post("action/logout")
        window.location("index.html")
    })
});