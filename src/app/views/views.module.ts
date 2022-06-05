import { NgModule } from '@angular/core';
import { TableViewComponent } from './table-view/table-view.component';
import { CoreViewComponent } from './core-view/core-view.component';
import { CreateDataModule } from '../widgets/create-data/create-data.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MathGraphViewComponent } from './math-graph-view/math-graph-view.component';
import { MathGraphModule } from '../widgets/math-graph/math-graph.module';

@NgModule({
    declarations: [
        TableViewComponent,
        CoreViewComponent,
        MathGraphViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CreateDataModule,
        MathGraphModule
    ],
    exports: [ 
        TableViewComponent,
        CoreViewComponent,
        MathGraphViewComponent
    ],
    providers: []
})
export class ViewsModule { }
