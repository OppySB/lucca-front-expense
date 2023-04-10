import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseCreateComponent } from './expense-create.component';

@NgModule({
    declarations: [ExpenseCreateComponent],
    imports: [CommonModule],
    providers: [],
    exports: [ExpenseCreateComponent]
})
export class ExpenseCreateModule {}
