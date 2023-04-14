import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Expense, ExpenseApiService } from '@lucca/expense';
import { Observable, of } from 'rxjs';

describe('ExpenseApiService', () => {
    let service: ExpenseApiService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ExpenseApiService],
        }).compileComponents();
        service = TestBed.inject(ExpenseApiService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    describe('getExpenses', () => {
        it('getExpenses', () => {
            const expenseApiResponse = {
                items: [
                    { id: 1 } as Expense,
                    { id: 2 } as Expense,
                    { id: 3 } as Expense,
                ],
            };
            spyOn(service.http, 'get').and.returnValue(of(expenseApiResponse));
            service.getExpenses().subscribe((data) => {
                expect(data).toEqual([
                    { id: 1 } as Expense,
                    { id: 2 } as Expense,
                    { id: 3 } as Expense,
                ]);
            });
            expect(service.http.get).toHaveBeenCalled();
        });
        it('getExpenses wrong tag', () => {
            const expenseApiResponse = {
                test: [
                    { id: 1 } as Expense,
                    { id: 2 } as Expense,
                    { id: 3 } as Expense,
                ],
            };
            spyOn(service.http, 'get').and.returnValue(of(expenseApiResponse));
            service.getExpenses().subscribe((data) => {
                expect(data).toEqual([]);
            });
            expect(service.http.get).toHaveBeenCalled();
        });
    });

    it('getExpenseById', () => {
        const expenseApiResponse = { id: 1 } as Expense;
        spyOn(service.http, 'get').and.returnValue(of(expenseApiResponse));
        service.getExpenseById(1).subscribe((data) => {
            expect(data).toEqual(expenseApiResponse);
        });
        expect(service.http.get).toHaveBeenCalled();
    });

    it('create', () => {
        const expenseApiResponse = { id: 1 } as Expense;
        spyOn(service.http, 'post').and.returnValue(of(expenseApiResponse));
        service.create(expenseApiResponse).subscribe((data) => {
            expect(data).toEqual(expenseApiResponse);
        });
        expect(service.http.post).toHaveBeenCalled();
    });

    it('update', () => {
        const expenseApiResponse = { id: 1 } as Expense;
        spyOn(service.http, 'put').and.returnValue(of(expenseApiResponse));
        service.update(expenseApiResponse, 1).subscribe((data) => {
            expect(data).toEqual(expenseApiResponse);
        });
        expect(service.http.put).toHaveBeenCalled();
    });
});
