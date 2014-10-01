(function(){
	var app = angular.module('dashboard', []);

	app.controller('dataPlaceholder', function(){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
	});

	app.controller('TabController', function(){
		this.tab = 1;

		this.setTab = function(num){
			this.tab = num;
		};
		this.isSet = function(num){
			return (this.tab == num);
		};
	});

	

})();