describe('Mi primer Test', () => {
    let sut;

    beforeEach( ()=> {
        sut = {}
    });

    it('should be true if true', ()=> {
        // Inicial
        sut.a = false;
        // Actualizar
        sut.a = true;
        // Confirmar
        expect(sut.a).toBe(true);
    })
});