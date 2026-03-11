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
    customerName: string;
    vehicleType: string;
    tripType: string;
    totalFare: string;
    distance: string;
    children: string;
    pickupAddress: string;
    advanceAmount: string;
    pickupCity: string;
    pickupDate: string;
    addOns: string;
    pickupTime: string;
    adults: string;
    mobile: string;
    dropAddress: string;
    luggage: string;
    dropCity: string;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<[bigint, BookingInquiry]>>;
    getContactMessages(): Promise<Array<[bigint, ContactMessage]>>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<void>;
    submitInquiry(tripType: string, pickupCity: string, dropCity: string, pickupDate: string, pickupTime: string, mobile: string, customerName: string, vehicleType: string, pickupAddress: string, dropAddress: string, adults: string, children: string, luggage: string, totalFare: string, advanceAmount: string, addOns: string, distance: string): Promise<void>;
}
