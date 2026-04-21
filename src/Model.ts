export interface Weather {
  name: string;
  dt:number
  timezone:number

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };

  wind?: {
    speed: number;
  };
}

export interface ForecastItem {
    dt: number
  dt_txt: string
  main: {
    temp: number
  }
  weather: {
    description: string
    icon: string
  }[]
}

export interface ForecastResponse {
  list: ForecastItem[]
}