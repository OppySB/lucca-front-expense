import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ExpenseCreateComponent } from './expense-create.component';
import { Expense, ExpenseApiService } from '@lucca/expense/src/public-api';
import { of, throwError } from 'rxjs';

describe('ExpenseCreateComponent', () => {
    let component: ExpenseCreateComponent;
    let fixture: ComponentFixture<ExpenseCreateComponent>;
    let messageService: MessageService;
    let expenseApiService: ExpenseApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
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

        component.expenseForm
            .get('nature')
            .setValue({ name: 'Déplacement', value: 'trip' });
        expect(component.hideDistance).toEqual(false);
    });

    it('onOpen', () => {
        component.createPanelVisible = false;
        spyOn(component, 'createEditForm');
        component.onOpen();
        expect(component.createPanelVisible).toEqual(true);
        expect(component.createEditForm).toHaveBeenCalled();
    });

    it('createEditForm', () => {
        component.createEditForm();
        expect(component.expenseForm).toBeDefined();
        expect(component.expenseForm.get('nature')).toBeInstanceOf(FormControl);
        expect(component.expenseForm.get('nature').value).toEqual({
            name: 'Restaurant',
            value: 'restaurant',
        });

        expect(component.expenseForm.get('amount')).toBeInstanceOf(FormControl);
        expect(component.expenseForm.get('amount').value).toEqual(0);

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
        expect(component.expenseForm.get('distance').value).toEqual(0);
    });

    describe('checkFormIsValid', () => {
        it('checkFormIsValid ok', () => {
            component.expenseForm.get('comment').setValue('test');
            component.expenseForm.get('purchasedOn').setValue('2002-03-22');
            expect(component.checkFormIsValid()).toEqual(true);

            component.expenseForm.get('nature').setValue({ name: 'Déplacement', value: 'trip' });
            component.expenseForm.get('distance').setValue(1);
            expect(component.checkFormIsValid()).toEqual(true);
        });

        it('checkFormIsValid nok', () => {
            component.expenseForm.get('invites').setValue(null);
            expect(component.checkFormIsValid()).toEqual(false);
        });
    });

    describe('save', () => {
        it('save ok', () => {
          spyOn(expenseApiService, 'save').and.returnValue(of({id:1} as Expense));
          component.createPanelVisible = true;
          component.expenseForm.get('nature').setValue({ name: 'Restaurant', value: 'restaurant' });
          component.expenseForm.get('amount').setValue(11);
          component.expenseForm.get('comment').setValue("test");
          component.expenseForm.get('invites').setValue(1);
          component.expenseForm.get('distance').setValue(1);

          component.save();

          expect(component.createPanelVisible).toEqual(false);
          expect(expenseApiService.save).toHaveBeenCalled();
         });
        it('save nok', () => {
          spyOn(expenseApiService, 'save').and.returnValue(throwError('test error'));
          component.createPanelVisible = true;
          component.expenseForm.get('nature').setValue({ name: 'Restaurant', value: 'restaurant' });
          component.expenseForm.get('amount').setValue(11);
          component.expenseForm.get('comment').setValue("test");
          component.expenseForm.get('invites').setValue(1);
          component.expenseForm.get('distance').setValue(1);

          component.save();

          expect(component.createPanelVisible).toEqual(true);
          expect(expenseApiService.save).toHaveBeenCalled();
         
        });
    });


    
    describe('getExpenseFromEditForm', () => {
      it('getExpenseFromEditForm restaurant', () => {
        component.createPanelVisible = true;
        component.expenseForm.get('nature').setValue({ name: 'Restaurant', value: 'restaurant' });
        component.expenseForm.get('amount').setValue(11);
        component.expenseForm.get('comment').setValue("test");
        component.expenseForm.get('invites').setValue(1);
        component.expenseForm.get('distance').setValue(1);

        const expense = component.getExpenseFromEditForm();

        expect(expense).toEqual({
          amount: 11,
          nature: 'restaurant',
          comment: 'test',
          purchasedOn: 'Invalid date',
          invites: 1} as Expense);
       });
      it('getExpenseFromEditForm trip', () => {
        component.createPanelVisible = true;
        component.expenseForm.get('nature').setValue({ name: 'Déplacement', value: 'trip' });
        component.expenseForm.get('amount').setValue(11);
        component.expenseForm.get('comment').setValue("test");
        component.expenseForm.get('invites').setValue(1);
        component.expenseForm.get('distance').setValue(1);

        const expense = component.getExpenseFromEditForm();

        expect(expense).toEqual({
          amount: 11,
          nature: 'trip',
          comment: 'test',
          purchasedOn: 'Invalid date',
          distance: 1} as Expense);
      });
  });
});
