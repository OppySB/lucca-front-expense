import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ExpenseHomeComponent} from "./expense-home.component";


@NgModule({
    declarations: [
        ExpenseHomeComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [ExpenseHomeComponent]
})
export class ExpenseHomeModule {

}
