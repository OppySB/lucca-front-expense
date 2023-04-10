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
        it('getExpenses', () => {
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
});
