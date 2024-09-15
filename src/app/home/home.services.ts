export interface Weather {
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    name: string
    weather: {
        0: {
            main: string
            description: string
            icon: string
        }
    }
    wind: {
        deg: number
        speed: number
    }
}