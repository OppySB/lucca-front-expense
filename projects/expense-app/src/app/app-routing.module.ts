import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
    { path: '', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
