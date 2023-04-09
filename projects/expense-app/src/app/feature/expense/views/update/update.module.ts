import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateRoutingModule } from './update-routing.module';
import { UpdateComponent } from './update.component';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseUpdateModule } from "@lucca/expense/src/lib/expense-update/expense-update.module";

@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        CommonModule,
        UpdateRoutingModule,
        TranslateModule,
        ExpenseUpdateModule
    ]
})
export class UpdateModule { }
