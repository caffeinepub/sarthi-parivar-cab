import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllInquiries,
  useGetContactMessages,
  useSubmitContact,
  useSubmitInquiry,
} from "@/hooks/useQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const queryClient = new QueryClient();

// --- Indian Cities List for Autocomplete ---
const INDIAN_CITIES = [
  "Agra",
  "Ahmedabad",
  "Ajmer",
  "Akola",
  "Aligarh",
  "Allahabad",
  "Amravati",
  "Amritsar",
  "Anand",
  "Ankleshwar",
  "Aurangabad",
  "Ayodhya",
  "Azamgarh",
  "Badlapur",
  "Bareilly",
  "Belgaum",
  "Bhavnagar",
  "Bhilai",
  "Bhilwara",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Bilaspur",
  "Chandigarh",
  "Chennai",
  "Chhindwara",
  "Coimbatore",
  "Cuttack",
  "Dadar",
  "Daman",
  "Darbhanga",
  "Darjeeling",
  "Davangere",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Dharwad",
  "Durg",
  "Erode",
  "Faridabad",
  "Gandhinagar",
  "Gaya",
  "Ghaziabad",
  "Goa",
  "Gorakhpur",
  "Gulbarga",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Hisar",
  "Hosur",
  "Hubli",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jalgaon",
  "Jammu",
  "Jamnagar",
  "Jamshedpur",
  "Jodhpur",
  "Junagadh",
  "Kakinada",
  "Kalyan",
  "Kanpur",
  "Karnal",
  "Kharagpur",
  "Kochi",
  "Kolhapur",
  "Kolkata",
  "Kollam",
  "Kota",
  "Kozhikode",
  "Kurnool",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Malegaon",
  "Mangalore",
  "Mathura",
  "Meerut",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Nellore",
  "Noida",
  "Palghar",
  "Panvel",
  "Patna",
  "Pondicherry",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Rohtak",
  "Rourkela",
  "Salem",
  "Sangli",
  "Satara",
  "Shimla",
  "Siliguri",
  "Solapur",
  "Srinagar",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Thrissur",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupur",
  "Udaipur",
  "Ujjain",
  "Vadodara",
  "Varanasi",
  "Vasai",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
  "Nagda",
  "Nanded",
  "Latur",
  "Osmanabad",
  "Dhule",
  "Yavatmal",
  "Amravati",
  "Chandrapur",
  "Washim",
  "Beed",
  "Parbhani",
  "Hingoli",
  "Jalna",
  "Buldhana",
  "Wardha",
  "Gadchiroli",
  "Gondia",
  "Ratnagiri",
  "Sindhudurg",
  "Kolhapur",
  "Satara",
  "Sangli",
  "Solapur",
  "Ahmednagar",
  "Nashik",
  "Dhule",
  "Jalgaon",
  "Nandurbar",
  "Aurangabad",
  "Jalna",
  "Beed",
  "Osmanabad",
  "Latur",
  "Nanded",
  "Parbhani",
  "Hingoli",
  "Buldhana",
  "Akola",
  "Washim",
  "Amravati",
  "Yavatmal",
  "Wardha",
  "Nagpur",
  "Bhandara",
  "Gondia",
  "Chandrapur",
  "Gadchiroli",
  "Mumbai",
  "Thane",
  "Raigad",
  "Ratnagiri",
  "Sindhudurg",
  "Pune",
  "Satara",
  "Sangli",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Gandhinagar",
  "Anand",
  "Mehsana",
  "Patan",
  "Banaskantha",
  "Sabarkantha",
  "Kheda",
  "Anand",
  "Nadiad",
  "Bharuch",
  "Ankleswar",
  "Valsad",
  "Navsari",
  "Tapi",
  "Dang",
  "Narmada",
  "Amreli",
  "Botad",
  "Gir Somnath",
  "Porbandar",
  "Devbhumi Dwarka",
  "Morbi",
  "Surendranagar",
  "Chhota Udaipur",
  "Dahod",
  "Panchmahal",
  "Vadodara",
  "Narmada",
  "Bharuch",
  "Surat",
  "Tapi",
  "Dang",
  "Navsari",
  "Valsad",
];

// --- City Suggestions Hook ---
function useCitySuggestions(query: string) {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  const results = INDIAN_CITIES.filter(
    (city) =>
      city.toLowerCase().startsWith(q) || city.toLowerCase().includes(q),
  );
  // prioritize startsWith
  const starts = results.filter((c) => c.toLowerCase().startsWith(q));
  const includes = results.filter((c) => !c.toLowerCase().startsWith(q));
  return [...new Set([...starts, ...includes])].slice(0, 7);
}

// --- CityInput Component ---
interface CityInputProps {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  dataOcid?: string;
}

