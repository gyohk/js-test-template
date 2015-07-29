describe("Jasmine Specs for Asynchronous Operations: ", function() {
    //Scenario -1
    describe("With Done() function: ", function(){
        var myCallback, showErrorMessage;
        beforeEach(function(done) {
            var ajax_url = '';
            if(location.port==9876){
                ajax_url = 'base/spec/fixtures/myData.json';
            }else{
                ajax_url = 'spec/fixtures/myData.json';
            }

            myCallback = jasmine.createSpy();
            $.ajax({
                url: ajax_url,
                dataType: "json",
                success: function(responseResult) {
                    myCallback(responseResult);
                    done();
                },
                error: showErrorMessage,
                timeout: 5000
            });
        });
        it("should support JavaScript " +
            "asynchronous operations", function() {
            expect(myCallback).toHaveBeenCalled();
        });
    });
});