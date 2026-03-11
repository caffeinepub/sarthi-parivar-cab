import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type BookingInquiry = {
    tripType : Text;
    pickupCity : Text;
    dropCity : Text;
    pickupDate : Text;
    pickupTime : Text;
    mobile : Text;
    name : ?Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  var inquiryId = 0;
  var contactId = 0;
  let inquiries = Map.empty<Nat, BookingInquiry>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  // Submit a booking inquiry
  public shared func submitInquiry(tripType : Text, pickupCity : Text, dropCity : Text, pickupDate : Text, pickupTime : Text, mobile : Text, name : ?Text) : async () {
    let inquiry : BookingInquiry = {
      tripType;
      pickupCity;
      dropCity;
      pickupDate;
      pickupTime;
      mobile;
      name;
    };
    inquiries.add(inquiryId, inquiry);
    inquiryId += 1;
  };

  // Get all booking inquiries (for admin panel)
  public query func getAllInquiries() : async [(Nat, BookingInquiry)] {
    inquiries.entries().toArray();
  };

  // Submit a contact message
  public shared func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      phone;
      message;
    };
    contactMessages.add(contactId, contactMessage);
    contactId += 1;
  };

  // Get all contact messages (for admin panel)
  public query func getContactMessages() : async [(Nat, ContactMessage)] {
    contactMessages.entries().toArray();
  };
};