function CityInput({
  id,
  placeholder,
  value,
  onChange,
  required,
  dataOcid,
}: CityInputProps) {
  const suggestions = useCitySuggestions(value);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = (city: string) => {
    onChange(city);
    setOpen(false);
  };

  const handleBlur = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const handleFocus = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (suggestions.length > 0) setOpen(true);
  };

  useEffect(() => {
    if (suggestions.length > 0 && value.length >= 2) setOpen(true);
    else if (value.length < 2) setOpen(false);
  }, [suggestions, value]);

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
      <Input
        id={id}
        placeholder={placeholder}
        className="pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        data-ocid={dataOcid}
      />
      {open && suggestions.length > 0 && (
        <ul
          className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          {suggestions.map((city) => (
            <li key={city}>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                onClick={() => handleSelect(city)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleSelect(city);
                }}
              >
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CabWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminTab, setAdminTab] = useState("bookings");

  const inquiriesQuery = useGetAllInquiries(adminUnlocked);
  const messagesQuery = useGetContactMessages(adminUnlocked);

  const [oneWayForm, setOneWayForm] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    mobile: "",
    vehicleType: "",
    distance: "",
    extraBags: 0,
    petAllowed: false,
    confirmedCar: false,
  });
  const [roundTripForm, setRoundTripForm] = useState({
    pickup: "",
    destination: "",
    dropCities: [] as string[],
    date: "",
    days: "",
    mobile: "",
    vehicleType: "",
    distance: "",
  });
  const [localForm, setLocalForm] = useState({
    pickup: "",
    package: "",
    date: "",
    time: "",
    mobile: "",
  });
  const [localVehicle, setLocalVehicle] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Booking Details Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetailsData, setBookingDetailsData] = useState<{
    fare: number;
    tripType: string;
    vehicleType: string;
    date: string;
    fromCity: string;
    toCity: string;
    mobile: string;
    rawFormData: Record<string, any>;
  } | null>(null);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerMobile: "",
    pickupAddress: "",
    dropAddress: "",
    adults: 1,
    children: 0,
    luggage: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const submitInquiry = useSubmitInquiry();
  const submitContact = useSubmitContact();

  const [isFetchingDistance, setIsFetchingDistance] = useState(false);
  const [isFetchingRtDistance, setIsFetchingRtDistance] = useState(false);

  const fetchDistance = async (pickup: string, drop: string) => {
    if (!pickup.trim() || !drop.trim()) {
      toast.error("Pickup aur Drop city daalein pehle");
      return;
    }
    setIsFetchingDistance(true);
    try {
      const geocode = async (city: string) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&countrycodes=in`,
          { headers: { "Accept-Language": "en" } },
        );
        const data = await res.json();
        if (!data || data.length === 0)
          throw new Error(`City not found: ${city}`);
        return {
          lat: Number.parseFloat(data[0].lat),
          lon: Number.parseFloat(data[0].lon),
        };
      };
      const [p, d] = await Promise.all([geocode(pickup), geocode(drop)]);
      const routeRes = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${p.lon},${p.lat};${d.lon},${d.lat}?overview=false`,
      );
      const routeData = await routeRes.json();
      if (routeData.code !== "Ok" || !routeData.routes?.length) {
        throw new Error("Route not found");
      }
      const km = Math.round(routeData.routes[0].distance / 1000);
      setOneWayForm((prev) => ({ ...prev, distance: String(km) }));
      toast.success(`Distance: ${km} km (road route)`);
    } catch (_err) {
      toast.error(
        "Distance fetch nahi ho saka. City naam check karein ya manually dalein.",
      );
    } finally {
      setIsFetchingDistance(false);
    }
  };

  // Auto-fetch distance when both pickup and drop are filled
  const distanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchDistanceRef = useRef(fetchDistance);
  fetchDistanceRef.current = fetchDistance;

  useEffect(() => {
    if (distanceTimerRef.current) clearTimeout(distanceTimerRef.current);
    const pickup = oneWayForm.pickup;
    const drop = oneWayForm.drop;
    if (pickup.trim().length >= 3 && drop.trim().length >= 3) {
      distanceTimerRef.current = setTimeout(() => {
        fetchDistanceRef.current(pickup, drop);
      }, 800);
    }
    return () => {
      if (distanceTimerRef.current) clearTimeout(distanceTimerRef.current);
    };
  }, [oneWayForm.pickup, oneWayForm.drop]);

  const fetchRoundTripDistance = async (
    pickup: string,
    destination: string,
    dropCities: string[],
  ) => {
    if (!pickup.trim() || !destination.trim()) return;
    setIsFetchingRtDistance(true);
    try {
      const geocodeRt = async (city: string) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&countrycodes=in`,
          { headers: { "Accept-Language": "en" } },
        );
        const data = await res.json();
        if (!data || data.length === 0)
          throw new Error(`City not found: ${city}`);
        return {
          lat: Number.parseFloat(data[0].lat),
          lon: Number.parseFloat(data[0].lon),
        };
      };
      const allCities = [
        pickup,
        ...dropCities.filter((c) => c.trim().length >= 3),
        destination,
      ];
      const coords = await Promise.all(allCities.map(geocodeRt));
      let totalKm = 0;
      for (let i = 0; i < coords.length - 1; i++) {
        const routeRes = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coords[i].lon},${coords[i].lat};${coords[i + 1].lon},${coords[i + 1].lat}?overview=false`,
        );
        const routeData = await routeRes.json();
        if (routeData.code === "Ok" && routeData.routes?.length) {
          totalKm += Math.round(routeData.routes[0].distance / 1000);
        }
      }
      const roundTripKm = totalKm * 2;
      setRoundTripForm((prev) => ({ ...prev, distance: String(roundTripKm) }));
    } catch (_err) {
      // silently fail
    } finally {
      setIsFetchingRtDistance(false);
    }
  };

  const rtDistanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchRoundTripDistanceRef = useRef(fetchRoundTripDistance);
  fetchRoundTripDistanceRef.current = fetchRoundTripDistance;

  useEffect(() => {
    if (rtDistanceTimerRef.current) clearTimeout(rtDistanceTimerRef.current);
    const pickup = roundTripForm.pickup;
    const destination = roundTripForm.destination;
    if (pickup.trim().length >= 3 && destination.trim().length >= 3) {
      rtDistanceTimerRef.current = setTimeout(() => {
        fetchRoundTripDistanceRef.current(
          pickup,
          destination,
          roundTripForm.dropCities,
        );
      }, 800);
    }
    return () => {
      if (rtDistanceTimerRef.current) clearTimeout(rtDistanceTimerRef.current);
    };
  }, [
    roundTripForm.pickup,
    roundTripForm.destination,
    roundTripForm.dropCities,
  ]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleOneWaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const owRates: Record<string, number> = {
      hatchback: 13,
      sedan: 15,
      suv: 20,
      innova: 20,
      innova_crysta: 24,
    };
    const owVehicleNames: Record<string, string> = {
      hatchback: "Hatchback",
      sedan: "Sedan",
      suv: "SUV Ertiga",
      innova: "Innova / Marazzo",
      innova_crysta: "Innova Crysta",
    };
    const rate = owRates[oneWayForm.vehicleType] || 15;
    const dist = Number.parseFloat(oneWayForm.distance) || 0;
    const addOns =
      (oneWayForm.extraBags || 0) * 150 +
      (oneWayForm.petAllowed ? 399 : 0) +
      (oneWayForm.confirmedCar ? 150 : 0);
    const fare = rate * dist + addOns;
    setBookingDetailsData({
      fare,
      tripType: "One Way",
      vehicleType:
        owVehicleNames[oneWayForm.vehicleType] ||
        oneWayForm.vehicleType ||
        "Not selected",
      date: oneWayForm.date,
      fromCity: oneWayForm.pickup,
      toCity: oneWayForm.drop,
      mobile: oneWayForm.mobile,
      rawFormData: { ...oneWayForm },
    });
    setBookingForm((p) => ({ ...p, customerMobile: oneWayForm.mobile }));
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const handleRoundTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rtRates: Record<string, number> = {
      hatchback: 10,
      sedan: 12,
      suv: 14,
      innova: 18,
      innova_crysta: 22,
    };
    const rtVehicleNames: Record<string, string> = {
      hatchback: "Hatchback",
      sedan: "Sedan",
      suv: "SUV Ertiga",
      innova: "Innova / Marazzo",
      innova_crysta: "Innova Crysta",
    };
    const days = Number.parseFloat(roundTripForm.days) || 1;
    const dist = Number.parseFloat(roundTripForm.distance) || days * 300;
    const rate = rtRates[roundTripForm.vehicleType] || 12;
    const fare = rate * dist + days * 400;
    const dropCitiesStr = roundTripForm.dropCities
      .filter((c) => c.trim())
      .join(", ");
    setBookingDetailsData({
      fare,
      tripType: "Round Trip",
      vehicleType:
        rtVehicleNames[roundTripForm.vehicleType] ||
        roundTripForm.vehicleType ||
        "Not selected",
      date: roundTripForm.date,
      fromCity: roundTripForm.pickup,
      toCity: `${roundTripForm.destination}${dropCitiesStr ? ` (via ${dropCitiesStr})` : ""}`,
      mobile: roundTripForm.mobile,
      rawFormData: { ...roundTripForm },
    });
    setBookingForm((p) => ({ ...p, customerMobile: roundTripForm.mobile }));
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const localPkgLabel = localForm.package
      ? localForm.package.replace(/-/g, " / ").replace(/rs$/, "")
      : "";
    const localVehicleLabel =
      localVehicle.charAt(0).toUpperCase() + localVehicle.slice(1);
    setBookingDetailsData({
      fare: (() => {
        const localRates: Record<string, Record<string, number>> = {
          hatchback: {
            "4hrs-40km": 1500,
            "8hrs-80km": 2000,
            "10hrs-100km": 2200,
            "12hrs-120km": 2500,
          },
          sedan: {
            "4hrs-40km": 1500,
            "8hrs-80km": 2000,
            "10hrs-100km": 2200,
            "12hrs-120km": 2500,
          },
          suv: {
            "4hrs-40km": 2000,
            "8hrs-80km": 2500,
            "10hrs-100km": 2800,
            "12hrs-120km": 3200,
          },
        };
        return localRates[localVehicle]?.[localForm.package] || 0;
      })(),
      tripType: "Local",
      vehicleType: localVehicleLabel || "Local Package",
      date: localForm.date,
      fromCity: localForm.pickup,
      toCity: localPkgLabel,
      mobile: localForm.mobile,
      rawFormData: { ...localForm, vehicleType: localVehicleLabel },
    });
    setBookingForm((p) => ({ ...p, customerMobile: localForm.mobile }));
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(contactForm);
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please email us directly.");
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Fleet", id: "fleet" },
    { label: "Contact", id: "contact" },
  ];

  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Clean & Comfortable Cars",
      desc: "Sanitized, well-maintained vehicles for every journey",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Transparent Billing",
      desc: "No hidden charges. What you see is what you pay",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Reliable Service",
      desc: "On-time pickups and safe, professional driving",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Drivers",
      desc: "Verified, licensed, and courteous drivers always",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      desc: "Round-the-clock assistance for all your travel needs",
    },
  ];

  const fleet = [
    {
      name: "Hatchback",
      rate: "₹12/km",
      seats: 3,
      img: "/assets/generated/car-hatchback.dim_400x250.png",
      examples: "Swift, WagonR",
    },
    {
      name: "Sedan",
      rate: "₹15/km",
      seats: 4,
      img: "/assets/generated/car-sedan.dim_400x250.png",
      examples: "Honda City, Dzire",
    },
    {
      name: "SUV Ertiga",
      rate: "₹18/km",
      seats: 6,
      img: "/assets/generated/car-suv.dim_400x250.png",
      examples: "Maruti Ertiga",
    },
    {
      name: "Innova / Marazzo",
      rate: "₹20/km",
      seats: 7,
      img: "/assets/generated/car-innova.dim_400x250.png",
      examples: "Innova, Marazzo",
    },
    {
      name: "Innova Crysta",
      rate: "₹24/km",
      seats: 7,
      img: "/assets/generated/car-innova-crysta.dim_400x250.png",
      examples: "Toyota Innova Crysta",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Choose a Car",
      desc: "Select the vehicle that suits your group and budget",
    },
    {
      num: "02",
      title: "Pick Up Date",
      desc: "Choose your travel date and preferred pick-up time",
    },
    {
      num: "03",
      title: "Confirm Booking",
      desc: "Confirm your details and we'll send a confirmation",
    },
    {
      num: "04",
      title: "Enjoy Your Trip",
      desc: "Relax and enjoy a safe, comfortable journey",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      city: "Ahmedabad",
      rating: 5,
      text: "Excellent service! The driver was on time, the car was spotless, and the pricing was completely transparent. Highly recommend Sarthi Cab!",
    },
    {
      name: "Priya Patel",
      city: "Baroda",
      rating: 5,
      text: "Booked an Innova for a family trip from Baroda to Ahmedabad. Comfortable journey, professional driver, and great value. Will definitely book again!",
    },
    {
      name: "Amit Shah",
      city: "Surat",
      rating: 5,
      text: "Used their one-way service from Surat to Mumbai. Very smooth experience from booking to drop. Driver was polite and helpful.",
    },
    {
      name: "Sunita Mehta",
      city: "Mumbai",
      rating: 4,
      text: "Good cab service with friendly drivers. The 24/7 support is really helpful. I was able to reach them even at midnight for my early morning trip.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const times = [
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];
  const localTimes = [
    "12:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/1773183168138-1.png"
              alt="Sarthi Cab Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span
              className={`font-display font-bold text-lg hidden sm:block ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Sarthi Cab
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-ocid="nav.link"
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:8128932525"
              data-ocid="nav.primary_button"
              className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              8128932525
            </a>
            <a
              href="https://wa.me/917499685759"
              target="_blank"
              rel="noreferrer"
              data-ocid="nav.secondary_button"
              className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    data-ocid="nav.link"
                    className="text-left font-medium text-foreground py-2 border-b border-border/50"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href="tel:8128932525"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold justify-center"
                >
                  <Phone className="w-4 h-4" /> 8128932525
                </a>
                <a
                  href="https://wa.me/917499685759"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold justify-center"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-road.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-primary/20 text-white border border-primary/40 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              Trusted Cab Service in Bharat
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Book Your Ride with{" "}
              <span className="text-primary">Sarthi Cab</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">
              Safe, reliable, and affordable cab services for one-way, round
              trips, and local travel across Bharat
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"
          >
            <Tabs defaultValue="oneway" className="w-full">
              <TabsList className="w-full rounded-none h-12 bg-muted/50 grid grid-cols-3">
                <TabsTrigger
                  value="oneway"
                  data-ocid="booking.tab"
                  className="font-semibold"
                >
                  One Way
                </TabsTrigger>
                <TabsTrigger
                  value="roundtrip"
                  data-ocid="booking.tab"
                  className="font-semibold"
                >
                  Round Trip
                </TabsTrigger>
                <TabsTrigger
                  value="local"
                  data-ocid="booking.tab"
                  className="font-semibold"
                >
                  Local
                </TabsTrigger>
              </TabsList>

              {/* One Way */}
              <TabsContent value="oneway" className="p-4 sm:p-6">
                <form onSubmit={handleOneWaySubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="ow-pickup"
                        className="text-sm font-semibold"
                      >
                        Pickup City
                      </Label>
                      <CityInput
                        id="ow-pickup"
                        placeholder="e.g. Nagpur"
                        value={oneWayForm.pickup}
                        onChange={(v) =>
                          setOneWayForm((p) => ({ ...p, pickup: v }))
                        }
                        required
                        dataOcid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ow-drop"
                        className="text-sm font-semibold"
                      >
                        Drop City
                      </Label>
                      <CityInput
                        id="ow-drop"
                        placeholder="e.g. Mumbai"
                        value={oneWayForm.drop}
                        onChange={(v) =>
                          setOneWayForm((p) => ({ ...p, drop: v }))
                        }
                        required
                        dataOcid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ow-date"
                        className="text-sm font-semibold"
                      >
                        Travel Date
                      </Label>
                      <Input
                        id="ow-date"
                        type="date"
                        value={oneWayForm.date}
                        onChange={(e) =>
                          setOneWayForm((p) => ({ ...p, date: e.target.value }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">
                        Pickup Time
                      </Label>
                      <Select
                        value={oneWayForm.time}
                        onValueChange={(v) =>
                          setOneWayForm((p) => ({ ...p, time: v }))
                        }
                      >
                        <SelectTrigger data-ocid="booking.select">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {times.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ow-mobile"
                        className="text-sm font-semibold"
                      >
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="ow-mobile"
                          type="tel"
                          placeholder="Your mobile"
                          className="pl-9"
                          value={oneWayForm.mobile}
                          onChange={(e) =>
                            setOneWayForm((p) => ({
                              ...p,
                              mobile: e.target.value,
                            }))
                          }
                          required
                          data-ocid="booking.input"
                        />
                      </div>
                    </div>
                    <div className="col-span-full space-y-3">
                      <Label className="text-sm font-semibold">
                        Vehicle Type (Rate Card)
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            value: "hatchback",
                            label: "Hatchback",
                            sub: "Swift, WagonR",
                            rate: 13,
                            seating: "3+1",
                            bags: 3,
                          },
                          {
                            value: "sedan",
                            label: "Sedan",
                            sub: "Honda City, Dzire",
                            rate: 15,
                            seating: "4+1",
                            bags: 4,
                          },
                          {
                            value: "suv",
                            label: "SUV",
                            sub: "Ertiga / Innova",
                            rate: 20,
                            seating: "6+1",
                            bags: 6,
                          },
                        ].map((v) => (
                          <button
                            key={v.value}
                            type="button"
                            onClick={() =>
                              setOneWayForm((p) => ({
                                ...p,
                                vehicleType: v.value,
                              }))
                            }
                            data-ocid={`booking.${v.value}.card`}
                            className={`rounded-xl border-2 p-4 text-left transition-all ${
                              oneWayForm.vehicleType === v.value
                                ? "border-primary bg-primary/10"
                                : "border-border bg-card hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-base">
                                {v.label}
                              </span>
                              <span className="text-primary font-bold text-lg">
                                ₹{v.rate}/km
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {v.sub}
                            </p>
                            <div className="flex gap-3 text-xs text-foreground/80">
                              <span>👥 {v.seating} seating</span>
                              <span>🧳 {v.bags} bags</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                        <p className="text-sm font-semibold text-foreground">
                          Add-ons (Optional)
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                          <div className="flex items-center gap-2 bg-background rounded-lg border px-3 py-2">
                            <span className="text-sm">🧳 Extra Luggage</span>
                            <span className="text-xs text-muted-foreground">
                              ₹150/bag
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={10}
                              value={oneWayForm.extraBags}
                              onChange={(e) =>
                                setOneWayForm((p) => ({
                                  ...p,
                                  extraBags: Math.max(
                                    0,
                                    Number(e.target.value),
                                  ),
                                }))
                              }
                              className="w-14 border rounded px-2 py-1 text-sm text-center"
                              data-ocid="booking.input"
                            />
                            <span className="text-xs text-muted-foreground">
                              bags
                            </span>
                          </div>
                          <label className="flex items-center gap-2 bg-background rounded-lg border px-3 py-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={oneWayForm.petAllowed}
                              onChange={(e) =>
                                setOneWayForm((p) => ({
                                  ...p,
                                  petAllowed: e.target.checked,
                                }))
                              }
                              data-ocid="booking.checkbox"
                              className="w-4 h-4 accent-primary"
                            />
                            <span className="text-sm">🐾 Pet Allowed</span>
                            <span className="text-xs text-muted-foreground">
                              ₹399
                            </span>
                          </label>
                          <label className="flex items-center gap-2 bg-background rounded-lg border px-3 py-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={oneWayForm.confirmedCar}
                              onChange={(e) =>
                                setOneWayForm((p) => ({
                                  ...p,
                                  confirmedCar: e.target.checked,
                                }))
                              }
                              data-ocid="booking.checkbox"
                              className="w-4 h-4 accent-primary"
                            />
                            <span className="text-sm">
                              ✅ Confirmed Car (2022+)
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ₹150
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ow-distance"
                        className="text-sm font-semibold"
                      >
                        Distance (km)
                      </Label>
                      <div className="relative">
                        {isFetchingDistance ? (
                          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
                        ) : (
                          <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        )}
                        <Input
                          id="ow-distance"
                          type="number"
                          min="1"
                          placeholder="Auto calculated..."
                          className="pl-9"
                          value={oneWayForm.distance}
                          onChange={(e) =>
                            setOneWayForm((p) => ({
                              ...p,
                              distance: e.target.value,
                            }))
                          }
                          data-ocid="booking.input"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isFetchingDistance
                          ? "Distance fetch ho raha hai..."
                          : "City naam dalne ke baad distance automatic aayega"}
                      </p>
                    </div>
                  </div>
                  {(() => {
                    const owRates: Record<string, number> = {
                      hatchback: 13,
                      sedan: 15,
                      suv: 20,
                      innova: 20,
                      innova_crysta: 24,
                    };
                    const owVehicleNames: Record<string, string> = {
                      hatchback: "Hatchback",
                      sedan: "Sedan",
                      suv: "SUV Ertiga",
                      innova: "Innova / Marazzo",
                      innova_crysta: "Innova Crysta",
                    };
                    const rate = owRates[oneWayForm.vehicleType];
                    const dist = Number.parseFloat(oneWayForm.distance);
                    if (!rate || !dist || dist <= 0) return null;
                    const addOns =
                      (oneWayForm.extraBags || 0) * 150 +
                      (oneWayForm.petAllowed ? 399 : 0) +
                      (oneWayForm.confirmedCar ? 150 : 0);
                    const fare = rate * dist + addOns;
                    return (
                      <div
                        className="mt-4 p-4 rounded-xl border-2 border-orange-400 bg-orange-50 text-orange-900"
                        data-ocid="booking.card"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-orange-500 text-lg">🧮</span>
                          <span className="font-bold text-base text-orange-800">
                            Fare Estimate —{" "}
                            {owVehicleNames[oneWayForm.vehicleType]}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <span className="text-orange-700">Distance:</span>
                          <span className="font-semibold">{dist} km</span>
                          <span className="text-orange-700">Rate:</span>
                          <span className="font-semibold">₹{rate}/km</span>
                          {addOns > 0 && (
                            <>
                              <span className="text-orange-700">Add-ons:</span>
                              <span className="font-semibold">
                                ₹{addOns.toLocaleString("en-IN")}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="mt-3 pt-3 border-t border-orange-300 flex justify-between items-center">
                          <span className="font-bold text-orange-800">
                            Estimated Fare:
                          </span>
                          <span className="font-bold text-xl text-orange-700">
                            ₹{fare.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-orange-500 italic">
                          * Toll & Parking charges extra
                        </p>
                      </div>
                    );
                  })()}
                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-bold"
                      disabled={submitInquiry.isPending}
                      data-ocid="booking.submit_button"
                    >
                      {submitInquiry.isPending
                        ? "Submitting..."
                        : "Explore Cabs →"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Round Trip */}
              <TabsContent value="roundtrip" className="p-4 sm:p-6">
                <form onSubmit={handleRoundTripSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="rt-pickup"
                        className="text-sm font-semibold"
                      >
                        Pickup City
                      </Label>
                      <CityInput
                        id="rt-pickup"
                        placeholder="e.g. Nagpur"
                        value={roundTripForm.pickup}
                        onChange={(v) =>
                          setRoundTripForm((p) => ({ ...p, pickup: v }))
                        }
                        required
                        dataOcid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="rt-dest"
                        className="text-sm font-semibold"
                      >
                        Destination City
                      </Label>
                      <CityInput
                        id="rt-dest"
                        placeholder="e.g. Pune"
                        value={roundTripForm.destination}
                        onChange={(v) =>
                          setRoundTripForm((p) => ({ ...p, destination: v }))
                        }
                        required
                        dataOcid="booking.input"
                      />
                    </div>
                    {/* Drop Stops */}
                    {roundTripForm.dropCities.map((city, idx) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: drop cities are positional
                      <div key={idx} className="space-y-1">
                        <Label className="text-sm font-semibold">
                          Drop Stop {idx + 1}
                        </Label>
                        <div className="flex gap-2">
                          <CityInput
                            id={`rt-drop-${idx}`}
                            placeholder="e.g. Nashik"
                            value={city}
                            onChange={(v) => {
                              const updated = [...roundTripForm.dropCities];
                              updated[idx] = v;
                              setRoundTripForm((p) => ({
                                ...p,
                                dropCities: updated,
                              }));
                            }}
                            dataOcid="booking.input"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = roundTripForm.dropCities.filter(
                                (_, i) => i !== idx,
                              );
                              setRoundTripForm((p) => ({
                                ...p,
                                dropCities: updated,
                              }));
                            }}
                            className="flex-shrink-0 w-8 h-10 flex items-center justify-center rounded-md border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                            data-ocid="booking.delete_button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Add Drop Button */}
                    <div className="space-y-1 flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setRoundTripForm((p) => ({
                            ...p,
                            dropCities: [...p.dropCities, ""],
                          }))
                        }
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
                        data-ocid="booking.secondary_button"
                      >
                        <Plus className="w-4 h-4" />
                        Add Drop
                      </button>
                    </div>
                    {/* Auto Distance Display */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">
                        Estimated Distance (Round Trip)
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          readOnly
                          placeholder={
                            isFetchingRtDistance
                              ? "Calculating..."
                              : "Auto-calculated"
                          }
                          value={
                            roundTripForm.distance
                              ? `${roundTripForm.distance} km`
                              : ""
                          }
                          className="pl-9 bg-muted/50 cursor-not-allowed"
                          data-ocid="booking.input"
                        />
                        {isFetchingRtDistance && (
                          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="rt-date"
                        className="text-sm font-semibold"
                      >
                        Travel Date
                      </Label>
                      <Input
                        id="rt-date"
                        type="date"
                        value={roundTripForm.date}
                        onChange={(e) =>
                          setRoundTripForm((p) => ({
                            ...p,
                            date: e.target.value,
                          }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="rt-days"
                        className="text-sm font-semibold"
                      >
                        Number of Days
                      </Label>
                      <Input
                        id="rt-days"
                        type="number"
                        min="1"
                        placeholder="e.g. 3"
                        value={roundTripForm.days}
                        onChange={(e) =>
                          setRoundTripForm((p) => ({
                            ...p,
                            days: e.target.value,
                          }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="rt-mobile"
                        className="text-sm font-semibold"
                      >
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="rt-mobile"
                          type="tel"
                          placeholder="Your mobile"
                          className="pl-9"
                          value={roundTripForm.mobile}
                          onChange={(e) =>
                            setRoundTripForm((p) => ({
                              ...p,
                              mobile: e.target.value,
                            }))
                          }
                          required
                          data-ocid="booking.input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">
                        Vehicle Type
                      </Label>
                      <Select
                        value={roundTripForm.vehicleType}
                        onValueChange={(v) =>
                          setRoundTripForm((p) => ({ ...p, vehicleType: v }))
                        }
                      >
                        <SelectTrigger data-ocid="booking.select">
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hatchback">
                            Hatchback (Swift, WagonR)
                          </SelectItem>
                          <SelectItem value="sedan">
                            Sedan (Honda City, Dzire)
                          </SelectItem>
                          <SelectItem value="suv">SUV Ertiga</SelectItem>
                          <SelectItem value="innova">
                            Innova / Marazzo
                          </SelectItem>
                          <SelectItem value="innova_crysta">
                            Innova Crysta
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(() => {
                    const rtRates: Record<string, number> = {
                      hatchback: 10,
                      sedan: 12,
                      suv: 14,
                      innova: 18,
                      innova_crysta: 22,
                    };
                    const rtVehicleNames: Record<string, string> = {
                      hatchback: "Hatchback",
                      sedan: "Sedan",
                      suv: "SUV Ertiga",
                      innova: "Innova / Marazzo",
                      innova_crysta: "Innova Crysta",
                    };
                    const rate = rtRates[roundTripForm.vehicleType];
                    const days = Number.parseInt(roundTripForm.days);
                    if (!rate || !days || days <= 0) return null;
                    const distanceVal = Number.parseInt(roundTripForm.distance);
                    const minKm = distanceVal > 0 ? distanceVal : days * 300;
                    const baseFare = minKm * rate;
                    const driverAllowance = days * 400;
                    const total = baseFare + driverAllowance;
                    return (
                      <div
                        className="mt-4 p-4 rounded-xl border-2 border-orange-400 bg-orange-50 text-orange-900"
                        data-ocid="booking.card"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-orange-500 text-lg">🧮</span>
                          <span className="font-bold text-base text-orange-800">
                            Fare Estimate —{" "}
                            {rtVehicleNames[roundTripForm.vehicleType]}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <span className="text-orange-700">
                            Minimum Distance:
                          </span>
                          <span className="font-semibold">
                            {minKm} km{" "}
                            {distanceVal > 0
                              ? "(auto-calculated)"
                              : `(${days} days × 300 km)`}
                          </span>
                          <span className="text-orange-700">Rate:</span>
                          <span className="font-semibold">₹{rate}/km</span>
                          <span className="text-orange-700">Base Fare:</span>
                          <span className="font-semibold">
                            ₹{baseFare.toLocaleString("en-IN")}
                          </span>
                          <span className="text-orange-700">
                            Driver Allowance:
                          </span>
                          <span className="font-semibold">
                            ₹{driverAllowance.toLocaleString("en-IN")} ({days}{" "}
                            days × ₹400)
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-orange-300 flex justify-between items-center">
                          <span className="font-bold text-orange-800">
                            Total Estimate:
                          </span>
                          <span className="font-bold text-xl text-orange-700">
                            ₹{total.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-orange-500 italic">
                          * Toll & Parking charges extra
                        </p>
                      </div>
                    );
                  })()}
                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground font-bold"
                      disabled={submitInquiry.isPending}
                      data-ocid="booking.submit_button"
                    >
                      {submitInquiry.isPending
                        ? "Submitting..."
                        : "Explore Cabs →"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Local */}
              <TabsContent value="local" className="p-4 sm:p-6">
                <form onSubmit={handleLocalSubmit} className="space-y-5">
                  {/* Pickup City + Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="local-pickup"
                        className="text-sm font-semibold"
                      >
                        Pickup City
                      </Label>
                      <CityInput
                        id="local-pickup"
                        placeholder="e.g. Surat"
                        value={localForm.pickup}
                        onChange={(v) =>
                          setLocalForm((p) => ({ ...p, pickup: v }))
                        }
                        required
                        dataOcid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="local-date"
                        className="text-sm font-semibold"
                      >
                        Date
                      </Label>
                      <Input
                        id="local-date"
                        type="date"
                        value={localForm.date}
                        onChange={(e) =>
                          setLocalForm((p) => ({ ...p, date: e.target.value }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold">
                        Pickup Time
                      </Label>
                      <Select
                        value={localForm.time}
                        onValueChange={(v) =>
                          setLocalForm((p) => ({ ...p, time: v }))
                        }
                      >
                        <SelectTrigger data-ocid="booking.select">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {localTimes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Vehicle Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">
                      Vehicle Type
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          value: "hatchback",
                          label: "Hatchback",
                          sub: "Swift, WagonR",
                          seating: "3+1",
                          priceRange: "₹1,500 – ₹2,500",
                        },
                        {
                          value: "sedan",
                          label: "Sedan",
                          sub: "Honda City, Dzire",
                          seating: "4+1",
                          priceRange: "₹1,500 – ₹2,500",
                        },
                        {
                          value: "suv",
                          label: "SUV",
                          sub: "Ertiga / Innova",
                          seating: "6+1",
                          priceRange: "₹2,000 – ₹3,200",
                        },
                      ].map((v) => (
                        <button
                          key={v.value}
                          type="button"
                          onClick={() => {
                            setLocalVehicle(v.value);
                            setLocalForm((p) => ({ ...p, package: "" }));
                          }}
                          data-ocid={`booking.${v.value}.card`}
                          className={`rounded-xl border-2 p-4 text-left transition-all ${
                            localVehicle === v.value
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-base">
                              {v.label}
                            </span>
                            <span className="text-primary font-bold text-sm">
                              {v.priceRange}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {v.sub}
                          </p>
                          <span className="text-xs text-foreground/80">
                            👥 {v.seating} seating
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Package Selection */}
                  {localVehicle && (
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">
                        Select Package
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(() => {
                          const localPkgs: Record<
                            string,
                            { label: string; value: string; price: number }[]
                          > = {
                            hatchback: [
                              {
                                label: "4 Hrs / 40 Km",
                                value: "4hrs-40km",
                                price: 1500,
                              },
                              {
                                label: "8 Hrs / 80 Km",
                                value: "8hrs-80km",
                                price: 2000,
                              },
                              {
                                label: "10 Hrs / 100 Km",
                                value: "10hrs-100km",
                                price: 2200,
                              },
                              {
                                label: "12 Hrs / 120 Km",
                                value: "12hrs-120km",
                                price: 2500,
                              },
                            ],
                            sedan: [
                              {
                                label: "4 Hrs / 40 Km",
                                value: "4hrs-40km",
                                price: 1500,
                              },
                              {
                                label: "8 Hrs / 80 Km",
                                value: "8hrs-80km",
                                price: 2000,
                              },
                              {
                                label: "10 Hrs / 100 Km",
                                value: "10hrs-100km",
                                price: 2200,
                              },
                              {
                                label: "12 Hrs / 120 Km",
                                value: "12hrs-120km",
                                price: 2500,
                              },
                            ],
                            suv: [
                              {
                                label: "4 Hrs / 40 Km",
                                value: "4hrs-40km",
                                price: 2000,
                              },
                              {
                                label: "8 Hrs / 80 Km",
                                value: "8hrs-80km",
                                price: 2500,
                              },
                              {
                                label: "10 Hrs / 100 Km",
                                value: "10hrs-100km",
                                price: 2800,
                              },
                              {
                                label: "12 Hrs / 120 Km",
                                value: "12hrs-120km",
                                price: 3200,
                              },
                            ],
                          };
                          return (localPkgs[localVehicle] || []).map((pkg) => (
                            <button
                              key={pkg.value}
                              type="button"
                              onClick={() =>
                                setLocalForm((p) => ({
                                  ...p,
                                  package: pkg.value,
                                }))
                              }
                              data-ocid="booking.toggle"
                              className={`rounded-xl border-2 p-3 text-center transition-all ${
                                localForm.package === pkg.value
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-card hover:border-primary/50"
                              }`}
                            >
                              <div className="font-bold text-primary text-lg">
                                ₹{pkg.price.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {pkg.label}
                              </div>
                            </button>
                          ));
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Fare Display */}
                  {localVehicle &&
                    localForm.package &&
                    (() => {
                      const localRates: Record<
                        string,
                        Record<string, number>
                      > = {
                        hatchback: {
                          "4hrs-40km": 1500,
                          "8hrs-80km": 2000,
                          "10hrs-100km": 2200,
                          "12hrs-120km": 2500,
                        },
                        sedan: {
                          "4hrs-40km": 1500,
                          "8hrs-80km": 2000,
                          "10hrs-100km": 2200,
                          "12hrs-120km": 2500,
                        },
                        suv: {
                          "4hrs-40km": 2000,
                          "8hrs-80km": 2500,
                          "10hrs-100km": 2800,
                          "12hrs-120km": 3200,
                        },
                      };
                      const fare =
                        localRates[localVehicle]?.[localForm.package];
                      if (!fare) return null;
                      const pkgLabels: Record<string, string> = {
                        "4hrs-40km": "4 Hrs / 40 Km",
                        "8hrs-80km": "8 Hrs / 80 Km",
                        "10hrs-100km": "10 Hrs / 100 Km",
                        "12hrs-120km": "12 Hrs / 120 Km",
                      };
                      return (
                        <div
                          className="p-4 rounded-xl border-2 border-orange-400 bg-orange-50 text-orange-900"
                          data-ocid="booking.card"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-orange-500 text-lg">🧮</span>
                            <span className="font-bold text-base text-orange-800">
                              Estimated Fare
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span>
                              🚗{" "}
                              {localVehicle.charAt(0).toUpperCase() +
                                localVehicle.slice(1)}
                            </span>
                            <span>📦 {pkgLabels[localForm.package]}</span>
                            <span className="font-bold text-lg text-orange-700">
                              ₹{fare.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-orange-600 mt-2">
                            ⚠️ Toll & Parking: Extra
                          </p>
                        </div>
                      );
                    })()}

                  {/* Mobile + Submit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="local-mobile"
                        className="text-sm font-semibold"
                      >
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="local-mobile"
                          type="tel"
                          placeholder="Your mobile"
                          className="pl-9"
                          value={localForm.mobile}
                          onChange={(e) =>
                            setLocalForm((p) => ({
                              ...p,
                              mobile: e.target.value,
                            }))
                          }
                          required
                          data-ocid="booking.input"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-bold"
                        disabled={submitInquiry.isPending}
                        data-ocid="booking.submit_button"
                      >
                        {submitInquiry.isPending
                          ? "Submitting..."
                          : "Book Now →"}
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl font-bold text-foreground"
            >
              Travel with Confidence
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="card-hover text-center p-6 rounded-xl border border-border bg-card"
                data-ocid="services.card"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-base mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "5000+", label: "Happy Customers" },
              { num: "50+", label: "Cities Covered" },
              { num: "10+", label: "Years Experience" },
              { num: "24/7", label: "Customer Support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {s.num}
                </p>
                <p className="text-white/80 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
            >
              Our Fleet
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              Choose Your Ride
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {fleet.map((car) => (
              <motion.div
                key={car.name}
                variants={itemVariants}
                className="card-hover bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                data-ocid="fleet.card"
              >
                <div className="bg-muted/40 p-4">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-36 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base mb-1">
                    {car.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-2">
                    {car.examples}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary font-bold text-lg">
                      {car.rate}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" /> {car.seats} seats
                    </span>
                  </div>
                  <a
                    href="tel:8128932525"
                    data-ocid="fleet.primary_button"
                    className="block text-center bg-primary text-primary-foreground font-semibold text-sm py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              4 Simple Steps to Book
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center relative"
                data-ocid="steps.card"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute right-0 top-6 -translate-y-1/2 w-8 h-8 text-primary/30" />
                )}
                <h3 className="font-display font-bold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
            >
              Testimonials
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              What Our Customers Say
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="card-hover bg-white p-6 rounded-2xl border border-border shadow-sm"
                data-ocid="testimonials.card"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star
                      key={`star-${t.name}-${j}`}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
            >
              Get In Touch
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              Contact Sarthi Cab
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl font-bold mb-6">
                Reach Us Anytime
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:8128932525"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                  data-ocid="contact.link"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Call Us
                    </p>
                    <p className="font-bold text-lg">8128932525</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/917499685759"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-green-400/50 hover:bg-green-50 transition-colors group"
                  data-ocid="contact.link"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      WhatsApp
                    </p>
                    <p className="font-bold text-lg">7499685759</p>
                  </div>
                </a>
                <a
                  href="mailto:atithicab2525@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                  data-ocid="contact.link"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email Us
                    </p>
                    <p className="font-bold">atithicab2525@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Available
                    </p>
                    <p className="font-bold">24 Hours / 7 Days</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="c-name" className="font-semibold">
                      Your Name
                    </Label>
                    <Input
                      id="c-name"
                      placeholder="Rajesh Sharma"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-email" className="font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-phone" className="font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="c-phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-message" className="font-semibold">
                    Message
                  </Label>
                  <Textarea
                    id="c-message"
                    placeholder="Tell us about your travel requirements..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-3"
                  disabled={submitContact.isPending}
                  data-ocid="contact.submit_button"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </Button>
                {submitContact.isSuccess && (
                  <div
                    className="flex items-center gap-2 text-green-600 text-sm"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle className="w-4 h-4" /> Message sent
                    successfully!
                  </div>
                )}
                {submitContact.isError && (
                  <div
                    className="text-destructive text-sm"
                    data-ocid="contact.error_state"
                  >
                    Failed to send. Please call us directly.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/assets/uploads/1773183168138-1.png"
                  alt="Sarthi Cab"
                  className="h-10 w-auto object-contain bg-white rounded p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-display font-bold text-lg">
                  Sarthi Cab
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Your trusted travel partner across Bharat. Safe, comfortable,
                and affordable rides — always.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/917499685759"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors"
                  data-ocid="footer.link"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-base mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className="text-white/60 text-sm hover:text-primary transition-colors"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-base mb-4">
                Our Services
              </h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>One Way Cab</li>
                <li>Round Trip</li>
                <li>Local Packages</li>
                <li>Airport Transfer</li>
                <li>Corporate Travel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-base mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:8128932525"
                    className="flex items-center gap-2 text-white/60 text-sm hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    <Phone className="w-4 h-4 shrink-0" /> 8128932525
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917499685759"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-white/60 text-sm hover:text-green-400 transition-colors"
                    data-ocid="footer.link"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" /> 7499685759
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:atithicab2525@gmail.com"
                    className="flex items-center gap-2 text-white/60 text-sm hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    <Mail className="w-4 h-4 shrink-0" />{" "}
                    atithicab2525@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; 2025 Sarthi Cab. All rights reserved.
            </p>
            <p className="text-white/40 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowAdmin(true)}
              className="text-white/60 hover:text-white text-sm font-medium border border-white/30 px-3 py-1 rounded transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showAdmin && !adminUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 relative">
            <button
              type="button"
              onClick={() => {
                setShowAdmin(false);
                setAdminPassword("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              data-ocid="admin.close_button"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Admin Login
            </h2>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (adminPassword === "sarthi2525") {
                      setAdminUnlocked(true);
                      setShowAdmin(false);
                    } else {
                      toast.error("Wrong password");
                    }
                  }
                }}
                data-ocid="admin.input"
              />
              <Button
                className="w-full"
                onClick={() => {
                  if (adminPassword === "sarthi2525") {
                    setAdminUnlocked(true);
                    setShowAdmin(false);
                  } else {
                    toast.error("Wrong password");
                  }
                }}
                data-ocid="admin.submit_button"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {adminUnlocked && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Sarthi Cab — Admin Panel
              </h1>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    inquiriesQuery.refetch();
                    messagesQuery.refetch();
                  }}
                >
                  <Loader2
                    className={`w-4 h-4 mr-2 ${inquiriesQuery.isFetching || messagesQuery.isFetching ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAdminUnlocked(false);
                    setAdminPassword("");
                  }}
                  data-ocid="admin.close_button"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-6 border-b">
              <button
                type="button"
                onClick={() => setAdminTab("bookings")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${adminTab === "bookings" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                data-ocid="admin.tab"
              >
                Booking Inquiries
              </button>
              <button
                type="button"
                onClick={() => setAdminTab("messages")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${adminTab === "messages" ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                data-ocid="admin.tab"
              >
                Contact Messages
              </button>
            </div>

            {adminTab === "bookings" && (
              <div>
                {inquiriesQuery.isLoading ? (
                  <div
                    className="flex items-center justify-center py-12 text-gray-400"
                    data-ocid="admin.loading_state"
                  >
                    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading...
                  </div>
                ) : inquiriesQuery.isError ? (
                  <div
                    className="text-center py-12 text-red-500"
                    data-ocid="admin.error_state"
                  >
                    Error loading inquiries. Please refresh.
                  </div>
                ) : !inquiriesQuery.data?.length ? (
                  <div
                    className="text-center py-12 text-gray-400"
                    data-ocid="admin.empty_state"
                  >
                    No booking inquiries yet.
                  </div>
                ) : (
                  <div
                    className="rounded-xl border overflow-hidden"
                    data-ocid="admin.table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-50">
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Trip Type</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Mobile</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiriesQuery.data.map(([id, inquiry], idx) => (
                          <TableRow key={id.toString()}>
                            <TableCell className="text-gray-400 text-sm">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {inquiry.tripType}
                            </TableCell>
                            <TableCell>{inquiry.pickupCity}</TableCell>
                            <TableCell>{inquiry.dropCity}</TableCell>
                            <TableCell>{inquiry.pickupDate}</TableCell>
                            <TableCell>{inquiry.pickupTime}</TableCell>
                            <TableCell>{inquiry.mobile}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}

            {adminTab === "messages" && (
              <div>
                {messagesQuery.isLoading ? (
                  <div
                    className="flex items-center justify-center py-12 text-gray-400"
                    data-ocid="admin.loading_state"
                  >
                    <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading...
                  </div>
                ) : messagesQuery.isError ? (
                  <div
                    className="text-center py-12 text-red-500"
                    data-ocid="admin.error_state"
                  >
                    Error loading messages. Please refresh.
                  </div>
                ) : !messagesQuery.data?.length ? (
                  <div
                    className="text-center py-12 text-gray-400"
                    data-ocid="admin.empty_state"
                  >
                    No contact messages yet.
                  </div>
                ) : (
                  <div
                    className="rounded-xl border overflow-hidden"
                    data-ocid="admin.table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-50">
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messagesQuery.data.map(([id, msg], idx) => (
                          <TableRow key={id.toString()}>
                            <TableCell className="text-gray-400 text-sm">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {msg.name}
                            </TableCell>
                            <TableCell>{msg.phone}</TableCell>
                            <TableCell>{msg.email}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {msg.message}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a
          href="https://wa.me/917499685759"
          target="_blank"
          rel="noreferrer"
          data-ocid="fab.primary_button"
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <SiWhatsapp className="w-6 h-6" />
        </a>
        <a
          href="tel:8128932525"
          data-ocid="fab.secondary_button"
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showBookingModal && bookingDetailsData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowBookingModal(false);
            }}
            data-ocid="booking.modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Complete Your Booking
                  </h2>
                  <p className="text-orange-100 text-sm mt-0.5">
                    Fill details to confirm your cab
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                  data-ocid="booking.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!bookingConfirmed ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const d = bookingDetailsData;
                    const combinedName = `${bookingForm.customerName} | ${bookingForm.customerMobile} | Adults:${bookingForm.adults} Children:${bookingForm.children} | Luggage:${bookingForm.luggage} | Pickup:${bookingForm.pickupAddress} | Drop:${bookingForm.dropAddress}`;
                    try {
                      await submitInquiry.mutateAsync({
                        tripType: d.tripType.toLowerCase().replace(" ", "-"),
                        pickupCity: d.fromCity,
                        dropCity: d.toCity,
                        pickupDate: d.date,
                        pickupTime: "",
                        mobile: bookingForm.customerMobile,
                        name: combinedName,
                      });
                      setBookingConfirmed(true);
                      // Reset forms
                      setOneWayForm({
                        pickup: "",
                        drop: "",
                        date: "",
                        time: "",
                        mobile: "",
                        vehicleType: "",
                        distance: "",
                        extraBags: 0,
                        petAllowed: false,
                        confirmedCar: false,
                      });
                      setRoundTripForm({
                        pickup: "",
                        destination: "",
                        dropCities: [],
                        date: "",
                        days: "",
                        mobile: "",
                        vehicleType: "",
                        distance: "",
                      });
                      setLocalForm({
                        pickup: "",
                        package: "",
                        date: "",
                        time: "",
                        mobile: "",
                      });
                      setLocalVehicle("");
                    } catch {
                      toast.error(
                        "Booking failed. Please call us directly at 8128932525",
                      );
                    }
                  }}
                  className="p-5 space-y-4"
                >
                  {/* Trip Summary Badge */}
                  <div className="flex flex-wrap gap-2 p-3 bg-orange-50 rounded-xl border border-orange-200">
                    <span className="text-sm font-semibold text-orange-700">
                      🚗 {bookingDetailsData.tripType}
                    </span>
                    <span className="text-sm text-orange-600">
                      • {bookingDetailsData.vehicleType}
                    </span>
                    <span className="text-sm text-orange-600">
                      • {bookingDetailsData.fromCity} →{" "}
                      {bookingDetailsData.toCity}
                    </span>
                    {bookingDetailsData.date && (
                      <span className="text-sm text-orange-600">
                        • {bookingDetailsData.date}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="bm-name"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="bm-name"
                        placeholder="Your full name"
                        value={bookingForm.customerName}
                        onChange={(e) =>
                          setBookingForm((p) => ({
                            ...p,
                            customerName: e.target.value,
                          }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="bm-mobile"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Mobile Number *
                      </Label>
                      <Input
                        id="bm-mobile"
                        type="tel"
                        placeholder="10-digit mobile"
                        value={bookingForm.customerMobile}
                        onChange={(e) =>
                          setBookingForm((p) => ({
                            ...p,
                            customerMobile: e.target.value,
                          }))
                        }
                        required
                        data-ocid="booking.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="bm-pickup"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Pickup Address *
                    </Label>
                    <Textarea
                      id="bm-pickup"
                      placeholder="Full pickup address (house no, street, area, city)"
                      rows={2}
                      value={bookingForm.pickupAddress}
                      onChange={(e) =>
                        setBookingForm((p) => ({
                          ...p,
                          pickupAddress: e.target.value,
                        }))
                      }
                      required
                      data-ocid="booking.textarea"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="bm-drop"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Drop Address *
                    </Label>
                    <Textarea
                      id="bm-drop"
                      placeholder="Full drop address (house no, street, area, city)"
                      rows={2}
                      value={bookingForm.dropAddress}
                      onChange={(e) =>
                        setBookingForm((p) => ({
                          ...p,
                          dropAddress: e.target.value,
                        }))
                      }
                      required
                      data-ocid="booking.textarea"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Travellers
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label
                          htmlFor="bm-adults"
                          className="text-xs text-gray-500"
                        >
                          Adults (min 1)
                        </Label>
                        <Input
                          id="bm-adults"
                          type="number"
                          min={1}
                          value={bookingForm.adults}
                          onChange={(e) =>
                            setBookingForm((p) => ({
                              ...p,
                              adults: Number(e.target.value),
                            }))
                          }
                          required
                          data-ocid="booking.input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="bm-children"
                          className="text-xs text-gray-500"
                        >
                          Children
                        </Label>
                        <Input
                          id="bm-children"
                          type="number"
                          min={0}
                          value={bookingForm.children}
                          onChange={(e) =>
                            setBookingForm((p) => ({
                              ...p,
                              children: Number(e.target.value),
                            }))
                          }
                          data-ocid="booking.input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="bm-luggage"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Luggage Details
                    </Label>
                    <Textarea
                      id="bm-luggage"
                      placeholder="Describe your luggage (e.g. 2 suitcases, 1 backpack)"
                      rows={2}
                      value={bookingForm.luggage}
                      onChange={(e) =>
                        setBookingForm((p) => ({
                          ...p,
                          luggage: e.target.value,
                        }))
                      }
                      data-ocid="booking.textarea"
                    />
                  </div>

                  {/* Fare & Advance Section */}
                  {bookingDetailsData.fare > 0 && (
                    <div className="rounded-xl overflow-hidden border border-orange-300">
                      <div className="p-3 bg-green-50 border-b border-green-200 flex justify-between items-center">
                        <span className="text-green-800 font-semibold text-sm">
                          💰 Estimated Fare
                        </span>
                        <span className="text-orange-700 font-bold text-lg">
                          ₹{bookingDetailsData.fare.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="p-4 bg-orange-500 flex justify-between items-center">
                        <div>
                          <p className="text-white font-bold text-base">
                            ⚡ Advance to Pay (20%)
                          </p>
                          <p className="text-orange-100 text-xs mt-0.5">
                            Pay this amount via QR to confirm booking
                          </p>
                        </div>
                        <span className="text-white font-bold text-2xl">
                          ₹
                          {Math.round(
                            bookingDetailsData.fare * 0.2,
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* QR Code Section */}
                  <div className="rounded-xl border-2 border-orange-200 p-4 bg-orange-50 text-center">
                    <p className="font-bold text-orange-800 text-sm mb-3">
                      📱 Pay Advance via UPI / QR Code
                    </p>
                    <div className="flex justify-center mb-3">
                      <img
                        src="/assets/uploads/Screenshot_2026-03-11-06-50-55-05_4336b74596784d9a2aa81f87c2016f50-1.jpg"
                        alt="UPI QR Code"
                        className="w-48 h-48 object-contain rounded-xl border-2 border-orange-300 shadow-md"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-orange-800 font-semibold text-sm">
                        UPI ID:{" "}
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-orange-200 text-orange-700">
                          raktnasha@oksbi
                        </span>
                      </p>
                      <p className="text-orange-700 text-sm">
                        Name: <strong>ritesh gadhiya</strong>
                      </p>
                      {bookingDetailsData.fare > 0 && (
                        <p className="text-orange-800 font-bold text-base mt-2">
                          Pay ₹
                          {Math.round(
                            bookingDetailsData.fare * 0.2,
                          ).toLocaleString("en-IN")}{" "}
                          as advance
                        </p>
                      )}
                    </div>
                    <p className="text-orange-600 text-xs mt-2 italic">
                      * Remaining balance payable at pickup. Toll & Parking
                      extra.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-base rounded-xl"
                    disabled={submitInquiry.isPending}
                    data-ocid="booking.confirm_button"
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "✅ Confirm Booking"
                    )}
                  </Button>
                </form>
              ) : (
                /* Success State */
                <div
                  className="p-6 text-center space-y-5"
                  data-ocid="booking.success_state"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Booking Confirmed! 🎉
                    </h3>
                    <p className="text-gray-500 mt-1 text-sm">
                      Your cab has been booked successfully
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-1.5">
                    <p>
                      <span className="text-gray-500">Name:</span>{" "}
                      <strong>{bookingForm.customerName}</strong>
                    </p>
                    <p>
                      <span className="text-gray-500">Trip:</span>{" "}
                      <strong>
                        {bookingDetailsData.tripType} •{" "}
                        {bookingDetailsData.vehicleType}
                      </strong>
                    </p>
                    <p>
                      <span className="text-gray-500">From:</span>{" "}
                      <strong>{bookingDetailsData.fromCity}</strong>
                    </p>
                    <p>
                      <span className="text-gray-500">To:</span>{" "}
                      <strong>{bookingDetailsData.toCity}</strong>
                    </p>
                    {bookingDetailsData.fare > 0 && (
                      <>
                        <p>
                          <span className="text-gray-500">Total Fare:</span>{" "}
                          <strong>
                            ₹{bookingDetailsData.fare.toLocaleString("en-IN")}
                          </strong>
                        </p>
                        <p>
                          <span className="text-gray-500">
                            Advance Paid (20%):
                          </span>{" "}
                          <strong className="text-orange-600">
                            ₹
                            {Math.round(
                              bookingDetailsData.fare * 0.2,
                            ).toLocaleString("en-IN")}
                          </strong>
                        </p>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 font-medium">
                      Send booking details via:
                    </p>
                    <a
                      href={`https://wa.me/917499685759?text=${encodeURIComponent(`🚗 *Sarthi Cab Cab - Booking Confirmed!*\n\n👤 Name: ${bookingForm.customerName}\n📱 Mobile: ${bookingForm.customerMobile}\n🗺 Trip: ${bookingDetailsData.tripType}\n📍 Pickup: ${bookingForm.pickupAddress}\n📍 Drop: ${bookingForm.dropAddress}\n👥 Travellers: ${bookingForm.adults} Adults, ${bookingForm.children} Children\n🧳 Luggage: ${bookingForm.luggage || "Not specified"}\n💰 Total Fare: ₹${bookingDetailsData.fare.toLocaleString("en-IN")}\n💳 Advance (20%): ₹${Math.round(bookingDetailsData.fare * 0.2).toLocaleString("en-IN")}\n📅 Date: ${bookingDetailsData.date}\n🚗 Vehicle: ${bookingDetailsData.vehicleType}\n\n📞 Contact: 8128932525\nThank you for choosing Sarthi Cab Cab!`)}`}
                      className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
                      data-ocid="booking.primary_button"
                    >
                      <SiWhatsapp className="w-5 h-5" />
                      Send via WhatsApp
                    </a>
                    <a
                      href={`sms:8128932525?body=${encodeURIComponent(
                        `Sarthi Cab Cab - Booking: ${bookingForm.customerName}, ${bookingDetailsData.tripType}, ${bookingDetailsData.fromCity} to ${bookingDetailsData.toCity}, ${bookingDetailsData.date}, Vehicle: ${bookingDetailsData.vehicleType}, Fare: Rs.${bookingDetailsData.fare}, Advance: Rs.${Math.round(bookingDetailsData.fare * 0.2)}. Contact: 8128932525`,
                      )}`}
                      className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
                      data-ocid="booking.secondary_button"
                    >
                      <Phone className="w-5 h-5" />
                      Send via SMS
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
                      data-ocid="booking.close_button"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CabWebsite />
    </QueryClientProvider>
  );
}
