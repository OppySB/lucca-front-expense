import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from "@angular/common";
import { HomeComponent } from "./home.component";

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DatePipe]
})

export class HomeRoutingModule { }
