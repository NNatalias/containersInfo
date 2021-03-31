export interface ContainerMainInfo {
  'id': string;
  'owner': string;
  'history': ContainerHistory[];
}
export interface ContainerHistory {
  'dateFrom': string;
  'dateTo': string;
  'sourcePort': string;
  'destinationPort': string;
  'sender': string;
  'recipient': string;
}

