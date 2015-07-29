describe("<XYZ> Company: Online Order Module", function() {
    describe("When to place the online order: ", function(){
        beforeEach(function() {
            jasmine.addMatchers(personAgeValidationMatcher);
        });

        it("Age should be greater than " + "or equal to 21 years", function() {
            var myPerson = new Person(25, "James", "Smith");
            expect(myPerson.age).toBeOlderThan(20);
            expect(myPerson.age).not.toBeOlderThan(26);
        });

    });
});

// ------------------------------------ source
// custom matcher.
var personAgeValidationMatcher = {
    toBeOlderThan: function() {
        return {
            compare: function(actualAge, expectedAge) {
                if (expectedAge === undefined) {
                    throw "Expected value is required";
                }
                if (actualAge>=expectedAge) {
                    return {
                        pass:true,
                        message:"Person is eligible to place online order"
                    };
                }else {
                    return {
                        pass:false,
                        message:"Minimum person's age should be 21 years to place the order online"
                    };
                };
            }
        };
    }
};

// testing target class.
var Person = function (age, firstName, lastName) {
    this.age=age;
    this.firstName = firstName;
    this.lastName = lastName;
};