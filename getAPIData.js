const regex = /(https?:\/\/[^\s]+)/g;

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
        var formattedDate = new Date(item.date_str).toLocaleDateString(); // format the date
      } else {
        var formattedDate = new Date(item.t0).toLocaleDateString();
      }
    }
    else {
      var formattedDate = new Date(item.win_open).toLocaleDateString(); // format the date
    }
    string = item.quicktext;
    url = string.match(regex)[0];
    statusHTML += '<tr>';
    statusHTML += '<td>' + '<a href='+ url +'>' + item.name + '</a>' + '</td>';
    statusHTML += '<td>' + item.provider.name + '</td>';
    statusHTML += '<td>' + item.pad.name + ', ' + item.pad.location.country + '</td>';
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

var rows = document.querySelectorAll("#rocketTable tr");
console.log(rows)
for (const row of rows){
  var statusCell = row.querySelector('.stateLocation');
  var state = statusCell.textContent;
  console.log(state);
  if (state === 'FL') {
    row.classList.add('fromFlorida');
  }
}
