import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';

@Injectable()

export class Users {
  private static responseWrapper(responseRaw: any) {
    try {
      return responseRaw.json();
    } catch (e) {
      return { data: [] };
    }
  }
  constructor(public http: Http) { }
  public getUsers() {
    return this.http
      .get('http://mobi.connectedcar360.net/api/?op=list')
      .toPromise()
      .then(Users.responseWrapper)
      .then((response) => response.data.filter((item) => item.userid));
  }

  public getLocations(userid: number) {
    return this.http
      .get(`http://mobi.connectedcar360.net/api/?op=getlocations&userid=${userid}`, )
      .toPromise()
      .then(Users.responseWrapper)
      .then((response) => response.data);
  }

  public getVehicleAddress(lat, lon) {
    return this.http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`)
      .toPromise()
      .then(Users.responseWrapper)
      .then((response) => response.results);
  }
}
