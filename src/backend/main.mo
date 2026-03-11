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
  let inquiries = Map.empty<Nat, BookingInquiry>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  // Submit a booking inquiry
  public shared ({ caller }) func submitInquiry(tripType : Text, pickupCity : Text, dropCity : Text, pickupDate : Text, pickupTime : Text, mobile : Text, name : ?Text) : async () {
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

  // Admin-only function to get all inquiries
  public shared ({ caller }) func getAllInquiries() : async [(Nat, BookingInquiry)] {
    if (caller.toText() != "2vxsx-fae") {
      Runtime.trap("Admin only function");
    };
    inquiries.entries().toArray();
  };

  // Submit a contact message
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      phone;
      message;
    };

    contactMessages.add(inquiryId, contactMessage);
    inquiryId += 1;
  };
};
