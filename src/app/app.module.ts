import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDatepickerToggle,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';

import {HeaderComponent} from './lib/header/header.component';
import {SearchComponent} from './components/search/search.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {HotelsComponent} from './components/hotels/hotels.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HotelsService} from './services/hotels.service';
import {HttpClientModule} from '@angular/common/http';
import {TitleCasePipe} from '@angular/common';
import {HotelDetailComponent} from './components/hotels/hotel-detail/hotel-detail.component';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ShoppingCartComponent,
    HotelsComponent,
    HotelDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatChipsModule,
    MatSelectModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule
  ],
  providers: [HotelsService, TitleCasePipe],
  bootstrap: [AppComponent],
  entryComponents: [ShoppingCartComponent]
})
export class AppModule {
}
