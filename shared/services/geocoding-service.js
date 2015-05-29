angular.module('instagramApp').service('GeocodingService', function($http, $q) {

	var base_url = 'https://maps.googleapis.com/maps/api/geocode/json',
		api_key = 'AIzaSyCkCz0iDE_BDgS1D1GZ13VcC859cHdOEWs';

	// address format: address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

	this.getLatAndLng = function(address) {
		var url = base_url + '?address=' + address + '&key=' + api_key;
		
		var deferred = $q.defer();

		$http.get(url).success(function(results) {
			var data = results || [];
			deferred.resolve(data);
		}).error(function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};
});