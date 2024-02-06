export interface Skid {
  number: number;
  type: string;
  packaging: string;
  grossWeight: string; // use input text with pattern="^\d*(\.\d{0,2})?$"
}