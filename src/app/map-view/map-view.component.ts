import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';

import { Users } from '../services';

@Component({
  selector: 'map-view',
  providers: [Users],
  styles: [`
  .map-wrapper {
  position: relative;
  height: calc(100vh - 4em - 64px);
}
  .sebm-google-map-container {
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
} 
  `],
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
  zoom: number = 10;
  lat: number;
  lng: number; 
  private markers: any;
  public map: any;
  private rows = [];
  selected = [];
  private columns = [];
  public items = [];

  onSelect({ selected }) {
    this.lat = selected[0].Latitude;
    this.lng = selected[0].Longitude;
    this.markers.forEach(element => {
      element.isOpen = element.label == selected[0].Id;     
    }); 
    console.log('Select Event', selected, this.selected);
  }
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  constructor(
    public users: Users,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.columns = [
      { prop: 'Id', name: 'Vehicle Id'},
      { prop: 'Latitude'},
      { prop: 'Longitude'},
      { prop: 'Address'}
    ];

    this.route.params.subscribe((params) => {         
      this.users.getLocations(params.id).then((data) => {
        this.items = data;
        if (this.items.length) { 
            this.initMarkers(data);
        }
      });
    });
  }

  public initMarkers(items) {
    this.markers = [];
    this.lat = items[0].lat;
    this.lng = items[0].lon;

    items.forEach(element => {
      var address;
      this.users.getVehicleAddress(element.lat, element.lon)
        .then((data) => {
          address = data != null ? data[0].formatted_address : '';
          this.markers.push({
            lat: element.lat,
            lng: element.lon,
            label: element.vehicleid.toString(),
            draggable: false,
            address: address
          });

          this.rows.push({ Id: element.vehicleid.toString(), Latitude: element.lat, Longitude: element.lon, Address: address });
        });
    })
  };
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  address?: string;
  isOpen: boolean;
}
