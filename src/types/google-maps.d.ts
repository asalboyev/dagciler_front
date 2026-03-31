declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
    }

    class Marker {
      constructor(options: MarkerOptions);
    }

    interface MapOptions {
      center: LatLngLiteral;
      zoom: number;
      styles?: any[];
    }

    interface MarkerOptions {
      position: LatLngLiteral;
      map: Map;
      title?: string;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
  }
}
