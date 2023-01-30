"use strict";
function add(a, b) {
    return a + b;
}
it('expect add to return 12', function () {
    expect(add(7, 5)).toEqual(12);
});
