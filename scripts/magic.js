// Loads 


$(document).ready(function(){
	var tableDiv = $('#gema-table')
	var table = $('<table>').appendTo(tableDiv) 
	console.log(table)
	// var text = ''
	$.get('table/gema_table', function(data) {
		var lines = data.split('\n')
		console.log(lines.length)
		for (var i = 0; i < lines.length - 1; ++i) {
			var tableLine = $('<tr>').appendTo(table)
			console.log(lines[i])
			var fields = lines[i].split(" ")
			for (var j = 0; j < fields.length; ++j) {
				var tableCell = $('<td>').appendTo(tableLine)
				tableCell.html(fields[j])
			}
		}
	})
});

