// Loads 

var Gema = {}


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
	
	self.Prism.fileHighlight();

	Gema.examples = {}
	Gema.hidden = {}
	
	$(".hide-show").click(function() {
		var id = $(this).attr('name')
		if (Gema.hidden[id] == null) {
			Gema.hidden[id] = false
		}  
		if (Gema.hidden[id]) {
			$(this).html('Mostrar') 
			$('#' + id).hide()
			Gema.hidden[id] = false
		} else {
			$(this).html('Esconder')
			$('#' + id).show()
			Gema.hidden[id] = true
		}
	});
	
	$(".run-example").click( function() {
		var id = $(this).parent().attr('id')
		if (Gema.examples[id]) {
			alert(Gema.examples[id])
		} else {
			alert("Didn't Have")
			Gema.examples[id] = true
		}
		// This runs each graph example 
		// $("#" + id).html('WOW!!!')
	});
});

