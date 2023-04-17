import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ExpenseCreateComponent } from './expense-create.component';
import { Expense, ExpenseApiService } from '@lucca/expense/src/public-api';
import { of, throwError } from 'rxjs';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ExpenseCreateComponent', () => {
    let component: ExpenseCreateComponent;
    let fixture: ComponentFixture<ExpenseCreateComponent>;
    let messageService: MessageService;
    let expenseApiService: ExpenseApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations(
                    'fr',
                    require('../../../../assets/i18n/fr-FR.json')
                ).withDefaultLanguage('fr'),
            ],
            providers: [MessageService, ExpenseApiService],
            declarations: [ExpenseCreateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExpenseCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        messageService = TestBed.inject(MessageService);
        expenseApiService = TestBed.inject(ExpenseApiService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', () => {
        spyOn(component, 'createEditForm').and.callThrough();
        component.ngOnInit();
        component.expenseForm
            .get('nature')
            .setValue({ name: 'Restaurant', value: 'restaurant' });
        expect(component.createEditForm).toHaveBeenCalled();
        expect(component.hideDistance).toEqual(true);
    });

    describe('displayDistanceInvites', () => {
        it('displayDistanceInvites', () => {
            component.ngOnInit();
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });

            component.displayDistanceInvites();
            expect(component.hideDistance).toEqual(true);
        });
        it('displayDistanceInvites', () => {
            component.ngOnInit();
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Déplacement', value: 'trip' });

            component.displayDistanceInvites();
            expect(component.hideDistance).toEqual(false);
        });
    });

    it('onOpen', () => {
        component.createPanelVisible = false;
        spyOn(component, 'createEditForm');
        component.onOpen();
        expect(component.createPanelVisible).toEqual(true);
        expect(component.createEditForm).toHaveBeenCalled();

        component.expenseForm
            .get('nature')
            .setValue({ name: 'Déplacement', value: 'trip' });
    });

    describe('switchNature ', () => {
        it('switchNature restaurant', () => {
            component.expenseForm.get('invites').setValue(2);
            spyOn(component, 'displayDistanceInvites');
            component.switchNature( {
                value: {
                    name: 'EXPENSE-LIB.EDIT.FORM.NATURE_RESTAURANT',
                    value: 'restaurant'
                }
            });
            expect(component.expenseForm.get('invites').value).toEqual(0);
            expect(component.displayDistanceInvites).toHaveBeenCalled();
        });
        it('switchNature trip', () => {
            component.expenseForm.get('distance').setValue(2);
            spyOn(component, 'displayDistanceInvites');
            component.switchNature( {
                value: {
                    name: 'EXPENSE-LIB.EDIT.FORM.NATURE_TRIP',
                    value: 'trip'
                }
            });
            expect(component.expenseForm.get('distance').value).toEqual(1);
            expect(component.displayDistanceInvites).toHaveBeenCalled();
        });
    });

    it('createEditForm', () => {
        component.createEditForm();
        expect(component.expenseForm).toBeDefined();
        expect(component.expenseForm.get('nature')).toBeInstanceOf(FormControl);
        expect(component.expenseForm.get('nature').value).toEqual({
            label: 'EXPENSE-LIB.EDIT.FORM.NATURE_RESTAURANT',
            value: 'restaurant',
        });

        expect(component.expenseForm.get('amount')).toBeInstanceOf(FormControl);
        expect(component.expenseForm.get('amount').value).toEqual(0.01);

        expect(component.expenseForm.get('comment')).toBeInstanceOf(
            FormControl
        );
        expect(component.expenseForm.get('comment').value).toEqual('');

        expect(component.expenseForm.get('purchasedOn')).toBeInstanceOf(
            FormControl
        );
        expect(component.expenseForm.get('purchasedOn').value).toEqual('');

        expect(component.expenseForm.get('invites')).toBeInstanceOf(
            FormControl
        );
        expect(component.expenseForm.get('invites').value).toEqual(0);

        expect(component.expenseForm.get('distance')).toBeInstanceOf(
            FormControl
        );
        expect(component.expenseForm.get('distance').value).toEqual(1);
    });

    describe('checkFormIsValid', () => {
        it('checkFormIsValid ok', () => {
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('purchasedOn').setValue('2002-03-22');
            expect(component.checkFormIsValid()).toEqual(true);

            component.expenseForm
                .get('nature')
                .setValue({ name: 'Déplacement', value: 'trip' });
            component.expenseForm.get('distance').setValue(1);
            expect(component.checkFormIsValid()).toEqual(true);
        });

        it('checkFormIsValid nok', () => {
            component.expenseForm.get('invites').setValue(null);
            expect(component.checkFormIsValid()).toEqual(false);
        });
    });

    describe('create', () => {
        it('create ok', () => {
            spyOn(expenseApiService, 'create').and.returnValue(
                of({ id: 1 } as Expense)
            );
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('distance').setValue(1);

            component.create();

            expect(component.createPanelVisible).toEqual(false);
            expect(expenseApiService.create).toHaveBeenCalled();
        });
        it('create nok', () => {
            spyOn(expenseApiService, 'create').and.returnValue(
                throwError('test error')
            );
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('distance').setValue(1);

            component.create();

            expect(component.createPanelVisible).toEqual(true);
            expect(expenseApiService.create).toHaveBeenCalled();
        });
    });

    describe('save', () => {
        it('save create', () => {
            spyOn(component, 'create');
            spyOn(component, 'update');
            component.isUpdate = false;
            component.save();
            expect(component.create).toHaveBeenCalled();
            expect(component.update).not.toHaveBeenCalled();
        });
        it('save update', () => {
            spyOn(component, 'create');
            spyOn(component, 'update');
            component.isUpdate = true;
            component.save();
            expect(component.update).toHaveBeenCalled();
            expect(component.create).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('update ok', () => {
            spyOn(expenseApiService, 'update').and.returnValue(
                of({ id: 1 } as Expense)
            );
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('distance').setValue(1);

            component.update();

            expect(component.createPanelVisible).toEqual(false);
            expect(expenseApiService.update).toHaveBeenCalled();
        });
        it('update nok', () => {
            spyOn(expenseApiService, 'update').and.returnValue(
                throwError('test error')
            );
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('distance').setValue(1);

            component.update();

            expect(component.createPanelVisible).toEqual(true);
            expect(expenseApiService.update).toHaveBeenCalled();
        });
    });

    describe('getExpenseFromEditForm', () => {
        it('getExpenseFromEditForm restaurant', () => {
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Restaurant', value: 'restaurant' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('distance').setValue(1);
            component.expenseForm.get('purchasedOn').setValue("20/03/2023");

            const expense = component.getExpenseFromEditForm();

            expect(expense).toEqual({
                amount: 11,
                nature: 'restaurant',
                comment: 'test',
                purchasedOn: '2023-03-20',
                invites: 1,
            } as Expense);
        });
        it('getExpenseFromEditForm trip', () => {
            component.createPanelVisible = true;
            component.expenseForm
                .get('nature')
                .setValue({ name: 'Déplacement', value: 'trip' });
            component.expenseForm.get('amount').setValue(11);
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('invites').setValue(1);
            component.expenseForm.get('purchasedOn').setValue("20/03/2023");

            component.expenseForm.get('distance').setValue(1);

            component.isUpdate = true;
            component.expenseId = 1;
            const expense = component.getExpenseFromEditForm();

            expect(expense).toEqual({
                id: 1,
                amount: 11,
                nature: 'trip',
                comment: 'test',
                purchasedOn: '2023-03-20',
                distance: 1,
            } as Expense);
        });
    });


    describe('loadIfUpdate', () => {
        it('loadIfUpdate ok trip', () => {
            spyOn(expenseApiService, 'getExpenseById').and.returnValue(
                of({
                id: 1,
                amount: 11,
                nature: 'trip',
                comment: 'test',
                purchasedOn: '2023-03-20',
                distance: 1,
            } as Expense)
            );
            spyOn(component, 'displayDistanceInvites');
            component.isUpdate = true;
            component.loadIfUpdate();

            expect(component.expenseForm.get('amount').value).toEqual(11);
            expect(component.expenseForm.get('nature').value).toEqual(component.natureType[1]);
            expect(component.expenseForm.get('comment').value).toEqual("test");
            expect(component.expenseForm.get('purchasedOn').value).toEqual('20/03/2023');
            expect(component.expenseForm.get('distance').value).toEqual(1);
            expect(expenseApiService.getExpenseById).toHaveBeenCalled();
            expect(component.displayDistanceInvites).toHaveBeenCalled();
        });
        it('loadIfUpdate ok restaurant', () => {
            spyOn(expenseApiService, 'getExpenseById').and.returnValue(
                of({
                id: 1,
                amount: 11,
                nature: 'restaurant',
                comment: 'test',
                purchasedOn: '2023-03-20',
                distance: 1,
            } as Expense)
            );
            spyOn(component, 'displayDistanceInvites');
            component.isUpdate = true;
            component.loadIfUpdate();

            expect(component.expenseForm.get('amount').value).toEqual(11);
            expect(component.expenseForm.get('nature').value).toEqual(component.natureType[0]);
            expect(component.expenseForm.get('comment').value).toEqual("test");
            expect(component.expenseForm.get('purchasedOn').value).toEqual('20/03/2023');
            expect(component.expenseForm.get('distance').value).toEqual(1);
            expect(expenseApiService.getExpenseById).toHaveBeenCalled();
            expect(component.displayDistanceInvites).toHaveBeenCalled();
        });
        it('loadIfUpdate not update', () => {
           spyOn(expenseApiService, 'getExpenseById').and.returnValue(
                of({
                id: 1,
                amount: 11,
                nature: 'restaurant',
                comment: 'test',
                purchasedOn: '20/03/2023',
                distance: 1,
            } as Expense)
            );
            spyOn(component, 'displayDistanceInvites');
            component.isUpdate = false;
            component.loadIfUpdate();

            expect(expenseApiService.getExpenseById).not.toHaveBeenCalled();
            expect(component.displayDistanceInvites).not.toHaveBeenCalled();
        });

        it('loadIfUpdate not update', () => {
            spyOn(expenseApiService, 'getExpenseById').and.returnValue(
                throwError('test error')
            );
             spyOn(component, 'displayDistanceInvites');
             component.isUpdate = true;
             component.loadIfUpdate();
 
             expect(expenseApiService.getExpenseById).toHaveBeenCalled();
             expect(component.displayDistanceInvites).not.toHaveBeenCalled();
         });
    });
});
