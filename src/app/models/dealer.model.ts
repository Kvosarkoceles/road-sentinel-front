export interface DealerContact {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface Dealer {
  id?: string;
  commercialName?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  contacts?: DealerContact[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DealerFilter {
  page?: number;
  size?: number;
  search?: string;
}