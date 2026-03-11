import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";



actor {
  type BookingInquiry = {
    tripType : Text;
    pickupCity : Text;
    dropCity : Text;
    pickupDate : Text;
    pickupTime : Text;
    mobile : Text;
    customerName : Text;
    vehicleType : Text;
    pickupAddress : Text;
    dropAddress : Text;
    adults : Text;
    children : Text;
    luggage : Text;
    totalFare : Text;
    advanceAmount : Text;
    addOns : Text;
    distance : Text;
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

  // Submit a booking inquiry (full details)
  public shared ({ caller }) func submitInquiry(
    tripType : Text,
    pickupCity : Text,
    dropCity : Text,
    pickupDate : Text,
    pickupTime : Text,
    mobile : Text,
    customerName : Text,
    vehicleType : Text,
    pickupAddress : Text,
    dropAddress : Text,
    adults : Text,
    children : Text,
    luggage : Text,
    totalFare : Text,
    advanceAmount : Text,
    addOns : Text,
    distance : Text,
  ) : async () {
    let inquiry : BookingInquiry = {
      tripType;
      pickupCity;
      dropCity;
      pickupDate;
      pickupTime;
      mobile;
      customerName;
      vehicleType;
      pickupAddress;
      dropAddress;
      adults;
      children;
      luggage;
      totalFare;
      advanceAmount;
      addOns;
      distance;
    };
    inquiries.add(inquiryId, inquiry);
    inquiryId += 1;
  };

  // Get all booking inquiries (for admin panel)
  public query ({ caller }) func getAllInquiries() : async [(Nat, BookingInquiry)] {
    inquiries.entries().toArray();
  };

  // Submit a contact message
  public shared ({ caller }) func submitContactMessage(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async () {
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
  public query ({ caller }) func getContactMessages() : async [(Nat, ContactMessage)] {
    contactMessages.entries().toArray();
  };
};
