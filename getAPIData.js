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
    $.each(data, function (i, launch) {
      var date = new Date(launch.win_open); // parse the date string
      var formattedDate = date.toLocaleDateString(); // format the date
      statusHTML += '<tr>';
      statusHTML += '<td>' + launch.name + '</td>';
      statusHTML += '<td>' + launch.vehicle.name + '</td>';
      statusHTML += '<td>' + formattedDate + '</td>'; // use the formatted date instead
      statusHTML += '</tr>';
    });
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