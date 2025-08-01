export interface CustomerContact {
  name: string;
  phoneNumber: string;
  email: string;
  position: string;
}

export interface Customer {
  id?: string;
  rfc?: string;
  commercialName?: string;
  socialReason?: string;
  phoneNumber?: string;
  email?: string;
  contacts?: CustomerContact[];
  address?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CustomerFilter {
  page?: number;
  size?: number;
  search?: string;
}
