import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from '../../../components/heroes/heroes.component';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../../services/hero.service';

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        // templateUrl: '<div></div>',
      })
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }

    beforeEach( () => {
        HEROES = [
            {id: 1, name: 'SpidesDude', strength: 8},
            {id: 1, name: 'Wonderful Woman', strength: 24},
            {id: 1, name: 'SuperMan', strength: 55}
        ]        
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations:[HeroesComponent, FakeHeroComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('Obtener heroes', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('Mostrar listado de heroes', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

});