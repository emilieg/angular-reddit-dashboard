/* put js code here */
var redditApp = angular.module('RedditApp', []);
redditApp.controller('SearchCtrl', ['$scope', '$http', function($scope, $http){
  $scope.searchTerm ='';
  $scope.dat = [];
  $scope.history = [];//array to store searchTerms
  if (localStorage.getItem('term')) {
    $scope.history = JSON.parse(localStorage.getItem('term'))
  }



  $scope.search = function(){
    $scope.research($scope.searchTerm);
  };

  $scope.research = function(term){
  
        var req = {
      url: "https://www.reddit.com/search.json",
      method: 'GET',
      params: {
        q: term
      }
    }

    $http(req).then(function success(res){
      var searchData = res.data;
      console.log(searchData);
      //loop over children array and grab 
      var arr = searchData.data.children;
      for (i = 0; i < arr.length; i++){
          $scope.dat[i]=arr[i].data;

      }
        if ($scope.history.indexOf(term) === -1) {
            $scope.history.push(term);
            console.log("adding term to history : "+term)
            localStorage.setItem('term',JSON.stringify($scope.history));
        }


    }, function error(res){
      console.log(res);
    })
  }

  $scope.delete = function(index){
    localStorage.removeItem(index);
     $scope.history.splice(index, 1);
  }
 


}])

console.log('this file is running.');