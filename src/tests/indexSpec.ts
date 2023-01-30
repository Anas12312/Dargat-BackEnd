function add(a:number, b:number):number {
    return a + b;
}
it('expect add to return 12', () => {
    expect(add(7,5)).toEqual(12);
})