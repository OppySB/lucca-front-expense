import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateComponent } from './update.component';
import { DatePipe } from "@angular/common";

const routes: Routes = [{ path: '', component: UpdateComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DatePipe]
})

export class UpdateRoutingModule { }
