import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './components/search/search.component';
import {HotelsComponent} from './components/hotels/hotels.component';
import {HotelDetailComponent} from './components/hotels/hotel-detail/hotel-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: SearchComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'hotels/:location', component: HotelsComponent},
  {path: 'hotels/:id/rooms', component: HotelDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
