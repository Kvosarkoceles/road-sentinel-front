import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Ticket, TicketPriority, TicketStatus, TicketCustomerType, TicketBusinessType, TicketCategory, TicketVehicleStatus, TicketComment, TicketEventLog } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DealerService } from 'src/app/services/dealer/dealer.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ticket-update',
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      MatButtonModule,
      MatDividerModule,
      MatAutocompleteModule,
      MatTableModule
  ],
  templateUrl: './ticket-update.component.html',
  styleUrl: './ticket-update.component.scss'
})
export class TicketUpdateComponent implements OnInit {
  public ticket: Ticket | undefined;
  public updateForm!: FormGroup;
  public statusOptions = Object.values(TicketStatus);
  public priorityOptions = Object.values(TicketPriority);
  public customerTypeOptions = Object.values(TicketCustomerType);
  public businessTypeOptions = Object.values(TicketBusinessType);
  public categoryOptions = Object.values(TicketCategory);
  public vehicleStatusOptions = Object.values(TicketVehicleStatus);
  private id: string | undefined;
  public customerCtrl = new FormControl<any>('');
  public dealerCtrl = new FormControl<any>('');
  public selectedCustomerContacts: any[] = [];
  public selectedDealerContacts: any[] = [];
  public selectedCustomerContact?: any;
  public selectedDealerContact?: any;
  public comments: TicketComment[] = [];
  public events: TicketEventLog[] = [];
  public newComment: string = '';
  public commentForm = this.fb.group({
    comment: ['']
  });

  constructor(
    private ticketService: TicketService,
    private customerService: CustomerService,
    private dealerService: DealerService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
  }

  ngOnInit(): void {
    if (this.id) {
      this.ticketService.get(this.id).subscribe({
        next: (ticket: Ticket) => {
          this.ticket = ticket;
          this.comments = ticket.comments || [];
          this.events = ticket.events || [];
          this.initForm(this.ticket);
          // Fetch customer entity and contacts
          if (ticket.customerId) {
            this.customerService.get(ticket.customerId).subscribe(customer => {
              this.selectedCustomerContacts = customer.contacts || [];
              this.customerCtrl.setValue(customer);
              if (ticket.customerContactEmail) {
                this.selectedCustomerContact = this.selectedCustomerContacts.find(c => c.email === ticket.customerContactEmail);
              }
            });
          }
          // Fetch dealer entity and contacts
          if (ticket.dealerId) {
            this.dealerService.get(ticket.dealerId).subscribe(dealer => {
              this.selectedDealerContacts = dealer.contacts || [];
              this.dealerCtrl.setValue(dealer);
              if (ticket.dealerContactEmail) {
                this.selectedDealerContact = this.selectedDealerContacts.find(c => c.email === ticket.dealerContactEmail);
              }
            });
          }
        },
        error: (error) => {
          console.error('Error fetching ticket:', error);
          alert(`There was an error getting the ticket`);
        }
      });
    } else {
      console.error('No ticket ID provided');
      alert('No ticket ID provided');
    }
  }

  initForm(ticket: Ticket) {
    this.updateForm = this.fb.group({
      status: [ticket.status || TicketStatus.RECIBIDO, Validators.required],
      priority: [ticket.priority || TicketPriority.MEDIA, Validators.required],
      customerType: [ticket.customerType || TicketCustomerType.NORMAL, Validators.required],
      businessType: [ticket.businessType || TicketBusinessType.ASEGURADORA, Validators.required],
      category: [ticket.category || TicketCategory.UNITO, Validators.required],
      customerContactName: [ticket.customerContactName || ''],
      customerContactPhone: [ticket.customerContactPhone || ''],
      customerContactEmail: [ticket.customerContactEmail || ''],
      dealerContactName: [ticket.dealerContactName || ''],
      dealerContactPhone: [ticket.dealerContactPhone || ''],
      dealerContactEmail: [ticket.dealerContactEmail || ''],
      vehicles: this.fb.array([]),
      coordinatorId: [ticket.coordinatorId || ''],
      technicianId: [ticket.technicianId || ''],
      technicianName: [ticket.technicianName || ''],
    });
    if (ticket.vehicles && ticket.vehicles.length > 0) {
      ticket.vehicles.forEach(vehicle => {
        this.vehicles.push(this.fb.group({
          vin: [vehicle.vin || ''],
          plate: [vehicle.plate || ''],
          vehicleNumber: [vehicle.vehicleNumber || ''],
          vehicleType: [vehicle.vehicleType || ''],
          make: [vehicle.make || ''],
          model: [vehicle.model || ''],
          solution: [vehicle.solution || ''],
          subAddress: [vehicle.subAddress || ''],
          availabilityFrom: [vehicle.availabilityFrom ? this.formatDate(vehicle.availabilityFrom) : null],
          availabilityTo: [vehicle.availabilityTo ? this.formatDate(vehicle.availabilityTo) : null],
          vehicleStatus: [vehicle.vehicleStatus || null],
          requiredPhysicalInstallation: [vehicle.requiredPhysicalInstallation || false],
          availableForInstallation: [vehicle.availableForInstallation ?? true]
        }));
      });
    }
  }

  get vehicles(): FormArray {
    return this.updateForm.get('vehicles') as FormArray;
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  onUpdate() {
    if (this.updateForm.valid && this.ticket) {
      const updatedTicket = {
        ...this.ticket,
        ...this.updateForm.value,
        vehicles: this.updateForm.value.vehicles
      };
      this.ticketService.update(this.ticket.id!, updatedTicket).subscribe({
        next: () => {
          alert('Ticket actualizado exitosamente');
        },
        error: (error) => {
          alert('Error al actualizar el ticket: ' + error);
        }
      });
    }
  }

  addComment() {
    const commentValue = this.commentForm.get('comment')?.value?.trim();
    if (commentValue && this.ticket) {
      const comment: Partial<TicketComment> = {
        comment: commentValue
      };
      this.ticketService.addComment(comment, this.ticket.id!).subscribe({
        next: (updatedTicket) => {
          this.comments = updatedTicket.comments || [];
          this.commentForm.reset();
        },
        error: (error) => {
          alert('Error al agregar el comentario: ' + error);
        }
      });
    }
  }

  onCustomerContactSelected(contactId: string) {
    const contact = this.selectedCustomerContacts.find(c => c.email === contactId || c.name === contactId);
    if (contact) {
      this.selectedCustomerContact = contact;
      this.updateForm.patchValue({
        customerContactName: contact.name,
        customerContactPhone: contact.phoneNumber,
        customerContactEmail: contact.email
      });
    }
  }

  onDealerContactSelected(contactId: string) {
    const contact = this.selectedDealerContacts.find(c => c.email === contactId || c.name === contactId);
    if (contact) {
      this.selectedDealerContact = contact;
      this.updateForm.patchValue({
        dealerContactName: contact.name,
        dealerContactPhone: contact.phoneNumber,
        dealerContactEmail: contact.email
      });
    }
  }
}
