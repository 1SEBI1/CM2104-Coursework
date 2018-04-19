


function arraysToJars(arrays) {
  var jars = new Array(5);
  var htmlstring ="";
	for(var i = 0; i < 5; i++) {
    jars[i] = arrays.data[i].images[0].link;

    htmlstring +="<img src='" + jars[i]+ "' alt='cookie1' class='cookieimg'>"
    console.log("htmlstring ; " + htmlstring);
  }

  $('#asdContainer').html(htmlstring);
  console.log("link ; " + htmlstring);
  return jars;
}

	//$('#imgurContainer').html(cookieJar)








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
		url: 'https://api.imgur.com/3/gallery/search?q='+ query + '&type=images',
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
	})
}

$(function(){
$('#searchbar').on("change", function(){
	searchbar($(this).context.value);
})
});
