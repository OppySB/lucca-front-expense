import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
    declarations: [],
    providers:[],
    imports: [
        HttpClientModule,
        CommonModule,
        FeatureRoutingModule
    ]
})
export class FeatureModule { }
