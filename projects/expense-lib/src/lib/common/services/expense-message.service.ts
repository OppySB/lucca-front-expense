import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageEventEmitterService } from "../events/message-event-emitter.service";
import { Message } from "../models/message.model";

@Injectable({
    providedIn: 'root'
})
export class ExpenseMessageService {

    public constructor(
        private readonly messageEventEmitterService: MessageEventEmitterService,
        private readonly translateService: TranslateService
    ) {}

    /**
     * Emet l'évènement d'affichage de succès
     */
    public sendSuccessMessage(): void {
        this.messageEventEmitterService.OnMessage(
            {
                severity: 'success',
                summary: this.translateService.instant('EXPENSE-LIB.MESSAGE.SAVE'),
                life: 5000,
                closable: true,
                detail: this.translateService.instant('EXPENSE-LIB.MESSAGE.SAVE_TEXT')
            } as Message
        );
    }

    /**
     * Emet l'évènement d'affichage d'erreur
     */
    public sendErrorMessage(): void {
        this.messageEventEmitterService.OnMessage(
            {
                severity: 'error',
                life: 5000,
                closable: true,
                summary: this.translateService.instant('EXPENSE-LIB.MESSAGE.SAVE_ERROR'),
                detail: this.translateService.instant('EXPENSE-LIB.MESSAGE.SAVE_ERROR_TEXT')
            } as Message
        );
    }

    /**
     * Emet l'évènement d'affichage d'erreur de chargement d'une dépense
     */
    public sendLoadErrorMessage(): void {
        this.messageEventEmitterService.OnMessage(
            {
                severity: 'error',
                life: 5000,
                closable: true,
                summary: this.translateService.instant('EXPENSE-LIB.MESSAGE.EXPENSE_LOAD_ERROR'),
                detail: this.translateService.instant('EXPENSE-LIB.MESSAGE.EXPENSE_LOAD_ERROR_TEXT')
            } as Message
        );
    }

}