
function init(target) {

    target.each(function () {

        var map = $(this);
        var map_id = map.attr('id');
        var map_type = map.data('map-type');
        var map_from_lat = map.data('map-from-lat');
        var map_from_lon = map.data('map-from-lon');
		var map_to_lat = map.data('map-to-lat');
        var map_to_lon = map.data('map-to-lon');
        var map_zoom = parseInt(map.data('map-zoom'));
        var map_pin = map.data('map-pin');
        var map_title = map.data('map-title');
        var map_info = map.data('map-info');
        var map_scroll = map.data('map-scroll');
        var map_drag = map.data('map-drag');
        var map_zoom_control = map.data('map-zoom-control');
        var map_disable_doubleclick = map.data('map-disable-doubleclick');
        var map_streetview = map.data('map-streetview');
        var latlng_from = new google.maps.LatLng(map_from_lat, map_from_lon);
        var options = {
            scrollwheel: map_scroll,
            draggable: map_drag,
            zoomControl: map_zoom_control,
            disableDoubleClickZoom: map_disable_doubleclick,
            zoom: map_zoom,
            center: latlng_from,
            streetViewControl: map_streetview
        };
		
        switch (map_type) {
            case 'HYBRID':
                options.mapTypeId = google.maps.MapTypeId.HYBRID;
                break;
            case 'ROADMAP':
                options.mapTypeId = google.maps.MapTypeId.ROADMAP;
                break;
            case 'SATELLITE':
                options.mapTypeId = google.maps.MapTypeId.SATELLITE;
                break;
            case 'TERRAIN':
                options.mapTypeId = google.maps.MapTypeId.TERRAIN;
                break;
        }

        map = new google.maps.Map(document.getElementById(map_id), options);
		
		if (map_to_lat && map_to_lon) {
			var latlng_to = new google.maps.LatLng(map_to_lat, map_to_lon);
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			
			directionsDisplay.setMap(map);
			
			directionsService.route({
				origin: latlng_from,
				destination: latlng_to,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		} else if (map_pin) {
            var marker = new google.maps.Marker({
                position: latlng_from,
                map: map,
                title: map_title,
                icon: map_pin
            });

            if (map_info) {
                var infowindow = new google.maps.InfoWindow({
                    content: map_info
                });


                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
            }
        }
    });

}

module.exports = {
    init: init
};