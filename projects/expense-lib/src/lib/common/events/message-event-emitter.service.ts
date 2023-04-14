import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { Message } from "../models/message.model";


@Injectable({
    providedIn: 'root'
})
export class MessageEventEmitterService {

    public invokeOnMessage = new EventEmitter();
    public subOnMessage: Subscription;


    /**
     * Emet un evènement pour l'affichage d'un message
     */
    public OnMessage(message: Message): void {
        this.invokeOnMessage.emit(message);
    }
    
}