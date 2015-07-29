// ------------------------------------ spec
describe("<ABC> Company: Health Care Solution, ", function() {
    describe("When to donate or receive blood, ", function(){
        // toHaveBeenCalled uasge.
        it("Person's age should be greater than " +
            "or equal to 18 years", function() {
            var testPersonCriteria = new Person2();
            spyOn(testPersonCriteria, "getAge");
            testPersonCriteria.ValidateAge("10/25/1990");
            expect(testPersonCriteria.getAge).toHaveBeenCalled();
            expect(testPersonCriteria.getAge).
                toHaveBeenCalledWith("10/25/1990");
        });

        // callFake usage.
        it("Person's age should be greater than " +
            "or equal to 18 years", function() {
            var testPersonCriteria = new Person2();
            spyOn(testPersonCriteria, "getAge").and.callFake(function()
            {
                return 18;
            });
            testPersonCriteria.ValidateAge("10/25/1990");
            expect(testPersonCriteria.getAge).toHaveBeenCalled();
            expect(testPersonCriteria.getAge).
                toHaveBeenCalledWith("10/25/1990");
            expect(testPersonCriteria.getAge()).toEqual(18);
        });

        // returnValue usage.
        it("In Europe, Person's age should " +
            "be greater than or equal to 16 years", function() {
            var testPersonCriteria = new Person2();
            spyOn(testPersonCriteria, "getAge").and.returnValue(16);
            testPersonCriteria.ValidateAge("10/25/1990");
            expect(testPersonCriteria.getAge).toHaveBeenCalled();
            expect(testPersonCriteria.getAge()).toEqual(16);
        });
    });

    describe("Tracking Properties, ", function () {
        beforeEach(function () {
            this.testPersonCriteria = new Person2();
            spyOn(this.testPersonCriteria, "getAge");
            spyOn(this.testPersonCriteria, "checkHIV");

        });
        // .calls.any usage
        describe(".calls.any() property ", function () {
            it("should return 'false' " +
                "if spy is not called at all", function () {
                expect(this.testPersonCriteria.getAge.calls.any())
                    .toEqual(false);
            });
            it("should return 'true' " +
                "if spy is called once", function () {
                this.testPersonCriteria.ValidateAge("10/25/1990");
                expect(this.testPersonCriteria.getAge.calls.any())
                    .toEqual(true);
            });
        });

        // .calls.count usage
        describe(".calls.count() property ", function () {
            it("should track the number of times " +
                "the spy is called", function () {
                expect(this.testPersonCriteria.getAge.calls.count())
                    .toEqual(0);
                this.testPersonCriteria.ValidateAge("10/25/1990");
                this.testPersonCriteria.ValidateAge("10/25/1990");
                expect(this.testPersonCriteria.getAge.calls.count())
                    .toEqual(2);
            });
        });

        // .calls.argsFor usage.
        describe(".calls.argsFor(index) property ", function () {
            it("should return the argument(s) " +
                "corresponding to each call", function () {
                this.testPersonCriteria.ValidateHIV("Name1", "10/25/1990", "B+"); // Call 1
                this.testPersonCriteria.ValidateHIV("Name2", "10/25/1990", "B+"); // Call 2
                this.testPersonCriteria.ValidateHIV("Name3", "10/25/1990", "B+"); // Call 3
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(0))
                    .toEqual(["Name1", "10/25/1990", "B+"]);
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(1))
                    .toEqual(["Name2", "10/25/1990", "B+"]);
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(2))
                    .toEqual(["Name3", "10/25/1990", "B+"]);
            });
        });

        //.calls.allArgs usage.
        describe(".calls.allArgs() property ", function () {
            it("should return the arguments " +
                "for all calls", function () {
                this.testPersonCriteria.ValidateHIV("Name1", "10/25/1990", "B+"); // Call 1
                this.testPersonCriteria.ValidateHIV("Name2", "10/25/1990", "B+"); // Call 2
                this.testPersonCriteria.ValidateHIV("Name3", "10/25/1990", "B+"); // Call 3
                expect(this.testPersonCriteria.checkHIV.calls.allArgs())
                    .toEqual([["Name1", "10/25/1990", "B+"],
                        ["Name2", "10/25/1990", "B+"],
                        ["Name3", "10/25/1990", "B+"]]);
            });
        });

        // .calls.mostRecent usage.
        describe(".calls.mostRecent() property ", function () {
            it("should return the context (the this) and " +
                "arguments for the most recent call", function () {
                this.testPersonCriteria.ValidateHIV("Name1", "10/25/1990", "B+"); // Call 1
                this.testPersonCriteria.ValidateHIV("Name2", "10/25/1990", "B+"); // Call 2
                expect(this.testPersonCriteria.checkHIV.calls.mostRecent())
                expect(this.testPersonCriteria.checkHIV.calls.mostRecent().object)
                    .toBe(this.testPersonCriteria);
            });
        });


        // .calls.first usage.
        describe(".calls.first() property ", function () {
            it("should return the context (the this) " +
                "and arguments for the first call", function () {
                this.testPersonCriteria.ValidateAge("10/25/1990"); //Call1
                this.testPersonCriteria.ValidateAge("11/20/1988"); //Call2
                expect(this.testPersonCriteria.getAge.calls.first().object)
                    .toBe(this.testPersonCriteria);
            });
        });

        // .calls.reset usage.
        describe(".calls.reset() property ", function () {
            it("should clear all " +
                "tracking for a spy", function () {
                this.testPersonCriteria.ValidateAge("10/25/1990");
                expect(this.testPersonCriteria.getAge.calls.any())
                    .toEqual(true);
                this.testPersonCriteria.getAge.calls.reset();
                expect(this.testPersonCriteria.getAge.calls.any())
                    .toBe(false);
            });
        });
    });
});

