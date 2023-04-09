import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseUpdateComponent } from "./expense-update.component";


@NgModule({
    declarations: [
        ExpenseUpdateComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [ExpenseUpdateComponent]
})
export class ExpenseUpdateModule {

}
