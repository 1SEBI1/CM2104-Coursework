$(function(){
  $('#searchbar').on("change", function(){
  searchbar($(this).context.value);
  searchquery = $('#searchbar').val();
  });
/*  $("#tempobject-").click(function(){
      /*  #tempobject.substr(0, 11)
        console.log(JSON.stringify(tempobject))
        console.log("click");
    });*/

    $('img').click(function() {
      console.log("click");
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            console.log("selected");
        }
        else {
            $(this).addClass('selected');
            console.log("deselected");
        }
    });


});

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

    console.log("temp"+count+" = " +tempobject[count]);
    if(typeof arrays.data[imgcount] === 'undefined') {break; } //if image data array undefined break
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
          //console.log("array : " + arrays.data[imgcount].images[imagesno].title);
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
    console.log("count : " + count);
    }
    htmlstring +="</div>"

  }
  htmlstring +="</div>"
  console.log("imgtemp length" + tempobject.length);
  $('#imgurContainer').html(htmlstring);
  //return jars;
}








/**
 * Search function
 * @param query the searching string
 */
function searchbar(query) {

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
			console.log(response);
		}
	});
}
