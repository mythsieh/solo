angular.module('weeklies', [])
  .controller('TableController', function($scope, Tasks){
    angular.extend($scope, Tasks);
  })
  .factory('Tasks', function($http){
    var tasks = [];

    // when landing on the page, get all tasks and show them
    $http.get('/api/tasks')
      .success(function(data){
        //data is an array of tasks
        for (var i = 0 ; i < data.length; i++){
          tasks.push(data[i]);
        }
        // console.log('i am in http get: ', data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
    
    var addTask = function(task){
      // check to see if the task already exists
      var result;
      for (var i = 0; i < this.tasks.length; i++){
        if (this.tasks[i].name === task){
          result = this.tasks[i];
        }
      }
      if (!result){
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
        $http.post('/api/tasks', obj)
          .success(function(data){
            // console.log(' i am in http post: ', data);
            tasks.push(data[data.length - 1]);
          })
          .error(function(data){
            console.log('Error: ' + data);
          })
      } else {
        alert('Task already exists!');
      }
    };
    
    var updateDay = function(day, obj){
      if (obj[day] < 2){
        obj[day]++;
      } else {
        obj[day] = 0;
      }
      $http.put('/api/tasks', obj)
        .success(function(){
          // console.log('Success!');
        }).error(function(data){
          console.log('Error: ' + data);
        });
    }
    
    var deleteTask = function(task){
      var result;
      // go through the tasks array and find matching name
      for (var i = 0; i < this.tasks.length; i++){
        if (this.tasks[i].name === task){
          result = this.tasks[i];
          // remove task from front end
          this.tasks.splice(i, 1);
        }
      }
      // if result was found
      if (result){
        var url = '/api/tasks/' + result._id;
        // $http.delete('/api/tasks')
        $http.delete(url)
          .success(function(){
            // console.log('Sent through http delete!');
          }).error(function(data){
            console.log('Error in delete: ', data);
          })        
      } else {
        console.log('Task not found!');
      }
    };

    return {
      tasks: tasks,
      addTask: addTask,
      updateDay: updateDay,
      deleteTask: deleteTask
    };

  });

//TIL: Angular will not refresh a collection/array just because you make it blank tasks = [];