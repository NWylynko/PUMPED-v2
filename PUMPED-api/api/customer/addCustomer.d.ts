import type { Customer, CustomerWithID } from './types';
declare function addCustomer({ firstName, lastName }: Customer): Promise<CustomerWithID>;
export default addCustomer;
