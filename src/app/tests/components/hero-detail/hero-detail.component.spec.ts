import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HeroDetailComponent } from '../../../components/hero-detail/hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../../services/hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach( () => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockActivatedRoute = {
            snapshot: { paramMap: {get: () => {return '3'; } }}
        }

        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations:[HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute },
                {provide: HeroService, useValue: mockHeroService },
                {provide: Location, useValue: mockLocation }
             ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}))
    });

    it('Mostrar nombre del Heroe en un tag "H2"', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    it('Actualizar Heroe cuando guardamos', fakeAsync (() => {
        mockHeroService.updateHero.and.returnValue(of({}))
        fixture.detectChanges();

        fixture.componentInstance.save();
        flush();
        // tick(250);

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    // it('Actualizar Heroe cuando guardamos', waitForAsync (() => {
    //     mockHeroService.updateHero.and.returnValue(of({}))
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     fixture.whenStable().then( ()=> {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     })
    // }));

});