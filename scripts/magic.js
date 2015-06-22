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
			// console.log(lines[i])
			var fields = lines[i].split(" ")
			for (var j = 0; j < fields.length; ++j) {
				var tableCell = $('<td>').appendTo(tableLine)
				tableCell.html(fields[j])
			}
		}
	})

	$.wait = function(ms) {
	    var defer = $.Deferred();
	    setTimeout(function() { defer.resolve(); }, ms);
	    return defer;
	};

	self.Prism.fileHighlight();

	Gema.examples = {}
	Gema.hidden = {}
	Gema.animations = {}
	
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

	$(".redraw").click( function() {
		var id = $(this).attr('name')
		Gema.networks[id] = 
			Gema.drawGraph(Gema.graphs[id], id)
	})


	Gema.animate = function (id, idx) {
		if (idx == Gema.animations[id].length) {
			return
		}
		var animation = Gema.animations[id][idx];
		animation['func'].apply(animation['this'], animation['params'])
		setTimeout(function(){
			Gema.animate(id, idx + 1)
		}, 500);
	}

	Gema.focusNode = function(id, node, opt) {
		Gema.animations[id].push({
			'this': Gema.networks[id],
			'func': Gema.networks[id].focus,
			'params': [ node, opt ]
		})
	}

	Gema.colorNode = function(id, node, currColor) {
		Gema.animations[id].push({
			'this': Gema.nodes[id],
			'func': Gema.nodes[id].update,
			'params': [{id: node, color: { background: currColor} }]
		})
	}

	Gema.colorEdge = function(id, i, currColor) {
		Gema.animations[id].push ({
			'this': Gema.edges[id],
			'func': Gema.edges[id].update,
			'params': [ {id : i + 1, color: currColor}]
		})
		// Gema.graphs[id].edges[i]['color'] = currColor
	}

	Gema.scaleEdge = function(id, i, val) {
		Gema.animations[id].push ({
			'this': Gema.edges[id],
			'func': Gema.edges[id].update,
			'params': [ {id : i + 1, value: val}]
		})
	}


	Gema.dfs = function(id, node) {
		// Options! ~
		var currColor = '#A6E9B1';
		var preColor =  '#99CCFF';
		var inColor  = '#D1956D'
		var posColor = '#989292'
		var options = {
			scale: 1.05,
			animation: {
				duration: 600
			}
		}

		Gema.vis[node] = true

		for (var i = 0; i < Gema.graphs[id].edges.length; ++i) {
			var edge = Gema.graphs[id].edges[i]
			
			if ((edge['from'] != node) && (edge['to'] != node)) { 
				continue;
			}

			//  Current node is now red
			Gema.colorNode(id, node, currColor)
			// Focus current node	
			Gema.focusNode(id, node, options)

			// Change the edge color
			var oldColor = Gema.graphs[id].edges[i]['color']
			Gema.colorEdge(id, i, currColor)
			var value = Gema.graphs[id].edges[i]['value']
			if (value != 1) {
				Gema.scaleEdge(id, i, 1)
			}
			
			var to = edge['to']
			if (to == node) {
				to = edge['from']
			}

			if (Gema.vis[to] == null) {
				Gema.colorNode(id, node, inColor)
				Gema.colorEdge(id, i, inColor)
				Gema.graphs[id].edges[i]['color'] = inColor
				Gema.dfs(id, to)
				Gema.colorEdge(id, i, posColor)
				Gema.graphs[id].edges[i]['color'] = posColor
			} else {
				if (oldColor != preColor) {
					Gema.colorEdge(id, i, oldColor)
				} else {
					Gema.colorEdge(id, i, posColor)
				}
			}
			Gema.graphs[id].edges[i]['color'] = preColor
		}

		Gema.focusNode(id, node, options)
		Gema.colorNode(id, node, posColor)
	}
	
	$(".run-example").click( function() {
		var id = $(this).attr('name')
		if (Gema.examples[id]) {
			// False : Exemplo não rodou ainda
			Gema.examples[id] = false
		} 	
		// This runs each graph example 
		if (id == 'exemplo3') {
			Gema.animations[id] = []
			Gema.vis = {}
			Gema.dfs(id, 1)
			// After all, animate!
			Gema.animate(id, 0)
		}
	});
	
	Gema.networks = {}
	Gema.graphs = {}
	Gema.nodes = {}
	Gema.edges = {}
	Gema.graphs['exemplo1'] = {}
	// Exemplo 1
	Gema.graphs['exemplo1'].nodes = [
		{ id: 1, label: '1', color: '#99CCFF'},
		{ id: 2, label : '2', color: '#99CCFF' },
		{ id: 3, label: '3', color: '#99CCFF' }
	]
	Gema.graphs['exemplo1'].edges = [
		{ from: 1, to: 2 },
		{ from: 2, to: 3 }
	]
	// Exemplo 2
	Gema.graphs['exemplo2'] = {}
	Gema.graphs['exemplo2'].nodes = [
		{ id: 1, label: '1', color: '#99CCFF'},
		{ id: 2, label : '2', color: '#99CCFF' },
		{ id: 3, label: '3', color: '#99CCFF' }
	]
	Gema.graphs['exemplo2'].edges = [
		{ from: 1, to: 2, arrows : 'to' },
		{ from: 2, to: 3, arrows :  'to' }
	]
	
	// Exemplo 3
	Gema.graphs['exemplo3'] = {}
	Gema.graphs['exemplo3'].nodes = [
		{ id: 1, label: '1', color: '#99CCFF'},
		{ id: 2, label: '2', color: '#99CCFF' },
		{ id: 3, label: '4', color: '#99CCFF' },
		{ id: 4, label: '5', color: '#99CCFF' },
		{ id: 5, label: '6', color: '#99CCFF' },
		{ id: 6, label: '7', color: '#99CCFF' },
		{ id: 7, label: '8', color: '#99CCFF' },
		{ id: 8, label: '9', color: '#99CCFF' },
		{ id: 9, label: '10', color: '#99CCFF' }
	]
	Gema.graphs['exemplo3'].edges = [
		{ id: 1, from: 1, to: 2  },
		{ id: 2, from: 2, to: 3  },
		{ id: 3, from: 4, to: 3  },
		{ id: 4, from: 2, to: 5  },
		{ id: 5, from: 5, to: 3  },
		{ id: 6, from: 1, to: 7  },
		{ id: 7, from: 7, to: 5 },
		{ id: 8, from: 2, to: 7 },
		{ id: 9, from: 9, to: 7 },
		{ id: 10, from: 4, to: 6   },
		{ id: 11, from: 3, to: 6   },
		{ id: 12, from: 6, to: 8  }
	]
	

	Gema.drawGraph = function(graph, containerId) {
		var nodes = new vis.DataSet(graph.nodes) 
		var edges = new vis.DataSet(graph.edges)
		var container = $('#' + containerId)
		container = document.getElementById(containerId)
		var data = {
			nodes: nodes,
			edges: edges
		}
		var options = {
			
			edges: {
				smooth: false,
			},
			interaction: { hover: true }
		}

		Gema.nodes[containerId] = nodes
		Gema.edges[containerId] = edges
		var network = new vis.Network(container, data, options)
		return network
	}
	 
	Gema.drawGraph(Gema.graphs['exemplo1'], 'exemplo1')
	Gema.drawGraph(Gema.graphs['exemplo2'], 'exemplo2')
	Gema.networks['exemplo3'] = 
		Gema.drawGraph(Gema.graphs['exemplo3'], 'exemplo3')
});
