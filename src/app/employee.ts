export interface Employee {
    employeeID: number;
    firstname: string;
    lastname: string;
    age: number;
    number?: string;  // Make it optional with '?'
    email: string;
    address: string;    
}