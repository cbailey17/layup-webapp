export type MapboxStyleKey = "satellite" | "dark" | "streets";

export const mapboxStyles: Record<MapboxStyleKey, string> = {
  satellite: "mapbox://styles/mapbox/satellite-v9",
  dark: "mapbox://styles/mapbox/dark-v11",
  streets: "mapbox://styles/mapbox/outdoors-v12",
};

export const mapboxDefaultLocation: [number, number] = [-117.9992, 33.6603];
