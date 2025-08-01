export enum TicketPriority {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

export enum TicketStatus {
  RECIBIDO = 'RECIBIDO',
  ASIGNADO = 'ASIGNADO',
  EN_PROCESO_DE_COORDINACION = 'EN_PROCESO_DE_COORDINACION',
  CON_CITA = 'CON_CITA',
  INSTALADO = 'INSTALADO',
  CANCELADO_SITRACK = 'CANCELADO_SITRACK',
  CANCELADO_CLIENTE = 'CANCELADO_CLIENTE',
}

export enum TicketCancelReason {
  UNIDAD_NO_DISPONIBLE = 'UNIDAD_NO_DISPONIBLE',
  UNIDAD_SIN_BATERIA = 'UNIDAD_SIN_BATERIA',
  UNIDAD_SIN_LLAVES = 'UNIDAD_SIN_LLAVES',
  SIN_ACCESO_A_LA_AGENCIA = 'SIN_ACCESO_A_LA_AGENCIA',
  EQUIPO_CON_FALLA = 'EQUIPO_CON_FALLA',
  OTRO = 'OTRO',
}

export enum TicketVehicleStatus {
  INSTALADA = 'INSTALADA',
  ENVIADO_AL_ASESOR = 'ENVIADO_AL_ASESOR',
  EN_CURSO_PENDIENTE_FECHA = 'EN_CURSO_PENDIENTE_FECHA',
  CANCELADA = 'CANCELADA',
  OTRO = 'OTRO',
  SIN_CONTACTO = 'SIN_CONTACTO',
  AGENDADA = 'AGENDADA',
  SIN_RESPUESTA = 'SIN_RESPUESTA',
  ROBADA_SINIESTRADA = 'ROBADA_SINIESTRADA',
  ZONA_COMPLICADA = 'ZONA_COMPLICADA',
  SIN_SEGUIMIENTO = 'SIN_SEGUIMIENTO',
}

export enum TicketCustomerType {
  NORMAL = 'NORMAL',
  PREMIUM = 'PREMIUM',
}

export enum TicketBusinessType {
  DIRECTO = 'DIRECTO',
  ASEGURADORA = 'ASEGURADORA',
}

export enum TicketCategory {
  UNITO = 'UNITO',
  FLOTILLA = 'FLOTILLA',
}

export interface TicketEventLog {
  timestamp: Date;
  userId: string;
  userName: string;
  oldValue?: string;
  newValue?: string;
  description: string;
}

export interface TicketComment {
  timestamp: Date;
  userId: string;
  userName: string;
  comment: string;
}

export interface TicketVehicle {
  vin: string;
  plate: string;
  vehicleNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  solution: string;
  subAddress: string;
  availabilityFrom: Date;
  availabilityTo: Date;
  vehicleStatus: TicketVehicleStatus;
  requiredPhysicalInstallation?: boolean; // default: false
  availableForInstallation?: boolean; // default: true
}

export interface Ticket {
  id?: string;
  ticketId?: string;
  oldTicketId?: string;
  ticketNumber?: number;
  orderNumber?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  customerId?: string;
  customerName?: string;
  customerType?: TicketCustomerType;
  businessType?: TicketBusinessType;
  category?: TicketCategory;
  cancelReason?: TicketCancelReason;

  customerContactName?: string;
  customerContactPhone?: string;
  customerContactEmail?: string;

  dealerId?: string;
  dealerName?: string;
  dealerAddress?: string;
  dealerContactName?: string;
  dealerContactPhone?: string;
  dealerContactEmail?: string;

  vehicles?: TicketVehicle[];
  events?: TicketEventLog[];
  comments?: TicketComment[];
  evidenceUrls?: string[];
  installationCertificateUrl?: string;

  coordinatorId?: string;
  coordinatorName?: string;
  technicianId?: string;
  technicianName?: string;

  requiredPhysicalInstallation?: boolean;
  availableForInstallation?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}


// Model for pagination request filter

export interface TicketFilter {
  page?: number;
  size?: number;
  priority?: string;
  status?: string;
  customerName?: string;
  coordinatorName?: string;
  dealerName?: string;
}

// Model for filter options
export interface TicketFilterOptions {
  coordinatorNames: string[];
  dealerNames: string[];
  priorities: string[];
  statuses: string[];
  customerNames: string[];
}

// Model for create ticket

// DTO for ticket creation (based on Java model)
export interface TicketCreateDto {
  // DATOS GENERALES
  orderNumber?: string;
  status?: TicketStatus; // default: RECIBIDO
  priority?: TicketPriority; // default: MEDIA
  customerType?: TicketCustomerType; // default: NORMAL
  businessType?: TicketBusinessType; // default: ASEGURADORA
  category?: TicketCategory; // default: UNITO

  // DATOS DE CONTACTO (CLIENTE)
  customerId: string;
  customerContactName?: string;
  customerContactPhone?: string;
  customerContactEmail?: string;

  // AGENCIA
  dealerId?: string;
  dealerContactName?: string;
  dealerContactPhone?: string;
  dealerContactEmail?: string;

  // UNIDADES
  vehicles?: TicketVehicle[];

  // ATENCIÓN SITRACK
  coordinatorId?: string;

  requiredPhysicalInstallation?: boolean; // default: false
  availableForInstallation?: boolean; // default: true
}

export interface TicketUpdateDto {
  // DATOS GENERALES
  orderNumber?: string;
  status?: TicketStatus; // default: RECIBIDO
  priority?: TicketPriority; // default: MEDIA
  customerType?: TicketCustomerType; // default: NORMAL
  businessType?: TicketBusinessType; // default: ASEGURADORA
  category?: TicketCategory; // default: UNITO

  // DATOS DE CONTACTO (CLIENTE)
  customerContactName?: string;
  customerContactPhone?: string;
  customerContactEmail?: string;

  // AGENCIA
  dealerContactName?: string;
  dealerContactPhone?: string;
  dealerContactEmail?: string;

  // UNIDADES
  vehicles?: TicketVehicle[];

  // ATENCIÓN SITRACK
  coordinatorId?: string;

  requiredPhysicalInstallation?: boolean; // default: false
  availableForInstallation?: boolean; // default: true
}

