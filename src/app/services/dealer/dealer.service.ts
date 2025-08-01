import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Dealer, DealerFilter } from 'src/app/models/dealer.model';
import { PaginationResponse } from 'src/app/models/pagination.response';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  private apiUrl = `${environment.api}/dealers`;

  constructor(private client: HttpClient) {}

  list(filters: DealerFilter): Observable<PaginationResponse<Dealer>> {
    // get dealers with url params
    return this.client.get<PaginationResponse<Dealer>>(`${this.apiUrl}/list`, {
      params: {
        ...filters,
        page: filters.page || '0', // default to page 0 if not provided
        size: filters.size || '50', // default to size 50 if not provided
      },
    });
  }

  get(id: string): Observable<Dealer> {
    return this.client.get<Dealer>(`${this.apiUrl}/get/${id}`);
  }
}
