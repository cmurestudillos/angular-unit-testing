import { MessageService } from '../../services/message.service';

describe('MessageService', () => {
    let msgService: MessageService;

    beforeEach( () => {
        msgService = new MessageService();
    });

    it('No deberia de haber mensajes para empezar', ()=> {
        expect(msgService.messages.length).toBe(0);
    });

    it('Deberia agregar un mensaje cuando se ejecute "agregar"', ()=> {
        msgService.add('message1');
        expect(msgService.messages.length).toBe(1);
    });

    it('Deberia eliminar todos los mensajes cuando "clear" se ejecute', ()=> {
        msgService.add('message1');

        msgService.clear();
        expect(msgService.messages.length).toBe(0);
    });

});