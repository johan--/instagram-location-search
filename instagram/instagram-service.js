angular.module('instagramApp').service('instagramService', function($http, $q) {

	var base_url = 'https://api.instagram.com/v1/';

	this.getPopularImages = function(nextPage) {
		var url = base_url + 'media/popular?client_id=2122e774bdd44005ba53fb84478e67d6&callback=JSON_CALLBACK';

		// make http request here
		var deferred = $q.defer();

		$http.jsonp(url).success(function(results) {
			var data = results || [];
			deferred.resolve(data);
		}).error(function(error) {
			console.log('there was an error fool: ', error);
			deferred.reject(error);
		});

		return deferred.promise;

	};


	this.getImagesByTag = function(tag, nextPage) {
		var url = base_url + 'tags/' + tag + '/media/recent?client_id=2122e774bdd44005ba53fb84478e67d6&count=50&max_tag_id=' + nextPage + '&callback=JSON_CALLBACK';

		// make http request here
		var deferred = $q.defer();

		$http.jsonp(url).success(function(results) {
			var data = results || [];
			deferred.resolve(data);
		}).error(function(error) {
			console.log('there was an error fool: ', error);
			deferred.reject(error);
		});

		return deferred.promise;

	};

	this.getLocId = function(lat, long) {
		var url = base_url + 'locations/search?lat=' + lat + '&lng=' + long + '&client_id=2122e774bdd44005ba53fb84478e67d6&callback=JSON_CALLBACK';

		// make http request here
		var deferred = $q.defer();

		$http.jsonp(url).success(function(results) {
			var data = results || '';
			deferred.resolve(data);
		}).error(function(error) {
			console.log('there was an error fool: ', error);
			deferred.reject(error);
		});

		return deferred.promise;

	};

	this.getImagesByLocation = function(locId, nextPage) {
		
		var url = base_url + 'locations/' + locId + '/media/recent?client_id=2122e774bdd44005ba53fb84478e67d6&count=50&max_tag_id=' + nextPage + '&callback=JSON_CALLBACK';

		// make http request here
		var deferred = $q.defer();

		$http.jsonp(url).success(function(results) {
			var data = results || [];
			deferred.resolve(data);
		}).error(function(error) {
			console.log('there was an error fool: ', error);
			deferred.reject(error);
		});

		return deferred.promise;

	};


});