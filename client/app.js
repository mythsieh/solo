angular.module('app', [])
  .controller('TableController', function($scope){
    $scope.tasks = [
      {
        name: 'Walk Sebastian',
        sunday: 0,
        monday: 0,
        tuesday: 1,
        wednesday: 1,
        thursday: 2,
        friday: 2,
        saturday: 1
      }
    ];
    $scope.addTask = function(task){
      var obj = {
        name: task,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
      };
      $scope.tasks.push(obj);
    };
    $scope.updateDay = function(value){
      if (typeof value === 'number'){
        if (this.value < 2){
          this.value++;
        } else {
          this.value = 0;
        }
      }
    }
    $scope.dayClicked = function($index){
      console.log($index);
    }
  })
