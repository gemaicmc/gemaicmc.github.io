// Loads 


$(document).ready(function(){
	$('#gema-table').html('FANCY TABLE~')
	$.get('table/gema_table', function(data) {
		alert(data)
	})
});

