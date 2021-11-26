import { of } from 'rxjs';
import { HeroesComponent } from '../../../components/heroes/heroes.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let mockHeroService;
    let HEROES;

    beforeEach( () => {
        HEROES = [
            {id: 1, name: 'SpidesDude', strength: 8},
            {id: 1, name: 'Wonderful Woman', strength: 24},
            {id: 1, name: 'SuperMan', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

    describe('Accion: Eliminar', () => {
        it('Eliminar el heroe indicado de la lista de heroes', ()=> {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });

        it('Ejecutar deleteHero()', ()=> {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });

});