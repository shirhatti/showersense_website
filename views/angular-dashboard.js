(function(){
	var app = angular.module('dashboard', []);

	app.controller('dataPlaceholder', function(){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
	});

	app.controller('TabController', function($http, $q){
		this.setTab = function(num){
			this.tab = num;
			var url;
			switch(num){
				case 1:
					this.period = "this week";
					url = 'http://demo7576728.mockable.io/week1';
					break;
				case 2:
					this.period = "this month";
					url = 'http://demo7576728.mockable.io/month1';
					break;
			}

		// var usage = function($q){
		// 	var defer = $q.defer();
			$http.get(url).success(function(data){
				usageChart.load({
					json: data.values
				});
				// defer.resolve(data.total);
			});
		// 	return defer.promise;
		// };

		// this.usagetotal = usage;


		};	//end of setTab function

		this.isSet = function(num){
			return (this.tab == num);
		};

		//Refresh chart with new data
		// loadData = function(data){
		// 	usageChart.load({
		// 		json: data.values
		// 	});
		// 	defer.resolve(data.total);
		// };

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

		this.initialize = function(){
			var url = 'http://demo7576728.mockable.io/leaderboard';
			$http.get(url).success(loadData);
		};

		loadData = function(data){
			leaderboard.load({
				json: data.values
			});
		};

		this.initialize();

	});


})();
