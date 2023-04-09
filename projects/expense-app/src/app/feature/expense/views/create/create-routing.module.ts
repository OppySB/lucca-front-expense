import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create.component';
import { DatePipe } from "@angular/common";

const routes: Routes = [{ path: '', component: CreateComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DatePipe]
})

export class CreateRoutingModule { }
