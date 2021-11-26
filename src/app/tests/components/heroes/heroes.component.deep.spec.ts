import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../../../services/hero.service';
import { HeroesComponent } from '../../../components/heroes/heroes.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../../../components/hero/hero.component';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub{
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach( () => {
        HEROES = [
            {id: 1, name: 'SpidesDude', strength: 8},
            {id: 1, name: 'Wonderful Woman', strength: 24},
            {id: 1, name: 'SuperMan', strength: 55}
        ]        
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations:[HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('Mostrar Heroe en HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentsDEs.length).toEqual(3);
        for (let i = 0; i < heroComponentsDEs.length; i++) {
            expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it('Llamar a HeroService.deleteHero cuando clickamos el boton eliminar', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const heroComponentsDBG = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // (<HeroComponent>heroComponentsDBG[0].componentInstance).delete.emit(undefined); // Emmiting Events
        // heroComponentsDBG[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: ()=> {} }); // Triggering Events
        heroComponentsDBG[0].triggerEventHandler('delete', null); // Raised Events
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('Añadir un Heroe a la Lista', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();

        const name= 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 5}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value= name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });


    it('Ruta correcta para el primer heroe', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });

});