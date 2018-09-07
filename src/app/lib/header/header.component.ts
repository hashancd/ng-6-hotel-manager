import {Component, OnInit} from '@angular/core';
import {HotelsService} from '../../services/hotels.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title = 'Hotel Manager';

  constructor(public hotelService: HotelsService, private shoppingCartDialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    if (this.hotelService.selectedHotel != null && this.hotelService.selectedHotel.id > 0) {
      this.title = this.hotelService.selectedHotel.name;
    } else {
      this.title = 'Hotel Manager';
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

}
