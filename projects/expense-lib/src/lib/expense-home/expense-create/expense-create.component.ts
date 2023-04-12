import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseApiService, Expense, SaveExpenseEventEmitterService } from '@lucca/expense/src/lib/common';
import { Router } from '@angular/router';
import moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lucca-expense-create',
    templateUrl: './expense-create.component.html',
    styleUrls: ['./expense-create.component.scss'],
    providers: [MessageService]
})
export class ExpenseCreateComponent implements OnInit {

    public createPanelVisible = false;
    public expenseForm: FormGroup;
    public hideDistance = true;
    public natureType = [
        { name: 'Restaurant', value: 'restaurant' },
        { name: 'Déplacement', value: 'trip' }
    ];

    public constructor(
        private readonly expenseApiService: ExpenseApiService,
        private readonly saveExpenseEventEmitterService: SaveExpenseEventEmitterService,
        private readonly router: Router,
        private readonly messageService: MessageService
    ) {}

    public ngOnInit(): void {
        this.createEditForm();
        this.expenseForm.valueChanges.subscribe(() => {
            /**
             * Affichage ou non du champs Distance/Invités
             */
            if (this.expenseForm.get('nature').value.value === 'restaurant') {
                this.hideDistance = true;
            } else {
                this.hideDistance = false;
            }
        });
    }

    /**
     * Initilise le formulaire
     */
    public onOpen(): void {
        this.createEditForm();
        this.createPanelVisible = true;
    }

    /**
     * Création du formulaire
     */
    public createEditForm(): void {
        this.expenseForm = new FormGroup({
            nature: new FormControl(
                { name: 'Restaurant', value: 'restaurant' },
                [Validators.required]
            ),
            amount: new FormControl(0, [Validators.required]),
            comment: new FormControl('', [Validators.required]),
            purchasedOn: new FormControl('', [Validators.required]),
            distance: new FormControl(0, []),
            invites: new FormControl(0, [])
        });
    }

    /**
     * Vérifie si le formulaire est valide ou non
     * @returns true si le formulaire est valide
     */
    public checkFormIsValid(): boolean {
        if (
            this.expenseForm.valid &&
            ((this.expenseForm.get('nature').value.value === 'restaurant' &&
                this.expenseForm.get('invites').value !== null) ||
                (this.expenseForm.get('nature').value.value === 'trip' &&
                    this.expenseForm.get('distance').value !== null))
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *  Sauvegarde de la dépense
     */
    public save(): void {
        this.expenseApiService.save(this.getExpenseFromEditForm()).subscribe({
            next: () => {
                // On emet l'event d'enregistrement pour rechargement de la grille
                this.saveExpenseEventEmitterService.OnSaveExpense();
                // Affichage du message de succès
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sauvegarde',
                    life: 5000,
                    closable: true,
                    detail: 'la dépense a été sauvegardée'
                });
                this.createPanelVisible = false;
            },
            error: (error) => {
                console.error('There was an error!', error);
                this.messageService.add({
                    severity: 'error',
                    life: 5000,
                    closable: true,
                    summary: 'Erreur de sauvegarde',
                    detail: 'Une erreur de sauvegarde est survenu.'
                });
            }
        });
    }

    /**
     * formatte une dépense à partir des données du formulaire
     * @returns Expense une dépense
     */
    public getExpenseFromEditForm(): Expense {
        const expense: Expense = {
            amount: this.expenseForm.get('amount').value,
            nature: this.expenseForm.get('nature').value.value,
            comment: this.expenseForm.get('comment').value,
            purchasedOn: moment(
                this.expenseForm.get('purchasedOn').value
            ).format('YYYY-MM-DD')
        };
        if (expense.nature === 'restaurant') {
            expense.invites = this.expenseForm.get('invites').value;
        } else {
            expense.distance = this.expenseForm.get('distance').value;
        }

        return expense;
    }

}
