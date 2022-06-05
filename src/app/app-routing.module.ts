import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreViewComponent } from './views/core-view/core-view.component';
import { MathGraphViewComponent } from './views/math-graph-view/math-graph-view.component';
import { TableViewComponent } from './views/table-view/table-view.component';

const routes: Routes = [
    { path: 'editor', component: CoreViewComponent },
    { path: 'table-view', component: TableViewComponent },
    { path: 'math-graph-view', component: MathGraphViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
