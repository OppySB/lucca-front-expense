import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { TranslateModule } from '@ngx-translate/core';
import {ExpenseCreateModule} from "../../../../../../../expense-lib/src/lib/expense-create/expense-create.module";


@NgModule({
    declarations: [
        CreateComponent
    ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        TranslateModule,
        ExpenseCreateModule
    ]
})
export class CreateModule { }
