// JavaScript source code
$(document).ready(function () {
    $("#welcome")[0].innerText = "Welcome, " + document.username
    $.post("action/getPackages", {},
        function (data) {
            let packages = data.data
            for (var i = 0; i < packages.length; i++) {
                var markup = "<tr><td>" + packages[i].pid + "</td><td>" + packages[i].tid + "</td><td>" + packages[i].to + "</td><td>" + packages[i].address + "</td><td>" + packages[i].time_scanned_in + "</td><td>" + packages[i].scanned_in_by + "</td><td>" + packages[i].stored_in + "</td><td>" + packages[i].checkout_by + "</td><td>" + packages[i].checkout_time + "</td></tr>";
                $("#ready tbody").append(markup);
            }
            $("#ready #dummyRow").remove();
        });
    $("#logout").click(function (event) {
        event.preventDefault();
        $.post("action/logout");
        window.location = "index.html";
    });
});