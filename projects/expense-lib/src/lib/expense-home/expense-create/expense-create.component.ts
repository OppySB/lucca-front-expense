import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    ExpenseApiService,
    Expense,
    SaveExpenseEventEmitterService,
    ExpenseMessageService,
    NatureTypeService
} from '@lucca/expense/src/lib/common';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Component({
    selector: 'lucca-expense-create',
    templateUrl: './expense-create.component.html',
    styleUrls: ['./expense-create.component.scss']
})
export class ExpenseCreateComponent implements OnInit {

    @Input() public isUpdate = false;
    @Input() public expenseId: number;
    public createPanelVisible = false;
    public expenseForm: FormGroup;
    public hideDistance = true;
    public natureType = [];

    public constructor(
        private readonly expenseApiService: ExpenseApiService,
        private readonly translateService: TranslateService,
        private readonly natureTypeService: NatureTypeService,
        private readonly saveExpenseEventEmitterService: SaveExpenseEventEmitterService,
        private readonly expenseMessageService: ExpenseMessageService
    ) {}

    public ngOnInit(): void {
        this.natureType = this.natureTypeService.getNatureType();
        this.createEditForm();
    }

    /**
     * Affichage ou non du champs Distance/Invités
     */
    public displayDistanceInvites(): void {
        if (this.expenseForm.get('nature').value.value === 'restaurant') {
            this.hideDistance = true;
        } else {
            this.hideDistance = false;
        }
    }

    /**
     * Initilise le formulaire
     */
    public onOpen(): void {
        this.createEditForm();
        this.createPanelVisible = true;
        this.loadIfUpdate();
    }

    /**
     * gère le changement de nature
     * reset de la valeur dépendante de la nature (distance ou invites)
     */
    public switchNature(event): void {
        if (event.value.value === 'restaurant') {
            this.expenseForm.get('invites').setValue(0);
        } else {
            this.expenseForm.get('distance').setValue(1);
        }
        this.displayDistanceInvites();
    }

    /**
     * Création du formulaire
     */
    public createEditForm(): void {
        this.expenseForm = new FormGroup({
            nature: new FormControl(
                {
                    label: this.translateService.instant(
                        'EXPENSE-LIB.EDIT.FORM.NATURE_RESTAURANT'
                    ),
                    value: 'restaurant'
                },
                [Validators.required]
            ),
            amount: new FormControl(0.01, [
                Validators.required,
                Validators.min(0.01)
            ]),
            comment: new FormControl('', [Validators.required]),
            purchasedOn: new FormControl('', [Validators.required]),
            distance: new FormControl(1, [Validators.min(1)]),
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
        if (this.isUpdate) {
            this.update();
        } else {
            this.create();
        }
    }

    /**
     * Création d'une dépense
     */
    public create(): void {
        this.expenseApiService.create(this.getExpenseFromEditForm()).subscribe({
            next: () => {
                // On emet l'event d'enregistrement pour rechargement de la grille
                this.saveExpenseEventEmitterService.OnSaveExpense();
                // Affichage du message de succès
                this.expenseMessageService.sendSuccessMessage();
                // Fermeture du panel
                this.createPanelVisible = false;
            },
            error: (error) => {
                console.error('There was an error!', error);
                this.expenseMessageService.sendErrorMessage();
            }
        });
    }

    /**
     * Mise à jour d'une dépense
     */
    public update(): void {
        this.expenseApiService
            .update(this.getExpenseFromEditForm(), this.expenseId)
            .subscribe({
                next: () => {
                    // On emet l'event d'enregistrement pour rechargement de la grille
                    this.saveExpenseEventEmitterService.OnSaveExpense();
                    // Affichage du message de succès
                    this.expenseMessageService.sendSuccessMessage();
                    // Fermeture du panel
                    this.createPanelVisible = false;
                },
                error: (error) => {
                    console.error('There was an error!', error);
                    this.expenseMessageService.sendErrorMessage();
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
                this.expenseForm.get('purchasedOn').value,
                'DD/MM/YYYY'
            ).format('YYYY-MM-DD')
        };

        // Si c'est une mise à jour on set l'id
        if (this.isUpdate) {
            expense.id = this.expenseId;
        }

        if (expense.nature === 'restaurant') {
            expense.invites = this.expenseForm.get('invites').value;
        } else {
            expense.distance = this.expenseForm.get('distance').value;
        }

        return expense;
    }

    /**
     * Chargement des données de la dépense dans le formulaire si c'est une modification
     */
    public loadIfUpdate(): void {
        if (this.isUpdate) {
            this.expenseApiService.getExpenseById(this.expenseId).subscribe({
                next: (expense: Expense) => {
                    // Charge les données dans le formulaire
                    this.expenseForm.get('amount').setValue(expense.amount);
                    this.expenseForm.get('comment').setValue(expense.comment);
                    this.expenseForm
                        .get('purchasedOn')
                        .setValue(
                            moment(expense.purchasedOn).format('DD/MM/YYYY')
                        );
                    this.expenseForm.get('distance').setValue(expense.distance);
                    this.expenseForm.get('invites').setValue(expense.invites);
                    if (expense.nature === 'restaurant') {
                        this.expenseForm
                            .get('nature')
                            .setValue(this.natureType[0]);
                    } else {
                        this.expenseForm
                            .get('nature')
                            .setValue(this.natureType[1]);
                    }
                    this.displayDistanceInvites();
                },
                error: () => {
                    this.expenseMessageService.sendLoadErrorMessage();
                }
            });
        }
    }

}
