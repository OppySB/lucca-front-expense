import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpenseHomeComponent } from './expense-home.component';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        ExpenseHomeComponent,
        ExpenseCreateComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        MatButtonModule,
        ButtonModule,
        TagModule,
        TooltipModule,
        SidebarModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        FormsModule, 
        ReactiveFormsModule,
        CardModule,
        DropdownModule,
        MessagesModule,
        InputTextModule,
        KeyFilterModule,
        TranslateModule
    ],
    providers: [],
    exports: [ExpenseHomeComponent]
})
export class ExpenseHomeModule {}
