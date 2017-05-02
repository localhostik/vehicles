import {
  Component,
  OnInit, TemplateRef, ViewChild
} from '@angular/core';

import { Users } from '../services';

@Component({
  selector: 'users',
  providers: [
    Users
  ],
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {
  private rows = [];
  private columns = [];
  selected = [];
  @ViewChild('photoTmpl') photoTmpl: TemplateRef<any>;
  @ViewChild('detailTmpl') detailTmpl: TemplateRef<any>;
  constructor(
    public users: Users
  ) { }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  public ngOnInit() {
    this.columns = [
      { prop: 'Photo', cellTemplate: this.photoTmpl },
      { name: 'Name' },
      { prop: 'Vehicles', name: 'Number of Vehicles' },
      { prop: 'Details', cellTemplate: this.detailTmpl }
    ];
    this.users.getUsers().then((users) => {
      users.forEach(element => {
        this.rows.push({ Photo: element.owner.foto, name: `${element.owner.name} ${element.owner.surname}`, Vehicles: element.vehicles.length, Details: '#/map-view/' + element.userid });
      });
    });
  }
}
