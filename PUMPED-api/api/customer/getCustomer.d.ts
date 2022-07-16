import type { Customer } from './types';
declare function getCustomer(CustomerID: number): Promise<Customer>;
export default getCustomer;
