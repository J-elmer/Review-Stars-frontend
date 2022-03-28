import { Component, OnInit } from '@angular/core';

import { Performer } from "../../model/Performer";
import { PerformerService} from "../../services/performer.service";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  performers: Performer[] = [];

  constructor(
    private performerService: PerformerService
  ) { }

  ngOnInit(): void {
    this.getPerformers();
  }

  getPerformers() {
    this.performerService.getPerformers().subscribe(performers => this.performers = performers);
  }

}
