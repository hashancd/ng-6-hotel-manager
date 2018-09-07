import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Hotel} from '../models/hotel';
import {ShoppingCartItem} from '../models/shp-cart-item';

@Injectable()
export class HotelsService {
  private baseUrl = environment.baseUrl;
  public selectedHotels: Hotel[];
  public selectedHotel: Hotel;
  public isVisibleShpCart = false;
  public shpCartCount = 0;
  public shpCartItems: ShoppingCartItem[] = [];

  constructor(private http: HttpClient) {
  }


  public getHotels(): Observable<Hotel[]> {
    const getHotelsUrl = this.baseUrl+'/hotels.json';
    return this.http.get<Hotel[]>(getHotelsUrl);
  }

  public resetService() {
    this.shpCartItems = [];
    this.shpCartCount = 0;
    this.isVisibleShpCart = false;
    this.selectedHotel = null;
  }
}
