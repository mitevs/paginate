Paginate
========

Paginate is angular module that contains two major components. The paginate factory is a component for creating paginator controllers. The paginator controller is the brain and does all the magic.  The UI component is just a nice looking html which is connected and uses the paginator controller underneath.

The paginator factory
-----
The paginator factory is able to producte paginator controller with various configuration parameters. This means that the factory is flexible and easy for use in various scenarios.

This is the way you need to use the factory in order to create paginator controller:

```
var module = ng.module('MainApp', ['paginate']);

module.controller('MainCtrl', ['$scope', 'paginatorFactory', function($scope, paginatorFactory){
	$scope.paginator = paginatorFactory.createPaginator(config);
}]);
```

Where config is the object used by the factory to configure the new paginator controller instance.