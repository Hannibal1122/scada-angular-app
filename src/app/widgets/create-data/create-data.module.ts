import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateDataComponent } from './create-data.component';
import { LinksModel } from './links.model';
import { RegistryModel } from './registry.model';

@NgModule({
    declarations: [ CreateDataComponent ],
    imports: [ BrowserModule, FormsModule ],
    exports: [ CreateDataComponent ],
    providers: [ RegistryModel, LinksModel ],
    bootstrap: []
})
export class CreateDataModule { }
