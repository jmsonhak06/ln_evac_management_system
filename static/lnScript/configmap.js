var googleMapSat = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
	googleMapHybrid = 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
	bingKey = 'AlP6kLmTRsjcDQtXkmc24a-TUQ8UU2-u3DghMCIWc-emHys9AFEa_w_AxgJFFpHI',
	openStreet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    googleMap= 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}';

//Creation of map tiles
var gMApSat = new L.tileLayer(googleMapSat,{subdomains: ['mt0','mt1','mt2','mt3'],maxZoom: 20,attribution:'Google Satellite'}),
	gMApHy = new L.tileLayer(googleMapHybrid,{subdomains: ['mt0','mt1','mt2','mt3'],maxZoom: 20, attribution:'Google Satellite Hybrid'}),
	openStrt = new L.tileLayer(openStreet,{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
    gmap = new L.tileLayer(googleMap,{attribution: 'Google Map'});
   