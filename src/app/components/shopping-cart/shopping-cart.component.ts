import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {HotelsService} from '../../services/hotels.service';
import {ShoppingCartItem} from '../../models/shp-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public hotelService: HotelsService, public cartDialogRef: MatDialogRef<ShoppingCartComponent>) {
  }

  ngOnInit() {
  }

  /**
   * Get cart title
   * @returns {string}
   */
  public getCartTitle(): string {
    let title: string;
    if (this.hotelService.shpCartCount === 1) {
      title = this.hotelService.shpCartCount + ' Item in Shopping Cart';
    } else {
      title = this.hotelService.shpCartCount + ' Items in Shopping Cart';
    }
    return title;
  }

  /**
   * Get total price for cart
   * @param {ShoppingCartItem[]} cartItems
   * @returns {number}
   */
  public getTotalPriceForCart(cartItems: ShoppingCartItem[]): number {
    let total = 0;
    this.hotelService.shpCartItems.forEach(cartItem => {
      total = total + (cartItem.count * cartItem.room.price);
    });
    return total;
  }

  /**
   * Close the shopping dialog
   */
  public onClickCancel() {
    this.cartDialogRef.close();
  }

  /**
   * Get cart item count
   * @param {ShoppingCartItem} cartItem
   * @returns {string}
   */
  public getCartItemCount(cartItem: ShoppingCartItem): string {
    const index = this.hotelService.shpCartItems.indexOf(cartItem);
    let itemCount: string;
    const count = this.hotelService.shpCartItems[index].count;
    if (count === 1) {
      itemCount = `${count} Room`;
    } else {
      itemCount = `${count} Rooms`;
    }
    return itemCount;
  }

  /**
   * Click event on Cart Item Delete Button
   * @param {ShoppingCartItem} cartItem
   */
  public onClickDeleteCartItem(cartItem: ShoppingCartItem) {
    const index = this.hotelService.shpCartItems.indexOf(cartItem);
    this.hotelService.shpCartItems.splice(index, 1);
    this.getCartItemsCount(this.hotelService.shpCartItems);
    this.getTotalPriceForCart(this.hotelService.shpCartItems);
    this.getCartTitle();
    if (!(this.hotelService.shpCartItems.length > 0)) {
      this.hotelService.isVisibleShpCart = false;
      this.onClickCancel();
    }
  }

  /**
   * Get total count of cart items
   * @param {ShoppingCartItem[]} cartItems
   */
  private getCartItemsCount(cartItems: ShoppingCartItem[]) {
    this.hotelService.shpCartCount = 0;
    cartItems.forEach(cartItem => {
      this.hotelService.shpCartCount = this.hotelService.shpCartCount + cartItem.count;
    });
  }

}
