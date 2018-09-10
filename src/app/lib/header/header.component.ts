import {Component, OnDestroy, OnInit} from '@angular/core';
import {HotelsService} from '../../services/hotels.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {Hotel} from '../../models/hotel';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public title = 'Hotel Manager';
  private selectedHotel: Hotel;
  private subscription: Subscription;
  public isVisibleShpCart: boolean;
  public shpCartCount = 0;

  constructor(public hotelService: HotelsService, private shoppingCartDialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.hotelService.getSelectedHotel().subscribe(hotel => {
      this.selectedHotel = hotel;
    });
    this.subscription = this.hotelService.getVisibleShpCart().subscribe(isVisible => {
      this.isVisibleShpCart = isVisible;
    });
    this.subscription = this.hotelService.getShpCartCount().subscribe(count => {
      this.shpCartCount = count;
    });
    if (this.selectedHotel != null && this.selectedHotel.id > 0) {
      this.title = this.selectedHotel.name;
      this.hotelService.setVisibleShpCart(true);
    } else {
      this.title = 'Hotel Manager';
      this.hotelService.setVisibleShpCart(false);
    }
  }

  /**
   * Click event to open the shopping cart modal
   */
  public onClickOpenCart() {
    const dialogRef = this.shoppingCartDialog.open(ShoppingCartComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        alert('Successfully added');
      }
    });
  }

  /**
   * Click event on the Home button
   */
  public onClickHomeBtn() {
    this.hotelService.resetService();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
