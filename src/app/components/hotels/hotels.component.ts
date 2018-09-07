import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Hotel} from '../../models/hotel';
import {HotelsService} from '../../services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  public filterdHotels: Hotel[] = [];

  constructor(private hotelService: HotelsService, private router: Router) {
  }

  ngOnInit() {
    this.filterdHotels = this.hotelService.selectedHotels;
    if (this.filterdHotels == null) {
      this.router.navigate(['']);
    }
  }

  /**
   * Click event on Detail button
   * @param {Hotel} hotel
   */
  public onClickSelectRoomBtn(hotel: Hotel) {
    this.hotelService.selectedHotel = hotel;
    const linkToHotelDetail = '/hotels/' + hotel.id + '/rooms';
    this.router.navigate([linkToHotelDetail]);
  }

}
