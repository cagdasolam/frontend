import { Company } from "./Company";

export type Product = {
    id: number;
    name: string;
    category: string;
    amount: number;
    amountUnit: string;
    company: Company
}