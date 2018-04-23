$(function(){
  $('#searchbar').on("change", function(){
  searchbar($(this).context.value);
  });
});

function arraysToJars(arrays) {
  var stopcrash =0;
  var count =0;
  var imagesno = 0;
  var jars = [];
  var imgcount =0;
  var htmlstring ="";
  htmlstring +="<div class='row'>";
for(var i = 0; i < 4; i++) {
  console.log("i ="+i);
  htmlstring +="<div class='column'>";

  for(var y = 0; y < 3; ) {
    var imglink;
    if(typeof arrays.data[imgcount].images === 'undefined') {
        jars[imgcount] = arrays.data[imgcount].link;

        imglink = jars[imgcount];

        imgcount +=1;
        console.log("imglink = " +imglink);
        if((imglink.includes(".mp4"))==false){
          htmlstring +="<img src='" + imglink+ "' alt='cookie1' class='cookieimg' style='width:100%'>";
          y+=1;

        }else{
          console.log("mp4 detected1 =" + imglink);
          stopcrash +=1;
          if (stopcrash >50) { break; }
        }

    }else{
      jars[imgcount] = arrays.data[imgcount].images[imagesno].link;
        imglink = jars[imgcount];
      if(arrays.data[imgcount].images.length == imagesno+1){
        imagesno = 0;
        imgcount +=1;
        if((imglink.includes(".mp4"))==false){
          htmlstring +="<img src='" + imglink+ "' alt='cookie1' class='cookieimg' style='width:100%'>";
          y+=1;
        }else{
          console.log("mp4 detected2 =" + imglink);
          stopcrash +=1;
          if (stopcrash >50) { break; }
        }
      }else{
        imagesno +=1;
        if((imglink.includes(".mp4"))==false){
          htmlstring +="<img src='" + imglink+ "' alt='cookie1' class='cookieimg' style='width:100%'>";
          y+=1;
        }else{
          console.log("mp4 detected3 =" + imglink);
          stopcrash +=1;
          if (stopcrash >50) { break; }
        }
      }

    }
          console.log("stopcrash count: ="+stopcrash);
    }
    htmlstring +="</div>"


  }
  htmlstring +="</div>"

  $('#imgurContainer').html(htmlstring);
  //return jars;
}








/**
 * Search function
 * @param query the searching string
 */
function searchbar(query) {
  $('#searchbar').val("");
$(document).ready(function(){
    $( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
    });
});
$.ajax({
url: 'https://api.imgur.com/3/gallery/search?q='+ query,
headers: {
'Authorization' : 'Client-ID 2984ccc930c582a'
},
type: 'GET',
dataType: 'json',
success: function(data) {
console.log(data);
      console.log(arraysToJars(data));
},
error: function(response) {
console.log('not-cool');
}
});
}
