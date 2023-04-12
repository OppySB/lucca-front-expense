import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseApiService, Expense, SaveExpenseEventEmitterService } from '@lucca/expense/src/lib/common';

@Component({
    selector: 'lucca-expense-home',
    templateUrl: './expense-home.component.html',
    styleUrls: ['./expense-home.component.scss']
})
export class ExpenseHomeComponent implements OnInit {

    public expenses: Expense[] = [];
    public sidebarVisible1: boolean;

    public constructor(
        private readonly expenseApiService: ExpenseApiService,
        private readonly saveExpenseEventEmitterService: SaveExpenseEventEmitterService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        // Chargement des dépenses de la grille
        this.loadExpense();

        this.saveExpenseEventEmitterService.subOnSaveExpense =
            this.saveExpenseEventEmitterService.invokeOnSaveExpense.subscribe(
                () => {
                    this.loadExpense();
                }
            );
    }

    /**
     * Chargement des dépenses de la grille
     */
    public loadExpense(): void {
        this.expenseApiService
            .getExpenses()
            .subscribe((expenses: Expense[]) => {
                this.expenses = expenses;
            });
    }

    /**
     * renvoie vers la modification d'une dépense
     * @param expenseId l'id de la dépense
     */
    public gotToUpdate(expenseId: number): void {
        this.router.navigateByUrl('/update/' + expenseId.toString());
    }

    /**
     * Renvoie vers la création d'une dépense
     */
    public gotToCreate(): void {
        this.router.navigateByUrl('/create');
    }

    /**
     * Récupère la couleur à afficher dans la grille
     * @param nature Nature de la dépense
     * @returns la couleur à affciher
     */
    public getNatureTagColor(nature: string): string {
        switch (nature) {
            case 'restaurant':
                return 'warning';
            case 'trip':
                return 'success';
        }
    }

}
