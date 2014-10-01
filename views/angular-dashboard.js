(function(){
	var app = angular.module('dashboard', []);

	app.controller('dataPlaceholder', function(){
		//TODO: find what data we need and initialize it here
		//this.data = some mongo query
	});

	app.controller('TabController', function($http){		
		this.setTab = function(num){
			this.tab = num;
			getData(num);
			switch(num){
				case 1:
					this.period = "Today";
					break;
				case 2:
					this.period = "yesterday";
					break;
				case 3:
					this.period = "this week";
					break;
				case 4:
					this.period = "this month";
					break;
			}
		};
		this.isSet = function(num){
			return (this.tab == num);
		};

		//Retrieve data based on tab selected
		getData = function (num){
			var url;
			switch(num){
				case 1:
					//TODO: get url based on username, data, etc... AFTER getting backend structure down
					url = 'http://demo7576728.mockable.io/mock1';
					break;
				case 2:
					url = 'http://demo7576728.mockable.io/mock2';
					break;
				case 3:
					url = 'http://demo7576728.mockable.io/mock1';
					break;
				case 4:
					url = 'http://demo7576728.mockable.io/mock2';
					break;
			}

			//TODO: add support for error handling
			$http.get(url).success(loadData);
		}	

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

	
	
})();