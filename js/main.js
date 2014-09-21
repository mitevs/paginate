(function(ng){
	var module = ng.module('MainApp', ['paginate']);

	module.controller('MainCtrl', ['$scope', 'paginatorFactory', function($scope, paginatorFactory){
		var users = [];

		for(var i = 0; i < 300; i++){
			users.push({
				userName: 'User ' + i,
				userEmail: 'user@users.com',
				userPhone: '12323',
				firstName: 'First Name ' + i,
				lastName: 'Last Name ' + i
			});
		} 

		$scope.paginator = paginatorFactory.createPaginator({
			recordCount: users.length,
			pageSize: 15,
			pageSizes: [10, 15, 20, 30],
			windowSize: 5,
			summaryTemplate: '{start} - {end} of {recordCount}',
			onChange: function(start, end){
				$scope.usersView = users.slice(start, end);
			}
		});
	}]);
}(angular));