var app = angular.module("blogscraper", [
    "ui.router", "ngResource"
]);

app.config(["$stateProvider", "$locationProvider", "$urlRouterProvider",
    function($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "/templates/home.html",
                controller: ["$scope","Url",function($scope,Url) {
                    $scope.options = {processStart :false};
                    $scope.processUrl = function(){
                        $scope.options['processStart'] = true;
                        Url.fetchList().then(function(data){
                            $scope.data = data;
                            $scope.options['processStart'] = false;
                        },function(err){
                            /*TODO handle Error*/
                            console.log(err);
                        })
                       
                    }
                }]
            })
    }
]);

app.factory("UrlResource", ["$resource", function($resource) {
    return $resource("/api/v1/url/:id", {
        id: '@id'
    }, {
        update: {
            method: "PUT"
        },
        delete: {
            method: "DELETE"
        }
    });
}]);

app.factory("Url", ["$http", "$q", "UrlResource", function($http, $q, UrlResource) {
    var list = [];
    var selected;
    return {
        //TODO:TO be implemented when API is used.
        fetchList: function() {
            var defer = $q.defer();
            try {
                UrlResource
                    .query({}, function(resp) {
                        list = resp;
                        defer.resolve(list);
                    }, function(err) {
                        list = [];
                        defer.reject([]);
                        console.log(err);
                    });
            } catch (e) {
                console.log(e.stack);
                list = [];
                defer.reject([]);
            }
            return defer.promise;
        },
        getList: function() {
            return list;
        },
        add: function(url) {
            list.push(url);
        }
    }
}]);
