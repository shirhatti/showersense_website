(function(){
	var app = angular.module('dashboard', []);

	app.service('stat', function($http){
		this.getStats = function(callback){
			var url = 'http://demo7576728.mockable.io/personal';
			$http.get(url).success(function(response){
				//console.log('base response = ' +response);
				callback(response);
			})
		}
	});

	app.controller('PersonalController', ['$scope', '$http', 'stat', function($scope, $http, stat){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
		$scope.lastusage;
		$scope.lastduration
		$scope.datejoined;
		$scope.numshowers;
		this.init = function(){
			var url = 'http://demo7576728.mockable.io/personal';
			$http.get(url).success(init);
		};

		init = function(data){
			
				$scope.lastusage = data.lastShowerUsage;
				$scope.lastduration = data.lastShowerDuration;
				$scope.datejoined = data.created;
				$scope.numshowers = data.numShowers;
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
					url = '/api/shower/week';
					// url = 'http://demo7576728.mockable.io/week1';
					break;
				case 2:
					this.period = "this month";
					// url = 'http://demo7576728.mockable.io/month1';
					url = '/api/shower/month';
					break;
			}

			$scope.usage;
			$http.get(url).success( function(data){
				var d = [];
				var x = [];
				var y = [];
				x.push('x');
				y.push('Water Usage');
				for (index in data) {
					x.push(data[index]._id.year + '-' + data[index]._id.month + '-' + data[index]._id.day);
					y.push(data[index].total);
				}
				d.push(x);
				d.push(y);
				console.log(d);
				$scope.loadUsage(d);
			});
			this.usagetotal = $scope.usage;
						// $http.get(url).success(loadUsage);

		};	//end of setTab function

		this.isSet = function(num){
			return (this.tab == num);
		};

		//Refresh chart with new data
		$scope.loadUsage = function(data){

			usageChart.load({
		        columns: data,
    		});
			
			$scope.usage = data.total;
		};

		//Initialize page to first tab (Today)
		this.setTab(1);
	});

	app.controller('LeaderboardController', function($http){
		this.addFriend = function(){
			$http.get(url).success(loadData);
		};
		this.removeFriend = function(){
			$http.get(url).success(loadData);
		};
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

	app.controller('WristbandController', function($http, $scope){
		$scope.wristband;
		$scope.inputID;
		this.init = function(){
			$http.get('../api/wristband').success(saveWristband);
			//$scope.$apply();
		};

		saveWristband = function(data){
			$scope.wristband = data.wristbandID;
			console.log("saved wristband:" + $scope.wristband);
		};

		$scope.postWristband = function(){
			$http.post('/api/wristband', '{ "wristbandID":' + $scope.inputID + '}').success();
		};
		this.init();
		//set view to input box if wristbandID is null, display wristbandID otherwise
	});

})();