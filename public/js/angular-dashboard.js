(function(){
	var app = angular.module('dashboard', []);

	app.controller('PersonalController', ['$scope', '$http', function($scope, $http, stat){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
		$scope.lastusage;
		$scope.lastduration
		$scope.datejoined;
		$scope.numshowers;
		this.init = function(){
			// var url = 'http://demo7576728.mockable.io/personal';
			var url = '/api/me'
			$http.get(url).success($scope.init);
		};

		$scope.init = function(data){
			
				$scope.lastusage = data.shower.date;
				$scope.lastduration = data.shower.duration;
				$scope.lastWaterUsage = data.shower.waterConsumed;
				$scope.datejoined = data.user.created;
				$scope.numshowers = data.count;
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
				//TODO: if no data, clear graph and show message. else loadUsage(d)
				// if (data.length != 0)
				// console.log(x.length)
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

	app.controller('LeaderboardController', function($http, $scope, $filter){
		this.addFriend = function(){
			$http.get(url).success(loadData);
		};
		this.removeFriend = function(){
			$http.get(url).success(loadData);
		};
		this.initialize = function(){
			// var url = 'http://demo7576728.mockable.io/leaderboard';
			var url = '../api/shower/friends/week';
			$http.get(url).success(function(data){
				var d = [];
				var usage = [];
				usage.push("Average Water Usage");
				d.push(['x', 'Friends']);
				for (friend in data) {
					var friends = [];
					friends.push(data[friend]._id);
					friends.push($filter('number')(data[friend].average, 1));
					d.push(friends);
				}
				$scope.loadData(d);	
			});
		};
		$scope.loadData = function(data){
			leaderboard.load({
				columns: data
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
		};

		$scope.postWristband = function(){
			$http.post('/api/wristband', '{ "wristbandID":' + $scope.inputID + '}').success();
		};
		this.init();
		//set view to input box if wristbandID is null, display wristbandID otherwise
	});

})();
