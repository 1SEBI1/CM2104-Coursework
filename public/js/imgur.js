//funtion that gets the value from the searchbar
$(function(){
  $('#searchbar').on("change", function(){
    searchbar($(this).context.value);
    searchquery = $('#searchbar').val();
  });
});

//function that displays the Imgur images on the jars
function arraysToJars(arrays) {
  var stopcrash =0;
  var count =0;
  var imagesno = 0;
  var jars = [];
  tempobject = [];
  var imgcount =0;
  var htmlstring ="";
  htmlstring +="<div class='row'>";
  for(var i = 0; i < 4; i++) {
    htmlstring +="<div class='column'>";

    for(var y = 0; y < 3; ) {
      var imglink;
      //if image data array undefined break
      if(typeof arrays.data[imgcount] === 'undefined') {break; }
      if(typeof arrays.data[imgcount].images === 'undefined') {
        jars[imgcount] = arrays.data[imgcount].link;
        imglink = jars[imgcount];
        if((imglink.includes(".mp4"))==false){
          tempobject[count] = {link:imglink, query:searchquery};
          htmlstring +="<img src='" + imglink+ "' alt='cookie1' id=tempobject-"+count+" class='cookieimg' style='width:100%'>";
          count +=1;
          y+=1;

        }else{//skip display for mp4
          stopcrash +=1;
          if (stopcrash >50) { break; }
        }
        imgcount +=1;
      }else{
        jars[imgcount] = arrays.data[imgcount].images[imagesno].link;
        imglink = jars[imgcount];
        if(arrays.data[imgcount].images.length == imagesno+1){
          imagesno = 0;

          if((imglink.includes(".mp4"))==false){
            tempobject[count] = {link:imglink, query:searchquery};
            htmlstring +="<img src='" + imglink+ "' alt='cookie1' id=tempobject-"+count+" class='cookieimg' style='width:100%'>";
            count +=1;
            y+=1;
          }else{//skip display for mp4
            stopcrash +=1;
            if (stopcrash >50) { break; }
          }
          imgcount +=1;
        }else{
          imagesno +=1;
          if((imglink.includes(".mp4"))==false){
            tempobject[count] = {link:imglink, query:searchquery};
            htmlstring +="<img src='" + imglink+ "' alt='cookie1' id=tempobject-"+count+" class='cookieimg' style='width:100%'>";
            count +=1;
            y+=1;
          }else{//skip display for mp4
            stopcrash +=1;
            if (stopcrash >50) { break; }
          }
        }

      }
      if (count >50) { break; }
    }
    htmlstring +="</div>"

  }
  htmlstring +="</div>"
  //convert to html and send to the imgurContainer
  $('#imgurContainer').html(htmlstring);

}

//function that displays the flickr images
function flickrToJars(arrays) {
  var htmlstring ="";
  var image = "";

  htmlstring +="<div class='row'>";
  for(var i = 0,x = 0; i < 4, x < 12; i++) {
    htmlstring +="<div class='column'>";
    for(var j = 0; j < 3; j++) {
      image = arrays.items[x].media.m;
      htmlstring +="<img src='" + image + "' alt='cookie1' class='cookieimg' style='width:100%'>";
      x++;
    }
    htmlstring +="</div>"
  }
  htmlstring +="</div>"
  //convert to html and send to the Container
  $('#redditContainer').html(htmlstring);
}

/**
* Search function
* @param query the searching string
*/
function searchbar(query) {
  //imgur search querry
  $.ajax({
    url: 'https://api.imgur.com/3/gallery/search?q='+ query,
    headers: {
      'Authorization' : 'Client-ID 2984ccc930c582a'
    },
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      //call display function
      console.log(arraysToJars(data));
    },
    error: function(response) {
      console.log(response);
    }
  });

  //flickr search querry
  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: query,
    tagmode: "any",
    format: "json"
  },
  function(data) {
    //call display function
    console.log(flickrToJars(data));
  });

}
