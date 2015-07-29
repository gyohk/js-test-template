describe("jasmine.any", function() {
    it("should be applied successfully for comparing arguments",
        function() {
            var mydate = new Date("11/20/2014"); // mm//dd/yyyy
            var myMobile = new MobilePhone("Samsung","White",
                "8 Megapixels",mydate.toDateString(),
                ["Android", "Lollipop","1.2 GHz Quad Core "]);
            expect(myMobile).toEqual(jasmine.any(Object));
            expect(myMobile.mobileRating()).toEqual(jasmine.any(String),
                jasmine.any(Array));
            expect(12).toEqual(jasmine.any(Number));
        });
});

describe("jasmine.objectContaining", function() {
    it("should match/compare objects " +
        "corresponding to keys/values " +
        "pairs in the actual", function() {
        var mydate = new Date("11/20/2014"); // mm//dd/yyyy
        var myMobile = new MobilePhone("Samsung",
            "White", "8 Megapixels",
            mydate.toDateString(),
            ["Android", "Lollipop","1.2 GHz Quad Core"]);
        expect(myMobile).toEqual(jasmine.objectContaining({
            brand: "Samsung",
            color: "White",
            primaryCamera: "8 Megapixels"
        }));
    });
    describe("when used with a spy", function(){
        it("should be applied successfully " +
            "for comparing arguments", function() {
            myMobile = jasmine.createSpy('myMobile');
            myMobile({
                brand: "Samsung",
                foo: "foo"
            });
            expect(myMobile).toHaveBeenCalledWith(jasmine.objectContaining({
                brand: "Samsung",
                foo: "foo"
            }));

        });
    });
});

describe("JavaScript Timeout Functions", function() {
    var mytimerCallback;
    beforeEach(function() {
        mytimerCallback = jasmine.createSpy("mytimerCallback");
        jasmine.clock().install();
    });
    afterEach(function() {
        jasmine.clock().uninstall();
    });
    describe("With setTimeout() Method:", function(){
        it("should be called synchronously using Jasmin Clock",
            function() {
                setTimeout(function() {
                    mytimerCallback();
                }, 100);
                expect(mytimerCallback).not.toHaveBeenCalled();
                jasmine.clock().tick(100);
                expect(mytimerCallback).toHaveBeenCalled();
            });
    });
    describe("With setInterval() Method:", function(){
        it("should be called synchronously using Jasmin Clock",
            function() {
                setInterval(function() {
                    mytimerCallback();
                }, 100);
                expect(mytimerCallback).not.toHaveBeenCalled();
                jasmine.clock().tick(101);
                expect(mytimerCallback.calls.count()).toEqual(1);
                jasmine.clock().tick(50);
                expect(mytimerCallback.calls.count()).toEqual(1);
                jasmine.clock().tick(50);
                expect(mytimerCallback.calls.count()).toEqual(2);
                jasmine.clock().tick(100);
                expect(mytimerCallback.calls.count()).toEqual(3);
            });
    });
});

// ------------------------------------ source
function MobilePhone(brand, color, primaryCamera, mdate, platform) {
    this.brand = brand;
    this.color = color;
    this.primaryCamera = primaryCamera;
    this.manufactureDate = mdate;
    this.platform = platform;
}
MobilePhone.prototype.reviewRating = function () {
    return this.mobileRating(this.brand, this.platform);
};
MobilePhone.prototype.mobileRating = function (brand, platform) {
    var reviewRating = '****';
// Logic will be implemented later by collecting data/review from a third
// party system
    return reviewRating;
};
MobilePhone.prototype.finalPrice = function (callback) {
    var _this = this;
    this.mobilePrice(function (finalPrice) {
        _this.finalPrice = finalPrice;
        callback.call(_this, _this.finalPrice);
    });
};
MobilePhone.prototype.mobilePrice = function (callback) {
// Let's use hard coded values for demonstration purpose
// In JavaScript there is
// rounding errors. Always calculate in cents not dollars.
    var price = (50.0 * 100);
    var tax = price * 6;
    price = (price + tax) / 100;
    callback.call(this, price);
};