describe("<ABC> Company: Health Care Solution, ", function() {
    describe("When to donate or receive blood, ", function(){
        describe("Person With O+ Blood Group: ", function(){
            it("can receive the blood of the " +
                "person with O+ blood group", function() {
                var testPersonCriteria = new Person2("John Player", "10/30/1980", "O+", "Receiver");
                spyOn(testPersonCriteria, "MatchBloodGroupToGiveReceive").and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                //Verify, callback method is called or not
                expect(callback).toHaveBeenCalled();
                expect(callback.calls.any()).toEqual(true);
                expect(callback.calls.count()).toEqual(1);
                //Verify, MatchBloodGroupToGiveReceive is
                // call and check whether control goes back
                // to the function
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive.calls.any()).toEqual(true);
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive.calls.count()).toEqual(1);
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain("O+");
            });
            it("can give the blood to the " +
                "person with A+ blood group", function() {
                var testPersonCriteria = new Person2("John Player", "10/30/1980", "O+", "Donor");
                spyOn(testPersonCriteria, "MatchBloodGroupToGiveReceive").and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain("A+");
            });
        });

        describe("Person With B- Blood Group: ", function(){
            it("can receive the blood of the " +
                "person with B- blood group", function() {
                var testPersonCriteria = new Person2("John Player",
                    "10/30/1980", "B-", "Receiver");
                spyOn(testPersonCriteria, "MatchBloodGroupToGiveReceive").
                    and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain("B-");
            });
            it("can receive the blood of the " +
                "person with O- blood group", function() {
                var testPersonCriteria = new Person2("John Player",
                    "10/30/1980", "B-", "Receiver");
                spyOn(testPersonCriteria, "MatchBloodGroupToGiveReceive").
                    and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain("O-");
            });
        });
    });
});


// ------------------------------------ source
var Person2 = function(name, DOB, bloodgroup, donor_receiver) {
    this.myName = name || "Larry Page";
    this.myDOB = DOB || "10/25/1990";
    this.myBloodGroup = bloodgroup || "B-";
    this.donor_receiver = donor_receiver;
    this.ValidateAge = function(myDOB){
        this.myDOB = myDOB || DOB;
        return this.getAge(this.myDOB);
    };
    this.ValidateHIV = function(personName,personDOB,personBloodGroup){
        this.myName = personName || this.myName;
        this.myDOB = personDOB || this.myDOB;
        this.myBloodGroup = personBloodGroup || this.myBloodGroup;
        return this.checkHIV(this.myName, this.myDOB, this.
            myBloodGroup);
    };
    this.ValidateBloodGroup = function(callback){
        var _this = this;
        var matchBloodGroup;
        this.MatchBloodGroupToGiveReceive(function (personBloodGroup) {
            _this.personBloodGroup = personBloodGroup;
            matchBloodGroup = personBloodGroup;
            callback.call(_this, _this.personBloodGroup);
        });
        return matchBloodGroup;
    };
};
Person2.prototype.getAge = function(birth){
    console.log("getAge() function is called");
    var calculatedAge=0;
    // Logic to calculate person's age will be implemented later
    if (calculatedAge<18) {
        throw new ValidationError("Person must be 18 years or older");
    }
    return calculatedAge;
};
Person2.prototype.checkHIV = function(pName, pDOB, pBloodGroup){
    console.log("checkHIV() function is called");
    bolHIVResult=true;
    // Logic to verify HIV+ will be implemented later
    if (bolHIVResult == true) {
        throw new ValidationError("A person is infected with HIV+");
    }

    return bolHIVResult;
};
Person2.prototype.MatchBloodGroupToGiveReceive = function(callback){
    var matchBloodGroup;
    if (this.donor_receiver == null || this.donor_receiver == undefined) {
        throw new ValidationError("Argument (donor_receiver) is missing");
    }
    if (this.myBloodGroup == "O+" && this.donor_receiver.toUpperCase()
        == "RECEIVER"){
        matchBloodGroup = ["O+"];
    }else if (this.myBloodGroup == "O+" && this.donor_receiver.
            toUpperCase() == "DONOR"){
        matchBloodGroup = ["A+"];
    }else if (this.myBloodGroup == "B-" && this.donor_receiver.
            toUpperCase() == "RECEIVER"){
        matchBloodGroup = ["B-", "O-"];
    }
    callback.call(this, matchBloodGroup);
};

// Define custom error for validation
function ValidationError(message) {
    this.message = message;
}
ValidationError.prototype = Object.create(Error.prototype);
