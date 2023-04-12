import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SaveExpenseEventEmitterService {

    public invokeOnSaveExpense = new EventEmitter();
    public subOnSaveExpense: Subscription;


    /**
     * Emet un evènement pour la sauvegarde d'une dépense.
     */
    public OnSaveExpense(): void {
        this.invokeOnSaveExpense.emit();
    }
    
}