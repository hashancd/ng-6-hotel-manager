import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TitleCasePipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {isEmpty, map, startWith} from 'rxjs/internal/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {Router} from '@angular/router';
import {Hotel} from '../../models/hotel';
import {HotelsService} from '../../services/hotels.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public startDate = new Date();
  public hotelList: Hotel[] = [];
  public locationList: string[] = [];
  public filteredLocations: Observable<string[]>;
  public myControl = new FormControl();
  public selectedLocation = '';

  constructor(private hotelService: HotelsService, private titlecasePipe: TitleCasePipe, private router: Router) {
  }

  ngOnInit() {
    this.hotelService.getHotels().subscribe(data => {
      if (data && JSON.stringify(data) !== JSON.stringify([])) {
        this.hotelList = data;
        this.locationList = this.getLocationList();
      }
    });
    this.filteredLocations = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterLocation(value))
      );
  }

  /**
   * Event on Autocomplete Select Changed
   * @param {MatAutocompleteSelectedEvent} event
   */
  public onLocationChanged(event: MatAutocompleteSelectedEvent) {
    if (event) {
      this.selectedLocation = event.option.value.toString();
    }
  }

  /**
   * Click event on Search button
   */
  public onClickSearchBtn() {
    const linkToHotelsComponent = '/hotels/' + this.selectedLocation;
    if (!this.selectedLocation) {
      this.hotelService.setSelectedHotels(this.hotelList);
    } else {
      this.hotelService.setSelectedHotels(this.filterHotels(this.selectedLocation));
    }
    this.router.navigate([linkToHotelsComponent]);
  }

  /**
   * Get locations as an array
   * @returns {string[]}
   */
  private getLocationList(): string[] {
    let locations: Array<string>;
    locations = [];
    this.hotelList.forEach(hotel => {
      console.log(hotel.location);
      locations.push(this.transformToTitleCase(hotel.location));
    });
    locations = Array.from(new Set(locations));
    return locations;
  }

  /**
   * Transform to capitalized text
   * @param {string} value
   * @returns {string}
   */
  private transformToTitleCase(value: string): string {
    return this.titlecasePipe.transform(value);
  }

  /**
   * Filter locations by value
   * @param {string} value
   * @returns {string[]}
   */
  private filterLocation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locationList.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * Filter Hotels by location
   * @param {string} location
   * @returns {Hotel[]}
   */
  private filterHotels(location: string): Hotel[] {
    const filteredLocation = location.toLowerCase();
    return this.hotelList.filter(value => value.location.toLowerCase().includes(filteredLocation));
  }
}
