import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: 'app-ticket-table',
    templateUrl: './ticket-table.component.html',
    styleUrls: ['./ticket-table.component.scss'],
    imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule
]
})
export class TicketTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'ticketId',
    'oldTicketId',
    'customerName',
    'dealerName',
    'coordinatorName',
    'status',
    'priority',
    'createdAt',
    'actions'
  ];
  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalElements = 0;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  isLoading = false;

  constructor(
    private _router: Router,
    private _ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    // Suscribirse a los eventos de cambio de página del paginador
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadTickets();
    });
  }
  loadTickets(): void {
    this.isLoading = true;

    const filters = {
      page: this.pageIndex,
      size: this.pageSize,
    };

    this._ticketService.list(filters).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({ // <--- ¡Aquí está el cambio clave!
      next: (response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;

        if (this.paginator) {
          this.paginator.length = this.totalElements;
        }
      },
      error: (error) => {
        alert('Error al cargar los tickets: ' + error);
      },
      complete: () => {
      }
    });
  }

}
