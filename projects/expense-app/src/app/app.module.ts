import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient } from "@angular/common/http";
import { AppTranslateLoader } from './core/translate-loader';
import { TranslateICUParser } from 'ngx-translate-parser-plural-select';
import { TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): AppTranslateLoader {
    return new AppTranslateLoader(http, [
        { prefix: './assets/appi18n/', suffix: '.json' }, // App translation
        { prefix: './assets/expense-lib/i18n/', suffix: '.json', namespace: 'expense-lib' } // expense library translation
    ]);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            },
            parser: {
                provide: TranslateParser,
                useClass: TranslateICUParser
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
