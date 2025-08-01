import { Component } from '@angular/core';
import { TicketTableComponent } from 'src/app/components/ticket/ticket-table/ticket-table.component';

@Component({
    selector: 'app-ticket-all',
    templateUrl: './ticket-all.component.html',
    styleUrls: ['./ticket-all.component.scss'],
    imports: [TicketTableComponent],
})
export class TicketAllComponent {

}
