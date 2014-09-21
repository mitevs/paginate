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

The config object
----

**recordCount** - The total number of records you need to paginate

**pageSize** - The number of records per page

**pageSizes** - List from which page size can be picked via drop-down

**windowSize** - The number of pages seen at any given time in the UI component

**sizeChangable** - Whether the drop-down for changing page size dynamically is on or off (true/false)

**summaryTemplate** - String representing the template for generating summary of the current paginator state. Possible keys that the paginator factory recognizes are:

- {start} - The start record index for the current page
- {end} - The end record index for the current page
- {currentPage} - The current page
- {recordCount} - The record count

**onChange** - Function that is executed whenever the paginator changes state. The function should expect (start, end, currentPage, pageSize). Where start and end are the indexes in the original records list where the paginator currently looks at.

The paginator controller methods
-----


**loagPage([pageNumber])** - Computes the state for the given page number, or the current page if the page number is not provided. After this call the onChange callback is executed with the new state parameters

**loadPreviousPage()** - Computes the state for the previous page relative to the current page

**loadNextPage()** - Computes the state for the next page relative to the current page

**loadFirstPage()** - Computes the state for the first page

**loadLastPage()** - Computes the state for the last page

**summary()** - Generates summary for the paginator state using the summary template. The summary template defaults to '{start} to {end} out of {recordCount}'.

The example
----
In the given example we use imaginary users list of 300 users, displaying them in table. You can check the index.html and main.js to see how the paginator is used, and also experiment with the config object to see different outcomes.

Notes
--------
In order to test the example you need to run it through http server rooted at the folder of the projects so that the directive template is correctly resolved. 

*This example was tested with the help of the python http server module.*