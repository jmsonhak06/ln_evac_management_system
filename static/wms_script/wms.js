
var wmsServer = "http://localhost:8081/geoserver/ln_evac/wms";

var admin_boundrs_province = L.tileLayer.wms(wmsServer, {
    layers: 'ln_evac:car_munici',
    format: 'image/png',
    transparent: true,
    attribution: "sample attribute"
});

var layersArray = [
					'ln_evac:car_munici',
					'ln_evac:caraga_soil',
					'ln_evac:fuzzy_suitareas',
					'ln_evac:rrl_suitareas',
					'ln_evac:lasnieves_floodhazard_100year',
					'ln_evac:lasnieves_floodhazard_10year',
					'ln_evac:lasnieves_floodhazard_15year',
					'ln_evac:lasnieves_floodhazard_20year',
					'ln_evac:lasnieves_floodhazard_25year',
					'ln_evac:lasnieves_floodhazard_2year',
					'ln_evac:lasnieves_floodhazard_50year',
					'ln_evac:lasnieves_floodhazard_5year',
					'ln_evac:ln_affectedbldgs_100year',
					'ln_evac:ln_affectedbldgs_10year',
					'ln_evac:ln_affectedbldgs_15year',
					'ln_evac:ln_affectedbldgs_20year',
					'ln_evac:ln_affectedbldgs_25year',
					'ln_evac:ln_affectedbldgs_2year',
					'ln_evac:ln_affectedbldgs_50year',
					'ln_evac:ln_affectedbldgs_5year',
					'ln_evac:ln_bldgs',
					'ln_evac:ln_boundary',
					'ln_evac:ln_candidates',
					'ln_evac:ln_capacity10m2',
					'ln_evac:ln_capacity5m2',
					'ln_evac:ln_existevac'
				];



function findLayer(layer){
	for (var i = 0; i < layersArray.length; i++) {
		var data =  layersArray[i].split(":");
		if (data[1] == layer) {
			addConfigLayer(layersArray[i], layer)
			break;
		}
	}
}

var used_layers = [];

function addConfigLayer(_layers,layer_n){
	console.log(used_layers)
	if (used_layers.length!=0) {
		for (var i = 0; i < used_layers.length; i++) {
			console.log(used_layers[i].layer_n.options.layers.split(":")[1] ,"::::", layer_n)
			if (used_layers[i].layer_n.options.layers.split(":")[1] == layer_n) {
				console.log("remove layer")
				map.removeLayer(used_layers[i].layer_n);
				var layerIndex = used_layers.indexOf(used_layers[i])
				delete used_layers[i].layer_n;
				used_layers.splice(layerIndex,1)
				console.log(used_layers)
			}else if (used_layers.length - 1 == i) {
				console.log("added")
				var _layer_n = layer_n;
				layer_n = L.tileLayer.wms(wmsServer, {
					layers: _layers,
					format: 'image/png',
					transparent: true,
					attribution: "sample attribute"
				});

				_layer_n = {layer_n}
				used_layers.push(_layer_n);
				layer_n.addTo(map);
				console.log(used_layers, " data added")
				break;	
			}
			
		}
	}else{
		console.log("adding data down")
		var _layer_n = layer_n;
		layer_n = L.tileLayer.wms(wmsServer, {
		    layers: _layers,
		    format: 'image/png',
		    transparent: true,
		    attribution: "sample attribute"
		});

		_layer_n = {layer_n}
		used_layers.push(_layer_n);
		layer_n.addTo(map);
		console.log(used_layers, " data added")
	}

}

// function add_layer(layer_name){
// 	console.log(layer_name)
// 	console.log(used_layers)
// 	if (used_layers.length!=0) {
// 		for (var i = 0; i < used_layers.length; i++) {
// 			if (used_layers[i] == layer_name.options.layers) {
// 				console.log("remove layer")
// 				map.removeLayer(layer_name);
// 				var layersIndex = used_layers.indexOf(layer_name.options.layers);
// 				used_layers.splice(layersIndex, 1);
// 				console.log(used_layers)
// 				break;
// 			}else{
// 				console.log("added")
// 				layer_name.addTo(map);
// 				used_layers.push(layer_name.options.layers)
// 				console.log(used_layers, " data added")
// 				break;
// 			}
// 		}
// 	}else{
// 		used_layers.push(layer_name.options.layers)
// 		layer_name.addTo(map);
// 		console.log(used_layers, " data added")
// 	}


// }