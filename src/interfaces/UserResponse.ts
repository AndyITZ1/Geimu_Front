import { Address } from "./Address";

export interface UserResponse {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    address: Address
}