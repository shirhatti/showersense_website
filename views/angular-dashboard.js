(function(){
	var app = angular.module('dashboard', []);

	app.controller('dataPlaceholder', function(){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
	});

	app.controller('TabController', function($http){
		this.setTab = function(num){
			this.tab = num;
			var url;
			switch(num){
				case 1:
					this.period = "Today";
					url = 'http://demo7576728.mockable.io/mock1';
					break;
				case 2:
					this.period = "yesterday";
					url = 'http://demo7576728.mockable.io/mock2';
					break;
				case 3:
					this.period = "this week";
					url = 'http://demo7576728.mockable.io/mock1';
					break;
				case 4:
					this.period = "this month";
					url = 'http://demo7576728.mockable.io/mock2';
					break;
			}

			$http.get(url).success(loadData);
		};

		this.isSet = function(num){
			return (this.tab == num);
		};

		//Refresh chart with new data
		loadData = function(data){
			chart.load({
				json: data.values
			});
			this.usagetotal = data.total;
		};

		//Initialize page to first tab (Today)
		this.setTab(1);
	});

	app.controller('LeaderboardController', function($http){
		this.addFriend = function(){

			$http.get(url).success(loadData);

		}
		this.removeFriend = function(){

			$http.get(url).success(loadData);
		}

		loadData = function(data){
			chart.load({
				json: data.values
			});
		};
	});


})();
