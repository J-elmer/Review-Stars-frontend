import {Component, Input, OnInit} from '@angular/core';

import { Performer } from "../../model/Performer";
import { PerformerService} from "../../services/performer.service";

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  @Input() newPerformer!: Performer;
  @Input() updatedPerformer!: Performer;

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

  savePerformer(newPerformer: Performer) {
    this.performerService.createPerformer(newPerformer).subscribe(() => this.performers.push(newPerformer));
  }

  updatePerformer(updatedPerformer: Performer) {
    this.performerService.updatePerformer(updatedPerformer).subscribe();
  }

  deletePerformer(performerId: number) {
    this.performerService.deletePerformer(performerId)
      .subscribe(() => this.performers = this.performers.filter(p => p.id !== performerId));
  }

}
