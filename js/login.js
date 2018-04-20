var stateKey = 'reddit_auth_state'; // localStorage key for auth state

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

//main function that runs everytime the page is accessed to check if the user is logged in or not
$(function(){
  if (localStorage.getItem('access-token')) {
    $.ajax({
      url: 'https://www.reddit.com/api/v1/me',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      },
      success: function() {
        window.location = 'file:///C:/Users/1607145/Desktop/CM2104-Coursework/html/my.html';
      },
      error: function() {
        localStorage.clear();
        $('#loading').hide();
        $('#login-page').show();
      }
    });
  } else if(localStorage.getItem(stateKey) == getHashParams().state && getHashParams().state) {
    localStorage.setItem('access_token', getHashParams().access_token);
    window.location = 'file:///C:/Users/1607145/Desktop/CM2104-Coursework/html/my.html';
  } else {
    $('#loading').hide();
    $('#login-page').show();
  }
});

//Login function activated by pressing the login button
$('#login-button').click(function(){
  var client_id = '8HTwhfqsM1aUSw';
  var redirect_uri = 'file:///C:/Users/1607145/Desktop/CM2104-Coursework/html/my.html';

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  var state = generateRandomString(16);
  localStorage.setItem(stateKey, state);

  var scope = '*';

  var url = 'https://www.reddit.com/api/v1/authorize';
  url += '?client_id=' + encodeURIComponent(client_id);
  url += '&response_type=token';
  url += '&state=' + encodeURIComponent(state);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&duration=temporary';
  url += '&scope=' + encodeURIComponent(scope);

  window.location = url;
});
