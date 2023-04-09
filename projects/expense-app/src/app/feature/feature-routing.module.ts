import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./expense/views/home/home.module').then(m => m.HomeModule) },
    { path: 'create', loadChildren: () => import('./expense/views/create/create.module').then(m => m.CreateModule) },
    { path: 'update/:id', loadChildren: () => import('./expense/views/update/update.module').then(m => m.UpdateModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FeatureRoutingModule {
}
