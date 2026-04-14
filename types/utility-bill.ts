export interface UtilityBill {
  id: string;
  month: string;
  utilities: {
    [key: string]: number;
  };
  total: number;
}
