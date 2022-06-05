import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MathGraphComponent } from './math-graph.component';
import { MathGraphItemComponent } from './widgets/item/math-graph-item.component';

@NgModule({
    declarations: [
        MathGraphComponent,
        MathGraphItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    exports: [ MathGraphComponent ],
    providers: []
})
export class MathGraphModule { }
