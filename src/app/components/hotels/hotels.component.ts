import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Hotel} from '../../models/hotel';
import {HotelsService} from '../../services/hotels.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit, OnDestroy {

  public filterdHotels: Hotel[] = [];
  private hotelsObsev: Subscription = new Subscription();

  constructor(private hotelService: HotelsService, private router: Router) {
  }

  ngOnInit() {
    this.hotelsObsev = this.hotelService.getSelectedHotels().subscribe(hotels => {
      this.filterdHotels = hotels;
    });

    if (this.filterdHotels == null) {
      this.router.navigate(['']);
    }
  }

  /**
   * Click event on Detail button
   * @param {Hotel} hotel
   */
  public onClickSelectRoomBtn(hotel: Hotel) {
    this.hotelService.setSelectedHotel(hotel);
    const linkToHotelDetail = '/hotels/' + hotel.id + '/rooms';
    this.router.navigate([linkToHotelDetail]);
  }

  ngOnDestroy() {
    this.hotelsObsev.unsubscribe();
  }

}
