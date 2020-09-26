// JavaScript source code
$(document).ready(function () {
    $.post("action/getPackages", {},
        function (packages) {
            for (var i = 0; i < packages.length; i++) {
                var markup = "<td>" + packages[i].pid + "</td><td>" + packages[i].tid + "</td><td>" + packages[i].to + "</td><td>" + packages[i].address + "</td><td>" + packages[i].time_scanned_in + "</td><td>" + packages[i].scanned_in_by + "</td><td>" + packages[i].stored_in + "</td><td>" + packages[i].checkout_by + "</td><td>" + packages[i].checkout_time + "</td>";
                $("#ready tbody").append(markup);
            }
            $("#ready #dummyRow").remove();
        });
    $(".btn btn-primary btn-block btn-sm").click(function (event) {
        event.preventDefault();
        $.post("action/logout");
        window.location = "index.html";
    });
});