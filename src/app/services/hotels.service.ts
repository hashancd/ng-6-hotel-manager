import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Hotel} from '../models/hotel';
import {ShoppingCartItem} from '../models/shp-cart-item';

@Injectable()
export class HotelsService {
  private baseUrl = environment.baseUrl;
  private selectedHotels = new Subject<Hotel[]>();
  private selectedHotel = new Subject<Hotel>();
  private isVisibleShpCart = new Subject<boolean>();
  private shpCartCount = new Subject<number>();
  private shpCartItems = new Subject<ShoppingCartItem[]>();

  constructor(private http: HttpClient) {
  }


  public getHotels(): Observable<Hotel[]> {
    const getHotelsUrl = this.baseUrl + '/hotels.json';
    return this.http.get<Hotel[]>(getHotelsUrl);
  }

  public resetService() {
    this.setShpCartItems([])
    this.setShpCartCount(0);
    this.setSelectedHotel(null);
  }

  public setSelectedHotels(selectedHotels: Hotel[]) {
    this.selectedHotels.next(selectedHotels);
  }

  public getSelectedHotels(): Observable<Hotel[]> {
    return this.selectedHotels.asObservable();
  }

  public setSelectedHotel(selectedHotel: Hotel) {
    this.selectedHotel.next(selectedHotel);
  }

  public getSelectedHotel(): Observable<Hotel> {
    return this.selectedHotel.asObservable();
  }

  public setVisibleShpCart(isVisibleShpCart: boolean) {
    this.isVisibleShpCart.next(isVisibleShpCart);
  }

  public getVisibleShpCart(): Observable<boolean> {
    return this.isVisibleShpCart.asObservable();
  }

  public setShpCartCount(shpCartCount: number) {
    this.shpCartCount.next(shpCartCount);
  }

  public getShpCartCount(): Observable<number> {
    return this.shpCartCount.asObservable();
  }

  public setShpCartItems(shpCartItems: ShoppingCartItem[]) {
    this.shpCartItems.next(shpCartItems);
  }

  public getShpCartItems(): Observable<ShoppingCartItem[]> {
    return this.shpCartItems.asObservable();
  }
}
