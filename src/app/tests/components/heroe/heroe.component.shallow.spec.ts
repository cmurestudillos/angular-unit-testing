import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../../../components/hero/hero.component';

describe('HeroeComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('Obtener el Heroe correcto', () => {
        fixture.componentInstance.hero = {id:1, name: 'SuperDude', strength: 3};
        fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('Mostrar el nombre del heroe en el enlace', () => {
        fixture.componentInstance.hero = {id:1, name: 'SuperDude', strength: 3};
        fixture.detectChanges();

        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('SuperDude');

        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

});