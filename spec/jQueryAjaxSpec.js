/**
 * Created by s_kimura on 2015/07/29.
 */
describe("Ajax Calls: ", function(){
    describe("Validate using 'jasmine-ajax' Plugin", function(){
        var request, myText, myCallback;
        beforeEach(function() {
            jasmine.Ajax.install();
            myCallback = jasmine.createSpy("success");
            ajaxRequest(myCallback);
            request = jasmine.Ajax.requests.mostRecent();
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });
        //Scenario -1
        it("Method 'GET' should be passed through XMLHttpRequest request",function(){
            expect(request.method).toBe('GET');
            expect(myCallback).not.toHaveBeenCalled();
        });
        //Scenario -2
        it("url should be passed as '/some/url/?q=Cookbook' through XMLHttpRequest request",function(){
            expect(request.url).toBe('/some/url/?q=Cookbook');
            expect(myCallback).not.toHaveBeenCalled();
        });

        //Scenario -3
        it("myCallback should be called on " +
            "successful response",function(){
            myText = "Jasmine Cookbook";
            request.respondWith({
                "success": myCallback(myText)
            });
            expect(myCallback).toHaveBeenCalledWith("Jasmine Cookbook");
        });
    });
});

describe ("JavaScript Application:", function(){
    describe ("When Jasmine Specs designed with ", function(){
        describe("HTML Fixture: ", function(){
            beforeEach(function() {
                if(location.port==9876){
                    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
                }else{
                    jasmine.getFixtures().fixturesPath = 'spec/fixtures/';
                }
            });
            describe("'loadFixtures' Method, ", function(){
                beforeEach(function() {
                    loadFixtures('HTML_Fixture.html');
                });
                it("Load fixture from a file", function(){
                    expect($('.myULClass')).toExist();
                    expect($('#my-fixture')).toExist();
                });
            });

            describe("'readFixtures' Method, ", function(){
                var myFixture;
                beforeEach(function() {
                    myFixture = readFixtures('HTML_Fixture.html');
                });
                it("Read fixture from a file", function(){
                    expect(myFixture).toContainText(/Munish/);
                    expect($(myFixture).find("li")).toHaveText(/Sethi/);
                });
            });

            describe("'setFixtures' Method, ", function(){
                beforeEach(function() {
                    setFixtures('<div class="FixtureClass">Jasmine Cookbook</div>');
                });
                it("Receive fixture as a parameter", function(){
                    expect($('.FixtureClass')).toExist();
                });
            });

            describe("JSON Fixture, ", function(){
                var fixtureFile, fixtures, myResult;
                beforeEach(function() {
                    loadFixtures('HTML_Fixture.html');

                    if(location.port==9876){
                        jasmine.getJSONFixtures().fixturesPath = 'base/spec/fixtures/';
                    }else{
                        jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures/';
                    }
                    fixtureFile = "myJSONData.json";
                    fixtures = loadJSONFixtures(fixtureFile);
                    myResult = fixtures[fixtureFile];
                });
                it("Load JSON data from a file",function(){
                    $('#my-fixture').html("Jasmine Cookbook");
                    expect($('#my-fixture')).toContainText("Jasmine Cookbook");
                });
            });
        });
    });
});

describe("jQuery",function(){
    describe("Ajax Calls:", function(){
        describe("with $.ajax", function(){
            var configurationData = {
                url: "myData.json",
                remainingTime: 5000
            };
            it("Correct URL should be passed to $.ajax object", function(){
                spyOn($, "ajax");
                sendRequestWithJQuery(undefined, undefined, configurationData);
                expect($.ajax).toHaveBeenCalledWith(
                    jasmine.objectContaining({url: configurationData.url})
                );
            });

            //Scenario -2
            it("Method 'myCallback_jQuery' should be called on successful response", function(){
                spyOn($, "ajax").and.callFake(function(e) {
                    e.success({});
                });
                var myCallback_jQuery;
                myCallback_jQuery = jasmine.createSpy();
                showErrorMessage = jasmine.createSpy();
                sendRequestWithJQuery(myCallback_jQuery, showErrorMessage, configurationData);
                expect(myCallback_jQuery).toHaveBeenCalled();
                expect(showErrorMessage).not.toHaveBeenCalled();
            });

            //Scenario -3
            it("Error method showErrorMessage should be called for any malfunctioning", function(){
                spyOn($, "ajax").and.callFake(function(e) {
                    e.error({});
                });
                showErrorMessage = jasmine.createSpy();
                sendRequestWithJQuery(myCallback_jQuery,showErrorMessage, configurationData);
                expect(showErrorMessage).toHaveBeenCalled();
            });

            //Scenario -4
            describe("DOM Manipulation", function(){
                it("Test HTML Fixture", function(){
                    if(location.port==9876){
                        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
                    }else{
                        jasmine.getFixtures().fixturesPath = 'spec/fixtures/';
                    }
                    loadFixtures('myfixture.html');

                    if(location.port==9876){
                        jasmine.getJSONFixtures().fixturesPath = 'base/spec/fixtures/';
                    }else{
                        jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures/';
                    }
                    var FixtureUrl = "myData.json";
                    var fixtures = loadJSONFixtures(FixtureUrl);
                    var myResult = fixtures[FixtureUrl];
                    spyOn($, "ajax").and.callFake(function(e) {
                        e.success(myResult);
                    });
                    showErrorMessage = jasmine.createSpy();
                    sendRequestWithJQuery(myCallback_jQuery,showErrorMessage, configurationData);
                    expect($('#my-fixture')).toContainText(/Jasmine Cookbook by Munish Sethi/i);
                });
            });
        });

    });
});

// ------------------------------------ source
function ajaxRequest(myCallback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function(args) {
        myCallback(this.responseText);
    };
    xmlhttp.open("GET", "/some/url/?q=Cookbook",true);
    xmlhttp.send();
}
function myCallback(myText) {
    var myTextToDisplay = myText;
    $("#myID").html(myTextToDisplay);
}

function sendRequestWithJQuery(myCallback_jQuery,showErrorMessage,configurationData) {
    $.ajax({
        url: configurationData.url,
        dataType: "json",
        success: function(responseResult) {
            myCallback_jQuery(responseResult);
        },
        error:showErrorMessage,
        timeout: configurationData.remainingTime
    });
}
function myCallback_jQuery(ajaxResponse) {
    var out = "";
    for(i = 0; i < ajaxResponse.length; i++) {
        out += ajaxResponse[i].book + ajaxResponse[i].author;
    }
    $("#my-fixture").html(out);
}