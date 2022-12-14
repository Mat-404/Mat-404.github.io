const regex = /(https?:\/\/[^\s]+)/g;
var options = {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

// Function to display GitHub repositories in a Bootstrap table
function displayGitHubRepos(data) {
  var statusHTML = '';
  $.each(data, function (i, status) {
    var date = new Date(status.updated_at); // parse the date string
    var formattedDate = date.toLocaleDateString(); // format the date
    statusHTML += '<tr>';
    statusHTML += '<td>' + status.name + '</td>';
    statusHTML += '<td>' + status.language + '</td>';
    statusHTML += '<td>' + formattedDate + '</td>'; // use the formatted date instead
    statusHTML += '</tr>';
  });
  $('#gitHubReposTableBody').html(statusHTML);
}

// Function to display rocket launches in a Bootstrap table
function displayRocketLaunches(data) {
  var statusHTML = '';
  for (const item of data.result) {
    if (item.win_open == null) {
      if (item.t0 == null) {
        var formattedDate = new Date(item.date_str).toLocaleString('en-US', options); // format the date
      } else {
        var formattedDate = new Date(item.t0).toLocaleString('en-US', options);
      }
    }
    else {
      var formattedDate = new Date(item.win_open).toLocaleString('en-US', options); // format the date
    }
    formattedDate = formattedDate.replace(/ at /, '<br>at ');
    string = item.quicktext;
    url = string.match(regex)[0];
    statusHTML += '<tr>';
    statusHTML += '<td>' + '<a href='+ url +' target="_blank" rel="noopener noreferrer">' + item.name + '</a>' + '</td>';
    statusHTML += '<td>' + item.provider.name + '</td>';
    statusHTML += '<td>' + item.pad.name + '<br>' + item.pad.location.country + '</td>';
    statusHTML += '<td class="stateLocation">' + String(item.pad.location.state) + '</td>';
    statusHTML += '<td>' + formattedDate + '</td>';
    statusHTML += '</tr>';
  }

  $('#rocketLaunchTableBody').html(statusHTML);
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/users/Mat-404/repos', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  displayGitHubRepos(data);
}

// Send request
request.send();

// Create a request variable and assign a new XMLHttpRequest object to it.
var otherRequest = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
otherRequest.open('GET', 'https://fdo.rocketlaunch.live/json/launches/next/5', true)

otherRequest.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  displayRocketLaunches(data);
}

// Send request
otherRequest.send();

$(document).ready(function() {
  $('.table td:nth-child(4)').each(function() {
    if ($(this).text() == 'FL') {
      $(this).parent().css('background-color', '#97dfe6');
      $(this).parent().css('font-weight', 'bold');
    }
  });
});
