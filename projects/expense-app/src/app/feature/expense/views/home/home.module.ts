import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from "./home.component";
import { ExpenseHomeModule } from "@lucca/expense/src/lib/expense-home";
import { MessagesModule } from 'primeng/messages';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        ExpenseHomeModule,
        MessagesModule
    ],
    providers: [
        MessageService]
})
export class HomeModule {}
