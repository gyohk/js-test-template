describe("Jasmine Matchers", function () {
    var stockinhand_item1, item1;

    // setUp and tearDown.
    beforeEach(function () {
        stockinhand_item1 = 11, item1 = 1;
        console.log("beforeEach: Stock in hand for item1 before spec execution = " + stockinhand_item1);
    });

    afterEach(function () {
        stockinhand_item1 = 0, item1 = 0;
        console.log("afterEach: Stock in hand for item1 once spec executed = " + stockinhand_item1);
    });


    // regExp test.
    it("'toMatch' matcher should be applied successfully for regular expressions", function () {
        var strString1 = "Packt Cookbooks are an excellent source of learning";
        var strPhone = "001-789-56-67";
        expect(strString1).toMatch(/Cookbooks/);
        expect(strString1).toMatch(/cookbooks/i);
        expect(strString1).not.toMatch(/Java/);
        expect(strPhone).toMatch(/\d{3}-\d{3}-\d{2}-\d{2}/);
    });

    describe("toEqual matcher should be applied successfully", function () {
        // toEqual() test.
        it("if numbers are equal", function () {
            var intVar = 15;
            expect(intVar).toEqual(15);
        });
        it("if strings are equal", function () {
            var strVar = "Jasmine Cookbook";
            expect(strVar).toEqual("Jasmine Cookbook");
        });
        it("if objects are equal", function () {
            var MyObjectj1 = {a: 12, b: 13};
            var MyObjectj2 = {a: 12, b: 13};
            expect(MyObjectj1).toEqual(MyObjectj2);
            expect(MyObjectj1.a).toEqual(MyObjectj2.a);
            expect(MyObjectj1.a).not.toEqual(MyObjectj2.b);

        });
        it("if arrays are equal", function () {
            expect([8, 9, 10]).toEqual([8, 9, 10]);
            expect([8, 9, 10, 11]).not.toEqual([8, 9, 10]);
        });
    });

    // toBe() test.
    it("toBe matcher should be applied successfully for literals. variables and objects", function () {
        var MyObj = {foo: "foo"};
        var MySameObj = {foo: "foo"};
        var strVar = "Jasmine Cookbook";
        var myArr = [8, 9, 10];

        expect(MyObj).toBe(MyObj);
        expect(MySameObj).not.toBe(MyObj);
        expect(MySameObj).toEqual(MyObj);
        expect(strVar).toBe("Jasmine Cookbook");
        expect(myArr).toEqual([8, 9, 10]);
        expect(myArr).not.toBe([8, 9, 10]);
    });

    // toBeDefined() test.
    it("toBeDefined should be applied successfully to Compares against defined.", function () {
        var MyObj = {
            foo: "foo"
        };
        var MyFunction = (function () {
        })();
        var strUndefined;
        expect("Jasmine Cookbooks").toBeDefined();
        expect(MyObj).toBeDefined();
        expect(MyObj.foo).toBeDefined();
        expect(MyFunction).not.toBeDefined();
        expect(strUndefined).not.toBeDefined();
    });

    // toBeNull() test.
    it("toBeNull matcher should be applied successfully to compare against null", function () {
        var nullValue = null;
        var valueUndefined;
        var notNull = "notNull";

        expect(null).toBeNull();
        expect(nullValue).toBeNull();
        expect(valueUndefined).not.toBeNull();
        expect(notNull).not.toBeNull();
    });

    // toBeTruthy() test.
    it("toBeTruthy matcher should be applied successfully for Boolean casting testing", function () {
        var MyVar1 = 12;
        var MyVar2 = "True for Non Empty Strings";

        expect(true).toBeTruthy();
        expect("Jasmine Cookbook").toBeTruthy();
        expect(MyVar1).toBeTruthy();
        expect(MyVar2).toBeTruthy();
    });

    // toBeFalsy() test.
    it("toBeFalsy matcher should be applied successfully for Boolean casting testing", function () {
        var MyVar1 = 12;
        var MyVar2 = "True for Non Empty Strings";

        expect(false).toBeFalsy();
        expect(null).toBeFalsy();
        expect(true).not.toBeFalsy();
        expect("Jasmine Cookbook").not.toBeFalsy();
        expect(MyVar1).not.toBeFalsy();
        expect(MyVar2).not.toBeFalsy();
    });

    // toContain() test.
    it("toContain matcher should be applied successfully for finding an item in an Array", function () {
        var MyArray = ["Jasmine", "Cookbook", "JavaScript"];

        expect([1, 2, 3]).toContain(2);
        expect([1, 2, 3]).toContain(2, 3);
        expect(MyArray).toContain("Cookbook");
        expect([1, 2, 3]).not.toContain(4);
        expect(MyArray).not.toContain("Java");
    });

    //toBeLessThan() test.
    it("toBeLessThan matcher should be applied successfully for mathematical comparisons", function() {
        var pi = 3.1415926, g = 9.71; num1=5, num2=9;
        expect(pi).toBeLessThan(g);
        expect(num1).toBeLessThan(num2);
        expect(g).not.toBeLessThan(pi);
        expect(num2).not.toBeLessThan(num1);
    });

    //toBeGreaterThan() test.
    it("toBeGreaterThan matcher should be applied successfully for mathematical comparisons", function() {
        var pi = 3.1415926, g = 9.71; num1=5, num2=6;
        expect(g).toBeGreaterThan(pi);
        expect(num2).toBeGreaterThan(num1);
        expect(pi).not.toBeGreaterThan(g);
        expect(num1).not.toBeGreaterThan(num2);
    });

    // toBeCloseTo() test.
    it("toBeCloseTo matcher should be applied for precision math comparison", function() {
        var pi = 3.1415926, e = 2.78;
        expect(pi).not.toBeCloseTo(e);
        expect(pi).toBeCloseTo(e,0);
        expect(4.334).toBeCloseTo(4.334);
        expect(4.334).toBeCloseTo(4.3345,1);
        expect(4.334).toBeCloseTo(4.3345,2);
        expect(4.334).not.toBeCloseTo(4.3,2);
        expect(4.223).not.toBeCloseTo(4.22,3);
        expect(4.223).not.toBeCloseTo(4.22,4);
    });
});