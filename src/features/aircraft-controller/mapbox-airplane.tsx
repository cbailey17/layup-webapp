import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxDefaultLocation, MapboxStyleKey, mapboxStyles } from "@/constants/mapbox-constants";

interface MapboxWithDashboardProps {
  yaw: number;
  airspeed: number;
  mapStyle: MapboxStyleKey;
}

const MapboxAirplane: React.FC<MapboxWithDashboardProps> = ({ yaw, airspeed, mapStyle }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const airplaneMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const trajectoryRef = useRef<GeoJSON.FeatureCollection<GeoJSON.LineString>>({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapboxStyles[mapStyle],
      center: mapboxDefaultLocation,
      zoom: 9,
    });

    airplaneMarkerRef.current = new mapboxgl.Marker({ color: "red" })
      .setLngLat(mapboxDefaultLocation)
      .addTo(mapRef.current);

    mapRef.current.on("load", () => {
      const jetImageUrl = "/f22_rotated_180.png";

      mapRef.current?.loadImage(jetImageUrl, (error, image) => {
        if (error) throw error;

        mapRef.current?.addImage("jet-icon", image!);

        if (mapRef.current) {
          airplaneMarkerRef.current = new mapboxgl.Marker({
            element: document.createElement("div"),
          })
            .setLngLat(mapboxDefaultLocation)
            .addTo(mapRef.current);

          const markerElement = airplaneMarkerRef.current.getElement();
          markerElement.style.width = "40px";
          markerElement.style.height = "40px";
          markerElement.style.position = "relative";

          const imgElement = document.createElement("img");
          imgElement.src = jetImageUrl;
          imgElement.style.width = "100%";
          imgElement.style.height = "100%";
          imgElement.style.transformOrigin = "center";
          markerElement.appendChild(imgElement);
        }
      });

      mapRef.current?.addSource("trajectory", {
        type: "geojson",
        data: trajectoryRef.current,
      });

      mapRef.current?.addLayer({
        id: "trajectory-line",
        type: "line",
        source: "trajectory",
        paint: {
          "line-color": "#FF0000",
          "line-width": 4,
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!mapRef.current || !airplaneMarkerRef.current || airspeed === 0) return;

      const currentPosition = airplaneMarkerRef.current.getLngLat();

      const speedPerSecond = airspeed / 3600;

      const latDistancePerSecond = speedPerSecond / 60;
      const lonDistancePerSecond = latDistancePerSecond / Math.cos(currentPosition.lat * Math.PI / 180);

      const radians = (yaw * Math.PI) / 180;
      const newLng = currentPosition.lng + lonDistancePerSecond * Math.cos(radians);
      const newLat = currentPosition.lat + latDistancePerSecond * Math.sin(radians);

      airplaneMarkerRef.current.setLngLat([newLng, newLat]);

      const markerElement = airplaneMarkerRef.current.getElement();
      const imgElement = markerElement.querySelector("img");
      if (imgElement) {
        imgElement.style.transform = `rotate(${-yaw}deg)`;
      }

      if (airspeed == 0) {
        airplaneMarkerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([newLng, newLat])
          .addTo(mapRef.current);
      }

      mapRef.current?.flyTo({
        center: [newLng, newLat],
        essential: true,
      });

      const trajectorySource = trajectoryRef.current;

      if (trajectorySource.features.length > 0) {
        const lastFeature = trajectorySource.features[0];
        if (lastFeature.geometry.type === "LineString") {
          lastFeature.geometry.coordinates.push([newLng, newLat]);
        }
      } else {
        trajectorySource.features.push({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [currentPosition.lng, currentPosition.lat],
              [newLng, newLat],
            ],
          },
          properties: {},
        });
      }

      if (mapRef.current.getSource("trajectory")) {
        (
          mapRef.current.getSource("trajectory") as mapboxgl.GeoJSONSource
        )?.setData(trajectorySource);
      }

    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [yaw, airspeed]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(mapboxStyles[mapStyle])
    }
  }, [mapStyle])

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default MapboxAirplane;
