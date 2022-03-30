import {Component, Input, OnInit} from '@angular/core';

import { Performer } from "../../model/Performer";
import { PerformerService} from "../../services/performer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  @Input() newPerformer!: Performer;
  @Input() updatedPerformer!: Performer;

  performers: Performer[] = [];
  addClicked: boolean = false;

  constructor(
    private performerService: PerformerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPerformers();
  }

  getPerformers() {
    this.performerService.getPerformers().subscribe(performers => this.performers = performers);
  }

  addPerformer() {
    this.addClicked = true;
  }

  discardForm() {
    this.addClicked = false;
  }


  savePerformer(newPerformer: Performer) {
    console.log(newPerformer);
    this.performerService.createPerformer(newPerformer).subscribe(() => this.performers.push(newPerformer));
  }

  updatePerformer(updatedPerformer: Performer) {
    this.performerService.updatePerformer(updatedPerformer).subscribe();
  }

  deletePerformer(performerId: number) {
    this.performerService.deletePerformer(performerId)
      .subscribe(() => this.performers = this.performers.filter(p => p.id !== performerId));
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
