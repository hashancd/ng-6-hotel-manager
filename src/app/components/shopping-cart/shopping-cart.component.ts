import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {HotelsService} from '../../services/hotels.service';
import {ShoppingCartItem} from '../../models/shp-cart-item';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public shpCartCount = 0;
  private subscription: Subscription;
  public shpCartItems: ShoppingCartItem[] = [];

  constructor(private hotelService: HotelsService, public cartDialogRef: MatDialogRef<ShoppingCartComponent>) {
  }

  ngOnInit() {
    this.subscription = this.hotelService.getShpCartCount().subscribe(count => {
      this.shpCartCount = count;
    });

    this.subscription = this.hotelService.getShpCartItems().subscribe(cartItems => {
      this.shpCartItems = cartItems;
    });
  }

  /**
   * Get cart title
   * @returns {string}
   */
  public getCartTitle(): string {
    let title: string;
    if (this.shpCartCount === 1) {
      title = this.shpCartCount + ' Item in Shopping Cart';
    } else {
      title = this.shpCartCount + ' Items in Shopping Cart';
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
    this.shpCartItems.forEach(cartItem => {
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
    const index = this.shpCartItems.indexOf(cartItem);
    let itemCount: string;
    const count = this.shpCartItems[index].count;
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
    const index = this.shpCartItems.indexOf(cartItem);
    this.shpCartItems.splice(index, 1);
    this.hotelService.setShpCartItems(this.shpCartItems);
    this.getCartItemsCount(this.shpCartItems);
    this.getTotalPriceForCart(this.shpCartItems);
    this.getCartTitle();
    if (!(this.shpCartItems.length > 0)) {
      this.hotelService.setVisibleShpCart(false);
      this.onClickCancel();
    }
  }

  /**
   * Get total count of cart items
   * @param {ShoppingCartItem[]} cartItems
   */
  private getCartItemsCount(cartItems: ShoppingCartItem[]) {
    this.shpCartCount = 0;
    cartItems.forEach(cartItem => {
      this.shpCartCount = this.shpCartCount + cartItem.count;
    });
    this.hotelService.setShpCartCount(this.shpCartCount);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
