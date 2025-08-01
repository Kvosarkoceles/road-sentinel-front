import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Ticket, TicketComment, TicketCreateDto, TicketFilter, TicketUpdateDto } from 'src/app/models/ticket.model';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/pagination.response';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = `${environment.api}/tickets`;

  constructor(private client: HttpClient) {}

  list(filters: TicketFilter) : Observable<PaginationResponse<Ticket>> {
    // get tickets with url params
    return this.client.get<PaginationResponse<Ticket>>(`${this.apiUrl}/list`, {
      params: {
        ...filters,
        page: filters.page || '0', // default to page 0 if not provided
        size: filters.size || '50', // default to size 10 if not provided
      },
    });
  }

  create(ticketDto: TicketCreateDto): Observable<Ticket> {
    return this.client.post<Ticket>(`${this.apiUrl}/create`, ticketDto);
  }

  get(id: string): Observable<Ticket> {
    return this.client.get<Ticket>(`${this.apiUrl}/get/${id}`);
  }

  update(id: string, ticketDto: TicketUpdateDto): Observable<Ticket> {
    return this.client.patch<Ticket>(`${this.apiUrl}/update/${id}`, ticketDto);
  }

  addComment(comment: Partial<TicketComment>, id: string): Observable<Ticket> {
    return this.client.post<Ticket>(`${this.apiUrl}/add-comment/${id}`, comment);
  }
}
