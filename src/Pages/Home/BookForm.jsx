import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { LoadScript, GoogleMap, Marker, Polyline, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";

const GOOGLE_MAPS_API_KEY = "AIzaSyCepX7Q1pxRlBbIKrpS-3LwcPxflCiE1Zs";
const libraries = ["places"];

const COLOMBO_BOUNDS = {
  north: 6.98,
  south: 6.85,
  east: 79.92,
  west: 79.82,
};

const getDistance = (coords1, coords2) => {
  const R = 6371;
  const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
  const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const decodePolyline = (encoded) => {
  if (!encoded) return [];
  
  const poly = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    
    shift = 0;
    result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    
    const point = {
      lat: lat / 1e5,
      lng: lng / 1e5
    };
    
    poly.push(point);
  }
  
  return poly;
};

const BookingFormWithMap = () => {
  const [pickup, setPickup] = useState("University of Moratuwa");
  const [drop, setDrop] = useState("Vinrich Lake");
  const [distance, setDistance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [routePath, setRoutePath] = useState([]);
  
  // Updated initial coordinates to match the map
  const [pickupCoords, setPickupCoords] = useState([6.7945, 79.8938]); // University of Moratuwa
  const [dropoffCoords, setDropoffCoords] = useState([6.8062, 79.8951]); // Vinrich Lake
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
  
  const mapRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Provide fallback values if location.state is undefined
  const { name, type, seats, price, Id } = location.state || {
    name: "",
    type: "",
    seats: 0,
    price: 0,
    Id: "",
  };

  const onPlaceChanged = (type) => {
    const autocomplete = type === "pickup" ? pickupAutocomplete : dropoffAutocomplete;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const coords = [place.geometry.location.lat(), place.geometry.location.lng()];
        if (type === "pickup") {
          setPickup(place.formatted_address || place.name);
          setPickupCoords(coords);
        } else {
          setDrop(place.formatted_address || place.name);
          setDropoffCoords(coords);
        }
      }
    }
  };

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const distance = getDistance(pickupCoords, dropoffCoords);
      setDistance(`${distance.toFixed(2)} km`);
      setTotalPrice((distance * price).toFixed(2));

      if (isMapLoaded && window.google?.maps) {
        fetchRouteWithRoutesAPI();
      }
    }
  }, [pickupCoords, dropoffCoords, isMapLoaded, price]);

  const fetchRouteWithRoutesAPI = async () => {
    if (!window.google?.maps) return;

    try {
      const origin = { lat: pickupCoords[0], lng: pickupCoords[1] };
      const destination = { lat: dropoffCoords[0], lng: dropoffCoords[1] };

      const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
      
      const requestBody = {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng
            }
          }
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng
            }
          }
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false
        },
        languageCode: "en-US",
        units: "METRIC"
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'routes.polyline,routes.duration,routes.distanceMeters'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Routes API failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const encodedPolyline = data.routes[0].polyline.encodedPolyline;
        const pathPoints = decodePolyline(encodedPolyline);
        setRoutePath(pathPoints);
        
        // Adjust map view to show the route
        if (mapRef.current) {
          const bounds = new window.google.maps.LatLngBounds();
          pathPoints.forEach(point => {
            bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
          });
          mapRef.current.fitBounds(bounds);
        }
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      // Fallback: Create a simple straight line between points
      const startPoint = { lat: pickupCoords[0], lng: pickupCoords[1] };
      const endPoint = { lat: dropoffCoords[0], lng: dropoffCoords[1] };
      setRoutePath([startPoint, endPoint]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      pickupLocation: pickup,
      dropLocation: drop,
      date: date,
      time: time,
      customerName: customerName,
      email: email,
      phone: phone,
      distance: distance,
      total: totalPrice,
      driverID: Id,
      bookingStatus: "Pending",
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8081/api/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Booking successful:", response.data);
      toast.success("Booking successful!");
      navigate("/")
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<div className="text-center py-10 text-gray-500">Loading Google Maps...</div>}
      onLoad={() => setIsMapLoaded(true)}
    >
      <div className="flex w-full h-screen font-primary">
        {/* Left side: Map */}
        <div className="w-[30%] h-full">
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={{ lat: pickupCoords[0], lng: pickupCoords[1] }}
            zoom={12} // Adjusted zoom level to show both locations
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {pickupCoords && (
              <Marker
                position={{ lat: pickupCoords[0], lng: pickupCoords[1] }}
                label="A"
                title="University of Moratuwa"
              />
            )}
            {dropoffCoords && (
              <Marker
                position={{ lat: dropoffCoords[0], lng: dropoffCoords[1] }}
                label="B"
                title="Vinrich Lake"
              />
            )}
            {routePath.length > 0 && (
              <Polyline
                path={routePath}
                options={{
                  strokeColor: "#4285F4",
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                  geodesic: true,
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Right side: Form */}
        <div className="w-[70%] p-8 bg-gray-50">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Book Your Ride</h2>
          {/* Vehicle Details Card at the Top */}
          <div className="bg-white h-[190px] p-6 rounded-lg shadow-lg mb-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
              <FaCar className="text-blue-600" /> Vehicle Details
            </h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-800">Name:</span> {name}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-800">Type:</span> {type}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-blue-800">Seats:</span> {seats}
              </p>
              <p className="text-lg text-gray-700" hidden>
                <span className="font-semibold text-blue-800">Price per km:</span> {price}
              </p>
            </div>
          </div>

          {/* Booking Form Below */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Row 1: Pickup and Drop Locations */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" /> Pickup Location
                </label>
                <Autocomplete
                  onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
                  onPlaceChanged={() => onPlaceChanged("pickup")}
                  options={{
                    bounds: COLOMBO_BOUNDS,
                    strictBounds: false,
                    types: ["geocode"],
                    componentRestrictions: { country: "lk" },
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </Autocomplete>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" /> Drop Location
                </label>
                <Autocomplete
                  onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
                  onPlaceChanged={() => onPlaceChanged("dropoff")}
                  options={{
                    bounds: COLOMBO_BOUNDS,
                    strictBounds: false,
                    types: ["geocode"],
                    componentRestrictions: { country: "lk" },
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter drop location"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                  />
                </Autocomplete>
              </div>
            </div>

            {/* Row 2: Date and Time */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" /> Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaClock className="text-blue-600" /> Time
                </label>
                <input
                  type="time"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Customer Name and Email */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-700 mb-1 flex items-sm font-medium items-center gap-2">
                  <FaEnvelope className="text-blue-600" /> Customer Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Row 4: Phone Number */}
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaPhone className="text-blue-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Distance and Total Price */}
            {distance && (
              <p className="mt-4 text-lg font-semibold text-blue-800">
                Distance: <span className="text-gray-700">{distance}</span>
              </p>
            )}
            {totalPrice && (
              <p className="mt-4 text-lg font-semibold text-blue-800">
                Total Price: <span className="text-gray-700">Rs {totalPrice}</span>
              </p>
            )}
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-[#d5883a] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#fc9f3f] hover:scale-105 transition duration-300"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </LoadScript>
  );
};

export default BookingFormWithMap;