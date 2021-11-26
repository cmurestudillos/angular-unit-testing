import { StrengthPipe } from '../../pipes/strength.pipe';

describe('StrengthPipe', () => {
    it('Debería mostrarse "débil" si la fuerza es 5', ()=> {
        let pipe = new StrengthPipe();

        let value = pipe.transform(5);
        expect(value).toEqual('5 (debil)');

    });

    it('Debería mostrarse "fuerte" si la fuerza es 10', ()=> {
        let pipe = new StrengthPipe();

        let value = pipe.transform(10);
        expect(value).toEqual('10 (fuerte)');
    });

});