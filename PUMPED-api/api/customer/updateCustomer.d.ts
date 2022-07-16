import type { Customer } from './types';
declare function updateCustomer(CustomerID: number, fields: Customer): Promise<{
    firstName?: string | undefined;
    lastName?: string | undefined;
    CustomerID: number;
}>;
export default updateCustomer;
