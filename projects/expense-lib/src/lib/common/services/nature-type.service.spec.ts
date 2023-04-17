import { TestBed } from '@angular/core/testing';import { TranslateTestingModule } from 'ngx-translate-testing';
import { NatureType } from '../public-api';
import { NatureTypeService } from './nature-type.service';

describe('NatureTypeService', () => {
    let service: NatureTypeService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateTestingModule.withTranslations(
                    'fr',
                    require('../../../../assets/i18n/fr-FR.json')
                ).withDefaultLanguage('fr'),
            ],
            providers: [NatureTypeService],
        }).compileComponents();
        service = TestBed.inject(NatureTypeService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should create', () => {
        expect(service.getNatureType()).toEqual(
            [
                {
                    label: 'EXPENSE-LIB.EDIT.FORM.NATURE_RESTAURANT',
                    value: 'restaurant'
                } as NatureType,
                {
                    label: 'EXPENSE-LIB.EDIT.FORM.NATURE_TRIP',
                    value: 'trip'
                } as NatureType
            ]
        );
    });

});
