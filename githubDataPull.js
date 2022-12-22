// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/users/Mat-404/repos', true)

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    var statusHTML = '';
    $.each(data, function (i, status) {
        var date = new Date(status.updated_at); // parse the date string
        var formattedDate = date.toLocaleDateString(); // format the date
        statusHTML += '<tr>';
        statusHTML += '<td>' + status.name + '</td>';
        statusHTML += '<td>' + status.language + '</td>';
        statusHTML += '<td>' + formattedDate + '</td>'; // use the formatted date instead
        statusHTML += '</tr>';
        // console.log(statusHTML)
    });
    $('tbody').html(statusHTML);
}

// Send request
request.send();