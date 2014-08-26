angular.module('voyagerSearch',[])
    .controller('SearchCtrl', function ($scope, $http) {

        'use strict';

        $scope.solrUrl = "http://voyagerdev.com/daily/";

        var getInput = function (query) {
            var input = '*:*';
            if (query) {
                input = query;
            }
            return input;
        };

        function _build(query) {
            var queryString = $scope.solrUrl + 'solr/v0/select?q=' + getInput(query);
            queryString += '&fl=id,name:[name],format,bytes';  //fields to select
            queryString += '&rows=100';  //define row count
            queryString += '&wt=json&json.wrf=JSON_CALLBACK';  //jsonp
            return queryString;
        }

        function _search() {
            var solrCall = _build($scope.searchInput);
            $http.jsonp(solrCall).then(function(res) {
                $scope.docs = res.data.response.docs;
            });
        }

        _search();

        $scope.searchClick = function() {
            _search();
        };
    });