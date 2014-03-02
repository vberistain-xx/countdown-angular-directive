'use strict';

describe('Directive: countdown', function() {

  var scope, element, $interval, iScope;
    beforeEach(module('countdownApp'))

    beforeEach(function() {

      inject(function($compile, $rootScope, _$interval_) {
        $interval = _$interval_;
        scope = $rootScope.$new();
        element = $compile('<countdown><input ng-model="inputSeconds"><input ng-model="inputInterval"></countdown>')(scope);
        iScope = element.isolateScope();
        iScope.$apply();
      })  

    })

    describe('pad2', function(){
        
      it('should return a two digit number', (function() {
          expect(iScope.pad2("8")).toBe("08");
      }));

       it('should return a two digit number', (function() {
          expect(iScope.pad2("18")).toBe("18");
      }));
    }); // describe('pad2')

    describe('splitFormatedTime', function(){
      beforeEach(function(){
        this.result = iScope.splitFormatedTime("21:20:23");
      })
        
      it('returns in the first element the hour formatted', (function() {
        expect(this.result[0]).toBe("21");
      }));

      it('returns in the first element the hour formatted', (function() {
        expect(this.result[1]).toBe("20");
      }));

      it('returns in the first element the hour formatted', (function() {
        expect(this.result[2]).toBe("23");
      }));

       it('should return a two digit number', (function() {
          expect(iScope.pad2("18")).toBe("18");
      }));
    }); 

    describe('convertToFormatedTime', function(){

      describe('when is less than 60', function(){
        beforeEach(function(){
          this.result = iScope.convertToFormatedTime(45);
        })
        it('the element hours is00', function(){
          expect(this.result[0]).toBe('00');
        });
        it('the element minutes is 00', function(){
          expect(this.result[1]).toBe('00');
        });
        it('the element seconds is 45', function(){
          expect(this.result[2]).toBe('45');
        });
      });

      describe('when is less than 3600 but bigger than 60', function(){
        beforeEach(function(){
          this.result = iScope.convertToFormatedTime(1810);
        })
        it('the element hours is 00', function(){
          expect(this.result[0]).toBe('00');
        });
        it('the element minutes is 30', function(){
          expect(this.result[1]).toBe('30');
        });
        it('the element seconds is 10', function(){
          expect(this.result[2]).toBe('10');
        });
      });

      describe('when is bigger than 3600', function(){
        beforeEach(function(){
          this.result = iScope.convertToFormatedTime(7265);
        })
        it('the element hours is 02', function(){
          expect(this.result[0]).toBe('02');
        });
        it('the element minutes is 01', function(){
          expect(this.result[1]).toBe('01');
        });
        it('the element seconds is 05', function(){
          expect(this.result[2]).toBe('05');
        });
      });

    })

    describe('stopTimer', function(){
     
      it('the $interval has been canceled', function(){
        spyOn($interval, 'cancel');
        element.isolateScope().stopTimer();
        expect($interval.cancel).toHaveBeenCalled();
      })


    });
});
