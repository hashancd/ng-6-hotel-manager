import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material';
import {Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {HotelsService} from '../../../services/hotels.service';
import {Room} from '../../../models/room';
import {ShoppingCartItem} from '../../../models/shp-cart-item';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public selectedHotel: Hotel;
  public roomCounts: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public countSelected: boolean[] = [];
  public roomPrice: number[] = [];
  public selectedRooms: number[] = [];

  constructor(private hotelService: HotelsService, private router: Router) {
  }

  ngOnInit() {
    this.selectedHotel = this.hotelService.selectedHotel;
    if (this.selectedHotel == null) {
      this.router.navigate(['']);
    }
  }

  /**
   * Set the count of the room when change the dropdown
   * @param {MatSelectChange} event
   * @param {Room} room
   */
  public roomCountSelected(event: MatSelectChange, room: Room) {
    let selectedValue: number = event.value;
    console.log(room + ' ' + event.value);
    if (selectedValue > 0) {
      this.countSelected[room.id] = true;
    } else {
      selectedValue = 0;
      this.countSelected[room.id] = false;
    }
    this.roomPrice[room.id] = this.calculateRoomPrice(selectedValue, room);
    this.selectedRooms[room.id] = selectedValue;
  }

  /**
   * Calculate the room price
   * @param {number} roomCount
   * @param {Room} room
   * @returns {number}
   */
  private calculateRoomPrice(roomCount: number, room: Room): number {
    return roomCount * room.price;
  }

  /**
   * Click event on Add Cart button
   * @param {Room} room
   */
  public onClickAddCart(room: Room) {
    const cartItem = new ShoppingCartItem();
    cartItem.room = room;
    cartItem.id = this.hotelService.shpCartItems.length + 1;
    cartItem.count = this.selectedRooms[room.id];
    this.hotelService.shpCartItems[(cartItem.id - 1)] = cartItem;

    if (this.hotelService.shpCartItems.length > 0) {
      this.hotelService.isVisibleShpCart = true;
      this.getCartItemsCount(this.hotelService.shpCartItems);
    }
  }

  /**
   * Get the cart items count
   * @param {ShoppingCartItem[]} cartItems
   */
  private getCartItemsCount(cartItems: ShoppingCartItem[]) {
    this.hotelService.shpCartCount = 0;
    cartItems.forEach(cartItem => {
      this.hotelService.shpCartCount = this.hotelService.shpCartCount + cartItem.count;
    });
  }

}
