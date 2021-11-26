import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
    let mockMessageService;
    let controller: HttpTestingController;
    let service: HeroService;

    beforeEach( () => {
        mockMessageService = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });
        controller = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    });

    describe('getHero', () => {
        it('Realizar llamada a la "api" con la URL correcta', ()=> {
            // llamar getHero
            service.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4);
            });
            // Test realizado con la URL correcta
            const req = controller.expectOne('api/heroes/4')
            req.flush({id:4, name: 'Superdude', strength: 100});
            expect(req.request.method).toBe('GET');
            
            controller.verify();
        });
    });

});

