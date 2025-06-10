export interface Inventory {
  id: number;
  name: string;
  quantity: number;
  dateIn: string;
  createdBy: string;
  modifiedBy?: string;
  dateModified?: string;
}
