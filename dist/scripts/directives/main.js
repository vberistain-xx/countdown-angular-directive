'use strict';

app.directive("countdown", function($interval) {
  return {
      restrict: 'E',
     	scope: {
     		inputSeconds: '&',
     		inputInterval: '&'
     	},
      template: 
        '<div class="center"> ' +
		    '<form role="form" class="form-inline main-form">'+
		    	'<label>Seconds</label>'+
			    '<input type="text" class="form-control input-seconds" ng-model="inputSeconds" placeholder="Enter seconds">'+
			    '<label>Interval</label>'+
			    '<input type="number" class="form-control input-interval" ng-model="inputInterval" min="1" default="1">'+
		    	'<button type="button" class="btn btn-success" ng-click="startTimer()">Start</button>'+
		    	'<button type="button" class="btn btn-danger" ng-click="stopTimer()">Stop</button>' +
		    	'<button type="button" class="btn btn-warning" ng-click="resetTimer()">Reset</button>'+
			'</form>'+
			'<div class="center outer-center"> ' +
				'<div class="counter-main inner-center">'+
					'<div class="counter-digits" ng-repeat="digit in countDown track by $index">'+

						'<div class="counter col-centered centered" ng-repeat="dig in digit track by $index">{{dig}}</div>'+
						'<div class="separator centered" ng-show="countDown.length>$index+1">:</div>'+
						
					'</div>'+
				'</div>'+
			'</div>'+	
		'</div>',

      link: function(scope, element, attrs) {
      	scope.inputInterval=1;
      	var intervalFlag;
		scope.startTimer = function  () {
			var duration = scope.inputSeconds;
			scope.countDown = scope.convertToFormatedTime(scope.inputSeconds);

			var inc = scope.inputInterval;

			$interval.cancel(intervalFlag);
			intervalFlag = scope.setInterval(duration, inc);
		}

		scope.setInterval = function(duration, increment) {
			
			var interval=$interval(function() {
					duration = duration - increment;
					scope.countDown = scope.convertToFormatedTime(duration);
		        }, increment*1000);
			return interval;
		}
		scope.stopTimer = function() {
			$interval.cancel(intervalFlag);

		}

		scope.resetTimer = function() {
			scope.countDown = scope.convertToFormatedTime(scope.inputSeconds);
			scope.stopTimer();

		};

		scope.convertToFormatedTime = function (seconds) {
			var duration;
			var durationArray = [];

			duration = moment.duration(seconds*1000);
			duration = Math.floor(duration.asHours()) + moment(duration.asMilliseconds()).format(":mm:ss");
			durationArray = scope.splitFormatedTime(duration);


			return durationArray;
		}

		scope.splitFormatedTime = function(formatedTime) {
			var durationArray = formatedTime.split(":");
			durationArray[0] = scope.pad2(durationArray[0]);
			return durationArray;

		};

		scope.pad2 = function(number){
     		return (number < 10 ? '0' : '') + number
   
		}

		scope.$watch('countDown', function(newValue, oldValue) { 

			var countIsZero = true;
			
			angular.forEach(newValue, function(value) {
				if (value != '00' && value != '0')
					countIsZero = false;
			});

			if(countIsZero)
				scope.stopTimer();

		}); 

      }
  };
});
