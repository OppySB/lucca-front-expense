import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseHomeComponent } from './expense-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ExpenseApiService, Message, SaveExpenseEventEmitterService } from '@lucca/expense';
import { Expense } from '@lucca/expense';
import { of } from 'rxjs/internal/observable/of';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MessageEventEmitterService } from '@lucca/expense';

describe('ExpenseHomeComponent', () => {
    let component: ExpenseHomeComponent;
    let fixture: ComponentFixture<ExpenseHomeComponent>;
    let router: Router;
    let expenseApiService: ExpenseApiService;
    let saveExpenseEventEmitterService: SaveExpenseEventEmitterService;
    let messageEventEmitterService: MessageEventEmitterService;
    let messageService: MessageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MessagesModule,
                TranslateTestingModule
                    .withTranslations("fr", require("../../../assets/i18n/fr-FR.json"))
                    .withDefaultLanguage("fr"),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [MessageService],
            declarations: [ExpenseHomeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExpenseHomeComponent);
        router = TestBed.inject(Router);
        expenseApiService = TestBed.inject(ExpenseApiService);
        saveExpenseEventEmitterService = TestBed.inject(SaveExpenseEventEmitterService);
        messageEventEmitterService = TestBed.inject(MessageEventEmitterService);
        messageService = TestBed.inject(MessageService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getNatureTagColor', () => {
        it('getNatureTagColor restaurant', () => {
            expect(component.getNatureTagColor('restaurant')).toEqual(
                'warning'
            );
        });
        it('getNatureTagColor trip', () => {
            expect(component.getNatureTagColor('trip')).toEqual('success');
        });
    });

    it('gotToCreate', () => {
        spyOn(router, 'navigateByUrl').and.callThrough();
        component.gotToCreate();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/create');
    });

    it('gotToUpdate', () => {
        spyOn(router, 'navigateByUrl').and.callThrough();
        component.gotToUpdate(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/update/1');
    });

    describe('ngOnInit', () => {
        it('ngOnInit', () => {
            const expenses: Expense[] = [
                { id: 1 } as Expense,
                { id: 2 } as Expense,
            ];
            spyOn(expenseApiService, 'getExpenses').and.returnValue(of(expenses));
            component.ngOnInit();
            expect(component.expenses).toEqual(expenses);
        });
        it('ngOnInit subscribe to save emitter', () => {

            spyOn(expenseApiService, 'getExpenses').and.returnValue(of(null));
            spyOn(component, 'loadExpense');
            spyOn(component, 'notifyMessage');
            component.ngOnInit();

            saveExpenseEventEmitterService.OnSaveExpense();
            messageEventEmitterService.OnMessage({detail: "test"} as Message);
            expect(component.loadExpense).toHaveBeenCalledTimes(3);
            expect(component.notifyMessage).toHaveBeenCalled();
        });
    });

    it('notifyMessage', () => {
        spyOn(messageService, 'add');
        component.notifyMessage({detail: 'test'} as Message);
        expect(messageService.add).toHaveBeenCalled();
    });
    
});
