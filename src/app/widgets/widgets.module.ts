import { NgModule } from '@angular/core';
import { CreateDataModule } from '../widgets/create-data/create-data.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableGridComponent } from './table-grid/table-grid.component';
import { MathGraphModule } from './math-graph/math-graph.module';

@NgModule({
    declarations: [
        TableGridComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CreateDataModule,
        MathGraphModule
    ],
    exports: [ TableGridComponent ],
    providers: []
})
export class WidgetsModule { }
