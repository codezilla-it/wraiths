
function init(target) {

    target.each(function () {

        var map = $(this);
        var map_id = map.attr('id');
        var map_type = map.data('map-type');
		var map_zoom = parseInt(map.data('map-zoom'));
		
        var map_from_lat = map.data('map-from-lat');
        var map_from_lon = map.data('map-from-lon');
		var map_from_pin = map.data('map-from-pin');
		var map_marker_from_title = map.data('map-marker-from-title');
		var map_marker_from_info = map.data('map-marker-from-info');
		
		var map_to_lat = map.data('map-to-lat');
        var map_to_lon = map.data('map-to-lon');
		var map_to_pin = map.data('map-to-pin');
		var map_marker_to_title = map.data('map-marker-to-title');
		var map_marker_to_info = map.data('map-marker-to-info');
		
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
		
		// From/To icons
		var icons = {
			from: new google.maps.MarkerImage(
				// URL
				map_from_pin,
				// (width,height)
				new google.maps.Size( 50, 50 ),
				// The origin point (x,y)
				new google.maps.Point( 0, 0 ),
				// The anchor point (x,y)
				new google.maps.Point( 25, 50 )
			),
			to: new google.maps.MarkerImage(
				// URL
				map_to_pin,
				// (width,height)
				new google.maps.Size( 50, 50 ),
				// The origin point (x,y)
				new google.maps.Point( 0, 0 ),
				// The anchor point (x,y)
				new google.maps.Point( 25, 50 )
			)
		};
		if (map_from_pin) {
			var img_from = document.createElement('img');
			img_from.src = map_from_pin;
			img_from.onload = function() {
				icons.from.size.width = this.width;
				icons.from.size.height = this.height;
				icons.from.anchor.x = this.width/2;
				icons.from.anchor.y = this.height;
			};
		}
		
		if (map_to_pin) {
			var img_to = document.createElement('img');
			img_to.src = map_to_pin;
			img_to.onload = function() {
				icons.to.size.width = this.width;
				icons.to.size.height = this.height;
				icons.to.anchor.x = this.width/2;
				icons.to.anchor.y = this.height;
			};
		}
		
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
			var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
			
			directionsDisplay.setMap(map);
			
			directionsService.route({
				origin: latlng_from,
				destination: latlng_to,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					if (map_from_pin && map_to_pin) {
						makeMarker( latlng_from, map, icons.from, map_marker_from_title, map_marker_from_info );
						makeMarker( latlng_to, map, icons.to, map_marker_to_title, map_marker_to_info );
					}
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		} else if (map_from_pin) {
			makeMarker( latlng_from, map, icons.from, map_marker_from_title, map_marker_from_info );
        }
    });
}

function makeMarker( position, map, icon, title, info ) {
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: icon,
		title: title
	});
	
	if (info) {
		var infowindow = new google.maps.InfoWindow({
			content: info
		});

		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
}

module.exports = {
    init: init
};