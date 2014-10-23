(function(){
	var app = angular.module('dashboard', []);

	app.service('stat', function($http){
		this.getStats = function(callback){
			var url = 'http://demo7576728.mockable.io/personal';
			$http.get(url).success(function(response){
				console.log('base response = ' +response);
				callback(response);
			})
		}
	});

	app.controller('PersonalController', ['$scope', '$http', 'stat', function($scope, $http, stat){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
		this.lastusage;
		this.lastduration
		this.datejoined;
		this.numshowers;
		this.init = function(){
			var url = 'http://demo7576728.mockable.io/personal';
			stat.getStats(function(response){
				$scope.profile = response;
				// console.log('$scope.profile = ' +Object.keys($scope.profile))
				console.log(response); //successfully got response here, TODO: BUT HOW TO USE IT
			});
			// this.lastusage = $scope.profile.lastShowerUsage;
			// this.lastduration = data.lastShowerDuration;
			// this.datejoined = data.created;
			// this.numshowers = data.numShowers;
		};

		this.init();
	}]);

	app.controller('TabController', function($http, $scope){
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

			$scope.usage;
			$http.get(url).success(function(data){
				usageChart.load({
					json: data.values
				});
				$scope.usage = data.total;
			});
			this.usagetotal = $scope.usage;
			// $http.get(url).success(loadUsage);

		};	//end of setTab function

		this.isSet = function(num){
			return (this.tab == num);
		};

		//Refresh chart with new data
		loadUsage = function(data){
			usageChart.load({
				json: data.values
			});
			$scope.usage = data.total;
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
