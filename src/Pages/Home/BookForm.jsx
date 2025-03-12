import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const BookingFormWithMap = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [autocompletePickup, setAutocompletePickup] = useState(null);
  const [autocompleteDrop, setAutocompleteDrop] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // Log location.state for debugging
  console.log("Location State:", location.state);

  // Provide fallback values if location.state is undefined
  const { name, type, seats, price, Id } = location.state || {
    name: "",
    type: "",
    seats: 0,
    price: 0,
    Id: "",
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyD3WC4ofY-qZw1skED-PgJthpJBj7IImyw",
      libraries: ["places", "directions"],
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 7.8731, lng: 80.7718 }, // Centered in Sri Lanka
        zoom: 8,
      });
      setMap(mapInstance);

      // Directions Service
      const directionsServiceInstance = new google.maps.DirectionsService();
      setDirectionsService(directionsServiceInstance);

      // Directions Renderer to show the route
      const directionsRendererInstance = new google.maps.DirectionsRenderer();
      directionsRendererInstance.setMap(mapInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Initialize Autocomplete for pickup location
      const pickupInput = document.getElementById("pickup");
      const dropInput = document.getElementById("drop");

      const autocompletePickupInstance = new google.maps.places.Autocomplete(pickupInput, {
        componentRestrictions: { country: "LK" },
        fields: ["formatted_address"],
      });

      const autocompleteDropInstance = new google.maps.places.Autocomplete(dropInput, {
        componentRestrictions: { country: "LK" },
        fields: ["formatted_address"],
      });

      setAutocompletePickup(autocompletePickupInstance);
      setAutocompleteDrop(autocompleteDropInstance);

      autocompletePickupInstance.addListener("place_changed", () => {
        const place = autocompletePickupInstance.getPlace();
        setPickup(place.formatted_address);
      });

      autocompleteDropInstance.addListener("place_changed", () => {
        const place = autocompleteDropInstance.getPlace();
        setDrop(place.formatted_address);
      });
    });
  }, []);

  useEffect(() => {
    if (pickup && drop) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickup],
          destinations: [drop],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distanceText = response.rows[0].elements[0].distance.text;
            setDistance(distanceText);

            // Extract the numerical value from the distance string
            const distanceValue = parseFloat(distanceText.match(/\d+(\.\d+)?/)[0]);

            // Calculate the total price
            const totalPriceValue = distanceValue * price;
            setTotalPrice(totalPriceValue.toFixed(2)); // Round to 2 decimal places

            // Request Directions for the route
            const request = {
              origin: pickup,
              destination: drop,
              travelMode: google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                // Set the route on the map
                directionsRenderer.setDirections(result);
              } else {
                alert("Directions request failed due to " + status);
              }
            });
          } else {
            setDistance("Distance not available");
            setTotalPrice(null);
          }
        }
      );
    }
  }, [pickup, drop]);

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
      const token =localStorage.getItem('token');
      const response = await axios.post("http://localhost:8080/api/bookings", bookingData, {
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
    <div className="flex w-full h-screen font-primary">
      {/* Left side: Map */}
      <div className="w-[30%] h-full">
        <div id="map" className="w-full h-full"></div>
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
          {/* Display driverID for debugging */}
          <span  hidden>Driver ID: {Id}</span>

          {/* Row 1: Pickup and Drop Locations */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" /> Pickup Location
              </label>
              <input
                id="pickup"
                type="text"
                placeholder="Enter pickup location"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" /> Drop Location
              </label>
              <input
                id="drop"
                type="text"
                placeholder="Enter drop location"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Date and Time */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
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
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
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
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
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
              <label className=" text-sm  text-gray-700 mb-1 flex items-sm font-medium t  items-center gap-2">
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
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
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
            {/* Empty div to maintain alignment */}
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
  );
};

export default BookingFormWithMap;