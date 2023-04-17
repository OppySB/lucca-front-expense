import { MessageEventEmitterService } from './../events/message-event-emitter.service';
import { TestBed } from '@angular/core/testing';
import { ExpenseMessageService, Message } from '@lucca/expense';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ExpenseMessageService', () => {
    let service: ExpenseMessageService;
    let messageEventEmitterService: MessageEventEmitterService;;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateTestingModule.withTranslations(
                    'fr',
                    require('../../../../assets/i18n/fr-FR.json')
                ).withDefaultLanguage('fr'),
            ],
            providers: [ExpenseMessageService],
        }).compileComponents();
        service = TestBed.inject(ExpenseMessageService);
        messageEventEmitterService = TestBed.inject(MessageEventEmitterService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('sendSuccessMessage', () => {
        spyOn(messageEventEmitterService, 'OnMessage');
        service.sendSuccessMessage();
        expect(messageEventEmitterService.OnMessage).toHaveBeenCalledOnceWith({
            severity: 'success',
            summary: 'EXPENSE-LIB.MESSAGE.SAVE',
            life: 5000,
            closable: true,
            detail: 'EXPENSE-LIB.MESSAGE.SAVE_TEXT'
        } as Message);
    });

    it('sendErrorMessage', () => {
        spyOn(messageEventEmitterService, 'OnMessage');
        service.sendErrorMessage();
        expect(messageEventEmitterService.OnMessage).toHaveBeenCalledOnceWith({
            severity: 'error',
            life: 5000,
            closable: true,
            summary: 'EXPENSE-LIB.MESSAGE.SAVE_ERROR',
            detail: 'EXPENSE-LIB.MESSAGE.SAVE_ERROR_TEXT'
        } as Message);
    });

    it('sendLoadErrorMessage', () => {
        spyOn(messageEventEmitterService, 'OnMessage');
        service.sendLoadErrorMessage();
        expect(messageEventEmitterService.OnMessage).toHaveBeenCalledOnceWith({
            severity: 'error',
            life: 5000,
            closable: true,
            summary: 'EXPENSE-LIB.MESSAGE.EXPENSE_LOAD_ERROR',
            detail: 'EXPENSE-LIB.MESSAGE.EXPENSE_LOAD_ERROR_TEXT',
        } as Message);
    });
});
