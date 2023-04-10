import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseApiService {

    // TODO déplacer l'uri en conf
    private readonly url = 'http://localhost:3000/expenses';

    public constructor(public readonly http: HttpClient) { 

    }

    /**
     * Récupère la liste des dépenses
     * @returns la liste des dépenses
     */
    public getExpenses(): Observable<Expense[]> {
        return this.http
            .get<{items: Expense[]}>(this.url)
            .pipe(
                map(response => response.items || [])
            );
    }

}
