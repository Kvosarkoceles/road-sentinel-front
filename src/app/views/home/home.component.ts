import { Component } from '@angular/core';
import { TicketTableComponent } from "src/app/components/ticket/ticket-table/ticket-table.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [TicketTableComponent]
})
export class HomeComponent {

}
