/* put js code here */
var redditApp = angular.module('RedditApp', []);
redditApp.controller('SearchCtrl', ['$scope', '$http', function($scope, $http){
  $scope.searchTerm ='';
  $scope.data= {
    title: '',
    img: '',
    permalink: '',
    score: ''
  };




  $scope.search = function(){
    var req = {
      url: "https://www.reddit.com/search.json",
      method: 'GET',
      params: {
        q: $scope.searchTerm
      }
    }

    $http(req).then(function success(res){
      var searchData = res.data;
      $scope.data.title = searchData.data.children[0].data.title;
      $scope.data.img = searchData.data.children[0].data.url;
      $scope.data.permalink = searchData.data.children[0].data.permalink;
      $scope.data.score = searchData.data.children[0].data.score;

    }, function error(res){
      console.log(res);
    })
  }






}])

console.log('this file is running.');