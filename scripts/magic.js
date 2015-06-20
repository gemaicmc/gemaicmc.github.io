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
		var id = $(this).attr('name')
		if (Gema.examples[id]) {
			// False : Exemplo não rodou ainda
			Gema.examples[id] = false
		} 	
		// This runs each graph example 
		// $("#" + id).html('WOW!!!')
	});
	
	Gema.graphs = {}
	Gema.graphs.exemplo1 = {}
	Gema.graphs.exemplo1.nodes = [
		{ id: 1, label: '1', color: '#99CCFF'},
		{ id: 2, label : '2', color: '#99CCFF' },
		{ id: 3, label: '3', color: '#99CCFF' }
	]
	Gema.graphs.exemplo1.edges = [
		{ from: 1, to: 2 },
		{ from: 2, to: 3 }
	]
	
	Gema.drawGraph = function(graph, containerId) {
		console.log(graph.nodes)
		console.log(graph.edges)
		var nodes = new vis.DataSet(graph.nodes) 
		var edges = new vis.DataSet(graph.edges)
		var container = $('#' + containerId)
		container = document.getElementById('exemplo1')
		var data = {
			nodes: nodes,
			edges: edges
		}
		var options = {
			interaction: { hover: true }
		}
		var network = new vis.Network(container, data, options)
		return network
	}
	 
	Gema.drawGraph(Gema.graphs.exemplo1, 'exemplo1')
	  // create an array with nodes
	  	// var nodes = new vis.DataSet([
	    // {id: 1, label: 'Node 1' , color : 'red'},
	    // {id: 2, label: 'Node 2', shape : 'circle'},
	    // {id: 3, label: 'Node 3'},
	    // {id: 4, label: 'Node 4'},
	    // {id: 5, label: 'Node 5'}
	  // ]);	  
	  // // create an array with edges
	  // var edges = new vis.DataSet([
	    // {from: 1, to: 3},
	    // {from: 1, to: 2},
	    // {from: 2, to: 4},
	    // {from: 2, to: 5}
	  // ]);
});
