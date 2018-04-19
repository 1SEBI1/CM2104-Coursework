


function arraysToJars(arrays) {
  var jars = new Array(10);
	for(var i = 0; i < 10; i++) {
    jars[i] = arrays.jars.items[i].images;
  }
  return jars;
}

var cookieJar;
function cookie(jars){
	cookieJar = "<table> \n";
	/*for(var i = 0; i < jars.length; i++){
		cookieJar += "<td class='tbl-img'><img src='" + jars[i].album.images[2].url + "'></img></td>";
		cookieJar += "</tr> \n";
	}*/
		cookieJar += "<td class='tbl-img'><img src='" + jars[i].id + "'></img></td>";
	cookieJar += "</table>";

	$('#contents').html(cookieJar)
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
		url: 'https://api.imgur.com/3/gallery/search?q='+ query + '&type=images',
		headers: {
			'Authorization' : 'Client-ID 2984ccc930c582a'
		},
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
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
