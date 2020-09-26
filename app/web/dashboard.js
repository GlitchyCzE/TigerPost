// JavaScript source code
$(document).ready(function () {
    $.post("action/getPackages", {},
        function (packages) {
            for (var i = 0; i < packages.length; i++) {
                var markup = "<td>" + packages[i].tid + "</td><td>" + packages[i].to + "</td><td>" + packages[i].address + "</td><td>" + packages[i].time_scanned_in + "</td><td>";
                if (packages[i].checkout_time == null) {
                    $("#ready tbody").append(markup + "Ready for Pickup</td>");
                } else {
                    $("#archive tbody").append(markup + "Picked up</td>");
                }
            }
            $("#ready #dummyRow").remove();
        });
    $(".btn btn-primary btn-block btn-sm").click(function () {
        $.post("action/logout")
        window.location("index.html")
    });
});