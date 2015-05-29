angular.module('instagramApp').controller('instagramController', 
	function($interval, GeocodingService,  instagramService) {

	var vm = this;

	vm.images = [];
	vm.nextPage = '';
	vm.tag = 'burgers';
	vm.locId = '216047380';

	// to search by location
	// 1. https://developers.google.com/maps/documentation/geocoding/#api_key
	// 2. Search on instagram for location id
	/*
		https://api.instagram.com/v1/locations/search?lat=37.4224553&lng=-122.0843062&client_id=2122e774bdd44005ba53fb84478e67d6

	 	3. Search for recent with location id

	 	https://api.instagram.com/v1/locations/216047380/media/recent?client_id=2122e774bdd44005ba53fb84478e67d6

 	*/


	function getPopularImages() {
		instagramService.getPopularImages().then(function(data) {
			vm.images = data.data;
			vm.nextPage = data.next_max_id;
			console.log('next max id: ', vm.nextPage);
		}, function(error) {
			console.log(error);
		});
	}

	

	// $interval(function() {
	// 	getByLoc();
	// }, 2000);

	//infinite scroll, calls next function on each scroll event

	function getMasImages() {
		instagramService.getImagesByTag(vm.tag, vm.nextPage).then(function(data) {
			angular.forEach(data.data, function(item) {
				vm.images.push(item);
			});
			// vm.images.push(data.data);
			vm.nextPage = data.pagination.next_max_id;
			console.log('next max id: ', vm.nextPage);

		}, function(error) {
			console.log(error);
		});		
	}

	// get by location procedure
	function getByLoc() {
		var address = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';

		// 1. get lat and long
		GeocodingService.getLatAndLng(address).then(function(data) {
			console.log('got lat and long: ', data);
			var lat = data.results[0].geometry.location.lat,
				lng = data.results[0].geometry.location.lng;

			// 2 .get loc id	
			instagramService.getLocId(lat, lng).then(function(results) {
				console.log('loc id!!');
				var locId = results.data[0].id;

				// 3. get images by location
				instagramService.getImagesByLocation(locId).then(function(images) {
					console.log('we has images');
					vm.images =images.data;
				});
			});
		});

		// instagramService.getImagesByLocation(vm.locId, vm.nextPage).then(function(data) {
		// 	angular.forEach(data.data, function(item) {
		// 		vm.images.push(item);
		// 	});
		// 	// vm.images.push(data.data);
		// 	vm.nextPage = data.pagination.next_max_id;
		// 	console.log('next max id: ', vm.nextPage);

		// }, function(error) {
		// 	console.log(error);
		// });		
	}

	getByLoc();






});