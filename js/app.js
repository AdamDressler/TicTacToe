// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
  }
  if(window.StatusBar) {
  	StatusBar.styleDefault();
  }
});
})


.controller('calcController', function($scope, $window) {

 $scope.calculateDimensions = function(gesture) {
    $scope.dev_width = $window.innerWidth/3;
    $scope.dev_height = $window.innerHeight/3;
  }
     
  angular.element($window).bind('resize', function(){
    $scope.$apply(function() {
      $scope.calculateDimensions();    
    })       
  });
 	$scope.calculateDimensions(); 
	 	$scope.status = 'WAITING';
 	

 	$scope.startGame = function () {
 		$scope.fieldsList = ["F11", "F12", "F13", "F21", "F22", "F23","F31", "F32", "F33"];
 		$scope.fields = {};
	 	$scope.player = 'X';
	 	$scope.computerTurns = [];
	 	$scope.status = 'STARTED';
	 	$scope.winner = false;
	 	$scope.draw = false;
 	}

 	$scope.mark = function (square) {

 		if ($scope.fields[square]||$scope.winner||$scope.draw){
 			return 'taken';
 		}
 		
 		$scope.fields[square] = $scope.fields[square]||angular.copy($scope.player);
 		$scope.getWinner(); 
 		
 		var fieldIndex = $scope.fieldsList.indexOf(square);
 		$scope.fieldsList.splice(fieldIndex, 1);
 		
 		if ($scope.fieldsList.length == 0){
 			$scope.draw = true;
 			$scope.status = 'ENDED';
 		}
 		
 		if ($scope.player == 'X'){
 			$scope.player = 'O'
 			$scope.computerTurn();
 		}else{
 			$scope.player = 'X'
 		}

 	}    

 	$scope.computerTurn = function () {
 		randomItem = null;
 		var chooseForComputer = function (argument) {
 			randomItem = $scope.computerTurns[Math.floor(Math.random()*$scope.computerTurns.length)]
 			if (!$scope.fields[randomItem]){
 				return randomItem
 			}else{
 				var randomItemIndex = $scope.computerTurns.indexOf(randomItem)
 				$scope.computerTurns.splice(randomItemIndex,1)
 				chooseForComputer();
 			}
 		}

 		if ($scope.computerTurns.length!=0){
 			chooseForComputer()
 			var randomItemIndex = $scope.computerTurns.indexOf(randomItem)
 			$scope.computerTurns.splice(randomItemIndex,1)
 		}else{
 		 	randomItem = $scope.fieldsList[Math.floor(Math.random()*$scope.fieldsList.length)]
 			var randomItemIndex = $scope.fieldsList.indexOf(randomItem)
 		}

 		$scope.mark(randomItem);
 	}

 	$scope.getWinner = function () {
 		var winner = null;
 		var victoryCombinations = [
	 		[
	 			"F11", "F12", "F13"
	 		],
	 		[
	 			"F21", "F22", "F23"
	 		],
	 		[
	 			"F31", "F32", "F33"
	 		],
			[
	 			"F11", "F21", "F31"
			],
	 		[
	 			"F12", "F22", "F32"
	 		],
	 		[
	 			"F13", "F23", "F33"
	 		],
	 		[
	 			"F11", "F22", "F33"
	 		],
	 		[
	 			"F31", "F22", "F13"
	 		],
 		]

 		$scope.nextArr = true
	 	angular.forEach(victoryCombinations, function (arr) {
	 		if ($scope.nextArr){
		 		$scope.winner = true;
		 		$scope.double = [];
		 		var count = 0;
		 		$scope.arrayToCheck = angular.copy(arr)

		 		angular.forEach(arr, function (field) {
		 			if ($scope.fields[field]!=$scope.player){
		 				$scope.winner = false;
		 			}else{
		 				count++;
		 				$scope.double.push(field);
		 				var fieldIndex = $scope.arrayToCheck.indexOf(field);
 						$scope.arrayToCheck.splice(fieldIndex, 1);
 						
 						if ($scope.arrayToCheck.length == 1 && $scope.computerTurns.indexOf($scope.arrayToCheck[0])==-1){
 							$scope.computerTurns.push($scope.arrayToCheck[0])
 						}
		 			}

		 		})

		 		if ($scope.winner){
		 			$scope.nextArr = false
		 		}

	 		}
	 	})

	 	if ($scope.winner){
	 		console.log('winner', $scope.player)
 			$scope.status = 'ENDED';
	 	}
 	}
})