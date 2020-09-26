// JavaScript source code
$(document).ready(function () {
    $("#welcome")[0].innerText = "Welcome, " + document.cookie.subsr(9)
    $.post("action/getPackages", {},
        function (data) {
            let packages = data.data;
            for (var i = 0; i < packages.length; i++) {
                var markup = "<tr></tr><td>" + packages[i].tid + "</td><td>" + packages[i].to + "</td><td>" + packages[i].address + "</td><td>" + packages[i].time_scanned_in + "</td><td>";
                if (packages[i].checkout_time == null) {
                    $("#ready tbody").append(markup + "Ready for Pickup</td></tr>");
                } else {
                    $("#archive tbody").append(markup + "Picked up</td></tr>");
                }
            }
            $("#ready #dummyRow").remove();
        });
    $("#logout").click(function (event) {
        event.preventDefault();
        $.post("action/logout");
        window.location = "index.html";
    });
});