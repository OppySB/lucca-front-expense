import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public constructor(private readonly translateService: TranslateService) {
        this.translateService.setDefaultLang('fr-FR');
        this.translateService.use('fr-FR');

        registerLocaleData(localeFr, 'fr');
    }

}
