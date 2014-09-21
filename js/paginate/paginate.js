(function(ng){
	if(ng){
		ng.module('paginate', [])
		.directive('paginator', function() {
			return {
				restrict : 'E',
				replace: true,
				scope : {
					paginator : '=paginatorController'
				},
				templateUrl : 'templates/default.html',
				link: function(scope){
					scope.$watch('paginator.pageSize', function(){
						scope.paginator.loadPage();
					});
				}
			};
		}).factory('paginatorFactory', function(){
			return {
				createPaginator: function(config){
					return new Paginator(config).init();
				}
			};
		});
	}
}(angular));

function Paginator(config){
	this.recordCount = config.recordCount;
	this.pageSize = config.pageSize;
	this.onChange = config.onChange;
	this.summaryTemplate = config.summaryTemplate;
	this.pageSizes = config.pageSizes;
	this.windowSize = config.windowSize;
	this.sizeChangable = config.canChangePageSize;

	this.init = function(){
		if(this.pageSizes === undefined){
			this.pageSizes = [5, 10, 15];
		}

		if(this.pageSize === undefined){
			this.pageSize = this.pageSizes[0];
		}

		if(this.summaryTemplate === undefined){
			this.summaryTemplate = '{start} to {end} out of {recordCount}';
		}

		if(this.windowSize === undefined){
			this.windowSize = 5;
		}

		if(this.sizeChangable === undefined){
			this.sizeChangable = true;
		}

		this.start = 0;
		this.end = 0;
		this.currentPage = 0;
		this.lastPage = Math.max(0, Math.ceil(this.recordCount / this.pageSize) - 1);
		this.onFirstPage = true;
		this.onLastPage = false;
		this.windowStart = 0;
		this.windowEnd = this.windowSize - 1;
		this.windowHalf = Math.floor(this.windowSize / 2);
		this.showPaginator = this.recordCount > this.pageSize;
		this.loadPage();
		return this;
	};
	
	this.loadPage = function(page){
		if(page === undefined){
			this.lastPage = Math.max(0, Math.ceil(this.recordCount / this.pageSize) - 1);
			this.currentPage = Math.min(this.currentPage, this.lastPage);
		}else if(page < 0){
			this.currentPage = 0;
		}else if(page > this.lastPage){
			this.currentPage = this.lastPage;
		}else{
			this.currentPage = page;
		}

		this.onFirstPage = false;
		this.onLastPage = false;

		if(this.currentPage === 0){
			this.onFirstPage = true;
		}else if(this.currentPage === this.lastPage){
			this.onLastPage = true;
		}

		this.start = Math.min(this.currentPage * this.pageSize, this.recordCount);
		this.end = Math.min(this.start + this.pageSize, this.recordCount);

		this.renderPageLinks();

		if(this.onChange){
			this.onChange(this.start, this.end, this.currentPage, this.pageSize);
		}
	};

	this.renderPageLinks = function(){
		var range = [], i;

		if(this.windowSize > this.recordCount){
			this.windowStart = 0;
			this.windowEnd = this.lastPage;
			this.pages = null;
		}else if(this.currentPage <= this.windowStart || this.currentPage >= this.windowEnd){
			this.windowStart = this.currentPage - this.windowHalf;
			this.windowEnd = this.currentPage + this.windowHalf;

			if(this.windowStart < 0){
				this.windowStart = 0;
				this.windowEnd = this.windowSize - 1;
			}else if(this.windowEnd > this.lastPage){
				this.windowEnd = this.lastPage;
				this.windowStart = this.lastPage - (this.windowSize - 1);
			}

			this.pages = null;
		}

		if(!this.pages){
			for(i = this.windowStart; i <= this.windowEnd; i++){
				range.push(i);
			}

			this.pages = range;
		}
	};

	this.summary = function(){
		return this.summaryTemplate
		.replace('{start}', this.start + 1)
		.replace('{end}', this.end)
		.replace('{recordCount}', this.recordCount)
		.replace('{currentPage}', this.currentPage + 1);
	};

	this.loadPreviousPage = function(){
		this.loadPage(this.currentPage - 1);
	};
	
	this.loadNextPage = function(){
		this.loadPage(this.currentPage + 1);
	};

	this.loadFirstPage = function(){
		this.loadPage(0);
	};

	this.loadLastPage = function(){
		this.loadPage(this.lastPage);
	};
}