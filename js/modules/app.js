(function() {
    var app = angular.module('taskManager', []);

    app.controller('TaskController', ['$scope', '$http', '$location', '$window', '$timeout', function($scope, $http, $location, $window, $timeout) {

        this.initialize = function() {
            $scope.tasks = [];
            $scope.newTask = {};
            this.getStatuses();
            this.getTasks();
        };

        this.getTasks = function() {
            $scope.fetching = true;
            $http({
                url: "http://localhost:8080/interview",
                method: "GET"
            }).success(function(data) {
                $scope.tasks = data;
            }).error(function() {
                $scope.error = "Aconteceu um erro!"
            });
            $scope.fetching = false;
        };

        this.getStatuses = function() {
            $scope.fetching = true;
            $http({
                url: "http://localhost:8080/interview/statuses",
                method: "GET"
            }).success(function(data) {
                $scope.statuses = data;
                $scope.newTask.status = data[0];
                $scope.filter = $scope.statuses[0];
            }).error(function() {
                $scope.error = "Aconteceu um erro!"
            });
            $scope.fetching = false;
        };


        this.insertTask = function() {
            $scope.fetching = true;
            $http({
                url: "http://localhost:8080/interview",
                method: "POST",
                data: $scope.newTask
            }).success(function(data) {
                $scope.tasks.push(data);
                $scope.error = "";
                $scope.fetching = false;
                $scope.submitted = false;
            }).error(function() {
                $scope.error = "Aconteceu um erro!"
                $scope.fetching = false;
            });
            $scope.insertForm.$setPristine();
            this.initialize();
        };

        this.updateTask = function(task) {
            console.log(task);
            $scope.fetching = true;
            $http({
                url: "http://localhost:8080/interview",
                method: "PUT",
                data: task
            }).success(function(data) {
                task = data;
                $scope.error = "";
                $scope.fetching = false;
            }).error(function() {
                $scope.error = "Aconteceu um erro!"
                $scope.fetching = false;
            });
        };

        this.filterTasks = function(status) {
            $scope.filter = status;
        };

        this.initialize();

    }]);
})();
