import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QueryService } from './system/query.service';
import { ViewsModule } from './views/views.module';
import { WidgetsModule } from './widgets/widgets.module';
/* import { MathGraphComponent } from './widgets/math-graph/math-graph.component'; */

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ViewsModule,
        WidgetsModule
    ],
    exports: [],
    providers: [ QueryService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
