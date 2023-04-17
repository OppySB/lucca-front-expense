import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    ExpenseApiService,
    NatureTypeService,
    Expense,
    SaveExpenseEventEmitterService,
    Message,
    MessageEventEmitterService
} from '@lucca/expense/src/lib/common';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lucca-expense-home',
    templateUrl: './expense-home.component.html',
    styleUrls: ['./expense-home.component.scss']
})
export class ExpenseHomeComponent implements OnInit {

    public expenses: Expense[] = [];
    public sidebarVisible1: boolean;
    public natureType = [];
    public constructor(
        private readonly translateService: TranslateService,
        private readonly expenseApiService: ExpenseApiService,
        private readonly natureTypeService: NatureTypeService,
        private readonly saveExpenseEventEmitterService: SaveExpenseEventEmitterService,
        private readonly messageEventEmitterService: MessageEventEmitterService,
        private readonly messageService: MessageService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.natureType = this.natureTypeService.getNatureType();
        // Chargement des dépenses de la grille
        this.loadExpense();

        this.saveExpenseEventEmitterService.subOnSaveExpense =
            this.saveExpenseEventEmitterService.invokeOnSaveExpense.subscribe(
                () => {
                    this.loadExpense();
                }
            );
        this.messageEventEmitterService.subOnMessage =
            this.messageEventEmitterService.invokeOnMessage.subscribe(
                (message: Message) => {
                    this.notifyMessage(message);
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

    /**
     * Affiche un message dans la page
     * @param message
     */
    public notifyMessage(message: Message): void {
        this.messageService.add({
            severity: message.severity,
            life: message.life,
            closable: message.closable,
            summary: message.summary,
            detail: message.detail
        });
    }

}
