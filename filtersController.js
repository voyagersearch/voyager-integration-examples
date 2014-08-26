angular.module('voyagerSearch',['ui.bootstrap'])
    .controller('FiltersCtrl', function ($scope, $http) {

        'use strict';

        $scope.solrUrl = "http://voyagerdev.com/voyager/";

        function _isEven (someNumber) {
            return (someNumber % 2 === 0) ? true : false;
        };

        function _build(facet) {
            var queryString = $scope.solrUrl + 'solr/v0/select?q=*:*';
            queryString += '&fl=id,name:[name],format,bytes';  //fields to select
            queryString += '&rows=100';  //define row count
            queryString += '&facet=true&facet.mincount=1&facet.limit=11&facet.field=format&facet.field=format_type';  //filters to display, limiting facets to 11
            if(facet) {
                queryString += '&fq=' + facet.filter + ':' + facet.name;  //apply filter
            }
            queryString += '&wt=json&json.wrf=JSON_CALLBACK';  //jsonp
            return queryString;
        }

        var _buildFacets = function (rawFacets, filter) {
            var facets = [];
            angular.forEach(rawFacets, function (value, index) {
                if (!_isEven(index)) {
                    var facet = {name:rawFacets[index - 1], count:value, filter:filter};
                    facets.push(facet);
                }
            });
            return facets;
        };

        function _buildFilters(data) {
            var filters = [];
            angular.forEach(data.facet_counts.facet_fields, function (value, index) {
                filters.push({name:index,value:index,facets:_buildFacets(value, index)});
            });
            return filters;
        }

        function _search(facet) {
            var solrCall = _build(facet);
            $http.jsonp(solrCall).then(function(res) {
                $scope.docs = res.data.response.docs;
                $scope.filters = _buildFilters(res.data);
            });
        }

        _search();

        $scope.searchClick = function() {
            _search();
        };

        $scope.filterResults = function(facet) {
            _search(facet);
        };

    });
