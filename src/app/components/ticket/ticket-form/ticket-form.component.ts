import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TicketPriority, TicketStatus, TicketCustomerType, TicketBusinessType, TicketCategory, TicketVehicle, TicketVehicleStatus } from '../../../models/ticket.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DealerService } from 'src/app/services/dealer/dealer.service';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { Dealer } from 'src/app/models/dealer.model';

@Component({
    selector: 'app-ticket-form',
    templateUrl: './ticket-form.component.html',
    styleUrls: ['./ticket-form.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDividerModule,
        MatAutocompleteModule
    ]
})
export class TicketFormComponent implements OnInit {
    ticketForm!: FormGroup;

    statusOptions = Object.values(TicketStatus);
    priorityOptions = Object.values(TicketPriority);
    customerTypeOptions = Object.values(TicketCustomerType);
    businessTypeOptions = Object.values(TicketBusinessType);
    categoryOptions = Object.values(TicketCategory);
    vehicleStatusOptions = Object.values(TicketVehicleStatus);

    filteredCustomers$: Observable<Customer[]> = of([]);
    filteredDealers$: Observable<Dealer[]> = of([]);

    customerCtrl = new FormControl<any>('');
    dealerCtrl = new FormControl<any>('');
    selectedCustomer?: Customer;
    selectedDealer?: Dealer;

    selectedCustomerContacts: any[] = [];
    selectedDealerContacts: any[] = [];
    selectedCustomerContact?: any;
    selectedDealerContact?: any;

    constructor(
        private fb: FormBuilder,
        private ticketService: TicketService,
        private customerService: CustomerService,
        private dealerService: DealerService
    ) {}

    ngOnInit(): void {
        this.ticketForm = this.fb.group({
            orderNumber: [''],
            status: [TicketStatus.RECIBIDO, Validators.required],
            priority: [TicketPriority.MEDIA, Validators.required],
            customerType: [TicketCustomerType.NORMAL, Validators.required],
            businessType: [TicketBusinessType.ASEGURADORA, Validators.required],
            category: [TicketCategory.UNITO, Validators.required],

            customerId: ['', Validators.required],
            customerContactName: [''],
            customerContactPhone: [''],
            customerContactEmail: [''],

            dealerId: [''],
            dealerContactName: [''],
            dealerContactPhone: [''],
            dealerContactEmail: [''],

            vehicles: this.fb.array([]),

            coordinatorId: [''],
            requiredPhysicalInstallation: [false],
            availableForInstallation: [true]
        });

        // Customer autocomplete
        this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            switchMap(value =>
                typeof value === 'string' && value.length > 0
                    ? this.customerService.list({ search: value, size: 10, page: 0 }).pipe(map(res => res.content || []))
                    : of([])
            )
        );

        // Dealer autocomplete
        this.filteredDealers$ = this.dealerCtrl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            switchMap(value =>
                typeof value === 'string' && value.length > 0
                    ? this.dealerService.list({ search: value, size: 10, page: 0 }).pipe(map(res => res.content || []))
                    : of([])
            )
        );
    }

    displayCustomer(customer?: Customer | string): string {
        return typeof customer === 'string' ? customer : customer?.socialReason || customer?.commercialName || '';
    }

    displayDealer(dealer?: Dealer | string): string {
        return typeof dealer === 'string' ? dealer : dealer?.commercialName || '';
    }

    onCustomerSelected(event: any) {
        const customer: Customer = event.option.value;
        this.selectedCustomer = customer;
        this.selectedCustomerContacts = customer.contacts || [];
        this.customerCtrl.setValue(customer);
        this.ticketForm.patchValue({
            customerId: customer.id,
            customerContactName: '',
            customerContactPhone: '',
            customerContactEmail: ''
        });
        this.selectedCustomerContact = undefined;
    }

    onCustomerContactSelected(contactId: string) {
        const contact = this.selectedCustomerContacts.find(c => c.email === contactId || c.name === contactId);
        if (contact) {
            this.selectedCustomerContact = contact;
            this.ticketForm.patchValue({
                customerContactName: contact.name,
                customerContactPhone: contact.phoneNumber,
                customerContactEmail: contact.email
            });
        }
    }

    onDealerSelected(event: any) {
        const dealer: Dealer = event.option.value;
        this.selectedDealer = dealer;
        this.selectedDealerContacts = dealer.contacts || [];
        this.dealerCtrl.setValue(dealer);
        this.ticketForm.patchValue({
            dealerId: dealer.id,
            dealerContactName: '',
            dealerContactPhone: '',
            dealerContactEmail: ''
        });
        this.selectedDealerContact = undefined;
    }

    onDealerContactSelected(contactId: string) {
        const contact = this.selectedDealerContacts.find(c => c.email === contactId || c.name === contactId);
        if (contact) {
            this.selectedDealerContact = contact;
            this.ticketForm.patchValue({
                dealerContactName: contact.name,
                dealerContactPhone: contact.phoneNumber,
                dealerContactEmail: contact.email
            });
        }
    }

    get vehicles(): FormArray {
        return this.ticketForm.get('vehicles') as FormArray;
    }

    addVehicle(vehicle?: Partial<TicketVehicle>) {
        this.vehicles.push(this.fb.group({
            vin: [vehicle?.vin || ''],
            plate: [vehicle?.plate || ''],
            vehicleNumber: [vehicle?.vehicleNumber || ''],
            vehicleType: [vehicle?.vehicleType || ''],
            make: [vehicle?.make || ''],
            model: [vehicle?.model || ''],
            solution: [vehicle?.solution || ''],
            subAddress: [vehicle?.subAddress || ''],
            availabilityFrom: [vehicle?.availabilityFrom || null],
            availabilityTo: [vehicle?.availabilityTo || null],
            vehicleStatus: [vehicle?.vehicleStatus || null],
            requiredPhysicalInstallation: [vehicle?.requiredPhysicalInstallation || false],
            availableForInstallation: [vehicle?.availableForInstallation || true]
        }));
    }

    saveTicket() {
        if( this.ticketForm.valid) {
            const ticketData = this.ticketForm.value;
            // Aquí puedes enviar ticketData a tu servicio para guardarlo
            this.ticketService.create(ticketData).subscribe({
                next: (response) => {
                    alert('Ticket guardado exitosamente');
                },
                error: (error) => {
                    alert('Error al cargar los tickets: ' + error);
                },
                complete: () => {
                }
            });
        }
    }
}
