function getCode(currentURL) {
  var str = currentURL;
  var code = str.slice(str.length-27);

  return code;
}



//main function that runs everytime the page is accessed to check if the user is logged in or not
$(function(){
  if (localStorage.getItem('access_token')) {
    $.ajax({
      url: 'https://oauth.reddit.com/api/v1/me',
      headers: {
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      },
      success: function(resp) {
        $('#logout-button').click(function(){
            localStorage.clear();
          })
        console.log(localStorage);
        console.log(resp);
        /*searchbar("asd");
        $.getScript('../js/imgur.js', function () {
        searchbar("asd");
      });*/
    },
    error: function() {
      localStorage.clear();
    }
  });
} else {

  $.ajax({
    url: 'https://www.reddit.com/api/v1/access_token',
    type: 'POST',
    dataType: 'json',
    data: {
      code: getCode(window.location.href),
      grant_type: 'authorization_code',
      redirect_uri: 'http://zigzag-susan.codio.io/CM2104-Coursework/%2Fhtml/my.html'},

      error: function(xhr) {
        console.log("access token request failed");
      },

      success: function(resp) {
        console.log("success");
        localStorage.setItem('access_token', resp.access_token);
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa("8HTwhfqsM1aUSw:f-vjK_e5vZym9PY9orsA4-qi2ks")); // I used my client_id and client_secret
      }
    });
  }


  function redditToJars(post) {
    var htmlstring ="";
    var image;

    for(var i = 0, j = 0; i < 20, j < 6; i++) {
      if(post[i].preview !== undefined){
        image = post[i].preview.images[0].source.url;
        //console.log(post[i].preview.images[0].source.url);
        htmlstring +="<img src='" + image + "' alt='cookie1' class='cookieimg'>";
        j++;
      }
      $('#redditContainer').html(htmlstring);
    }
  }


    /**
    * Search function
    * @param query the searching string
    */
    function searchbar(query) {
      var newData;
      $('#searchbar').val("");

      $.ajax({
        url: 'https://oauth.reddit.com/search.json?q='+ query + '&sort=hot',
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          newData = data.data.children.map(data => data.data);
          console.log(redditToJars(newData))
        },
        error: function(response) {
          console.log(response);
        }
      })
    }

    $(function(){
      $('#searchbar').on("change", function(){
        searchbar($('#searchbar').val());
      });
    });;


    //Login function activated by pressing the login button
    $('#login-button').click(function(){
      var client_id = '8HTwhfqsM1aUSw';
      var redirect_uri = 'http://zigzag-susan.codio.io/CM2104-Coursework/%2Fhtml/my.html';

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

      var scope = '*';


      var url = 'https://www.reddit.com/api/v1/authorize.compact';
      url += '?client_id=' + encodeURIComponent(client_id);
      url += '&response_type=code';
      url += '&state=' + encodeURIComponent(state);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&duration=permanent';
      url += '&scope=' + encodeURIComponent(scope);

      window.location = url;

    });
  });
