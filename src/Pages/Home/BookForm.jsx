import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const BookingFormWithMap = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [autocompletePickup, setAutocompletePickup] = useState(null);
  const [autocompleteDrop, setAutocompleteDrop] = useState(null);

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
            setDistance(response.rows[0].elements[0].distance.text);

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
          }
        }
      );
    }
  }, [pickup, drop]); // Trigger distance calculation whenever pickup or drop changes

  return (
    <div className="flex w-full h-screen">
      {/* Left side: Map */}
      <div className="w-1/2 h-full">
        <div id="map" className="w-full h-full"></div>
      </div>

      {/* Right side: Form */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Book Your Ride</h2>
        <form className="space-y-4">
          <input
            id="pickup"
            type="text"
            placeholder="Pickup Location"
            className="w-full p-2 border"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <input
            id="drop"
            type="text"
            placeholder="Drop Location"
            className="w-full p-2 border"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
          />
          <input type="datetime-local" className="w-full p-2 border" />
          <input type="text" placeholder="Customer Name" className="w-full p-2 border" />
          <input type="email" placeholder="Customer Email" className="w-full p-2 border" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 border" />
          {distance && <p className="mt-2 text-lg">Distance: {distance}</p>}
        </form>
      </div>
    </div>
  );
};

export default BookingFormWithMap;
