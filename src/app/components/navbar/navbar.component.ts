import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var options = {};
      var instances = M.Sidenav.init(elems, options);
    });
  }

}
