import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingInquiry {
    tripType: string;
    name?: string;
    pickupCity: string;
    pickupDate: string;
    pickupTime: string;
    mobile: string;
    dropCity: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<[bigint, BookingInquiry]>>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<void>;
    submitInquiry(tripType: string, pickupCity: string, dropCity: string, pickupDate: string, pickupTime: string, mobile: string, name: string | null): Promise<void>;
}
