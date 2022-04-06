import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let element = document.querySelectorAll(".parallax");
    M.Parallax.init(element);
  }

}
