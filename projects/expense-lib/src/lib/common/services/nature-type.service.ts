import { NatureType } from './../models/nature-type.model';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class NatureTypeService {

    public constructor(private readonly translateService: TranslateService) {}

    /**
     * Renvoie les différents types de nature de dépense
     * @returns le tableau des types de nature
     */
    public getNatureType(): NatureType[] {
        return [
            {
                label: this.translateService.instant(
                    'EXPENSE-LIB.EDIT.FORM.NATURE_RESTAURANT'
                ),
                value: 'restaurant'
            } as NatureType,
            {
                label: this.translateService.instant(
                    'EXPENSE-LIB.EDIT.FORM.NATURE_TRIP'
                ),
                value: 'trip'
            } as NatureType
        ];
    }

}
