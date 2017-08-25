import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AgGridModule} from "ag-grid-angular/main";
import {AppComponent} from "./app.component";
import {StudentsGridComponent} from "./students-grid/students-grid.component";
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { FormsModule }   from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        StudentsGridComponent
    ],
    imports: [
        FormsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        BrowserModule,
        AgGridModule.withComponents(
            []
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
