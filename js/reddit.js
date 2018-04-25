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
      success: function(response) {
        if(response.icon_img && response.name){
          $('#user-img').html("<img src='" + response.icon_img + "' height='25px' alt='cookie1' class='user'>");
          $('#user-msg').html("Hello, " + response.name);
        }
        $('#login-button').hide();
        $('#logout-button').show();
        /*searchbar("asd");
        $.getScript('../js/imgur.js', function () {
        searchbar("asd");
      });*/
    },
    error: function() {
      localStorage.clear();
      $('#login-button').show();
      $('#logout-button').hide();
    }
  });
} else{

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
        localStorage.clear();
      },

      success: function(resp) {
        console.log("success");
        if(resp.access_token !== undefined){
          localStorage.setItem('access_token', resp.access_token);
        }
        $('#login-button').show();
        $('#logout-button').hide();
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa("8HTwhfqsM1aUSw:f-vjK_e5vZym9PY9orsA4-qi2ks")); // I used my client_id and client_secret
      }
    });
  }



  function redditToJars(post) {
    var htmlstring ="";
    var image;
    var href;

    for(var i = 0, j = 0; i < 20, j < 6; i++) {
      if(post[i].preview !== undefined){
        image = post[i].preview.images[0].source.url;
        href = post[i].permalink;
        //console.log(post[i].preview.images[0].source.url);
        htmlstring +="<img src='" + image + "' href=https://www.reddit.com" + href + "' alt='cookie1' class='cookieimg'>";
        j++;
      }
      $('#redditContainer').html(htmlstring);
      console.log(htmlstring);
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
        console.log(newData);
      },
      error: function(response) {
        localStorage.clear();
        console.log(response);
      }
    })
  }

  $(function(){
    $('#searchbar').on("change", function(){
      searchbar($('#searchbar').val());
    });
  });;


  $('#logout-button').click(function(){
    localStorage.clear();
    window.location = 'http://zigzag-susan.codio.io/CM2104-Coursework/%2Fhtml/my.html';
    localStorage.clear();
    console.log("LOG OUT");
    $('#login-button').show();
    $('#logout-button').hide();
    $('#user-msg').html("");
  })

  //Login function activated by pressing the login button
  $('#login-button').click(function(){
    var client_id = '8HTwhfqsM1aUSw';
    var redirect_uri = 'http://zigzag-susan.codio.io/CM2104-Coursework/%2Fhtml/my.html';
    $('#login-button').hide();
    $('#logout-button').show();

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
