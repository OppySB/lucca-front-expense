import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseHomeComponent } from "./expense-home.component";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
        ExpenseHomeComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        MatButtonModule,
        ButtonModule,
        TagModule,
        TooltipModule
    ],
    providers: [],
    exports: [ExpenseHomeComponent]
})
export class ExpenseHomeModule {

}
