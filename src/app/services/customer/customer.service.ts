import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Customer, CustomerFilter } from 'src/app/models/customer.model';
import { PaginationResponse } from 'src/app/models/pagination.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.api}/customers`;

  constructor(private client: HttpClient) {}

  list(filters: CustomerFilter): Observable<PaginationResponse<Customer>> {
    // get customers with url params
    return this.client.get<PaginationResponse<Customer>>(`${this.apiUrl}/list`, {
      params: {
        ...filters,
        page: filters.page || '0', // default to page 0 if not provided
        size: filters.size || '50', // default to size 50 if not provided
      },
    });
  }

  get(id: string): Observable<Customer> {
    return this.client.get<Customer>(`${this.apiUrl}/get/${id}`);
  }
}
