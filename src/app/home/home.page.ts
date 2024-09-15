import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/home/home.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private http: HttpClient) {}

  public filteredCities: string[] = [];

  apiKey: string = '08266215fdd3a60eea2ab24692eb4049';
  baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  currentCity: string = 'Manado'; // Inisialisasi Manado sebagai kota awal
  currentWeather: any = {};
  showSuggestions = false;


  bgImg: string | undefined;

  ngOnInit() {
    this.fetchWeather(); 
  }


  getWeatherData(city: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`);
  }


  getCitySuggestions(query: string): Observable<any> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${this.apiKey}`);
  }

  fetchWeather(): void {
    this.getWeatherData(this.currentCity).subscribe(res => {
      this.currentWeather = res;
      this.currentWeather.description = this.capitalizeFirstLetter(res.weather[0].description);
      

      this.currentWeather.iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
  
    });
  }
  
  

  filterCities(event: any) {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery.length > 0) {
      this.getCitySuggestions(searchQuery).subscribe((data: any) => {
        this.filteredCities = data.list.map((city: any) => city.name);
        this.showSuggestions = true;
      });
    } else {
      this.filteredCities = [];
      this.showSuggestions = false;
    }
  }

  selectCity(city: string) {
    this.currentCity = city;
    this.showSuggestions = false;
    this.fetchWeather();
  }


  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
