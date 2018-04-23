


function arraysToJars(post) {
  var image;
  var htmlstring ="";
	for(var i = 0; i < 6; i++) {
        if(post.data[i].images !== undefined){
            image = post.data[i].images["0"].link;
            console.log(image);
            htmlstring +="<img src='" + image + "' alt='cookie1' class='cookieimg'>";
        }

  $('#imgurContainer').html(htmlstring);
    }
}

/**
 * Search function
 * @param query the searching string
 */
function searchbar(query) {
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
			console.log(response);
		}
	})
}

$(function(){
$('#searchbar').on("change", function(){
	searchbar($(this).context.value);
})
});
