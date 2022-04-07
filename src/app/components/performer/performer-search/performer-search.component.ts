import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Performer} from "../../../model/Performer";
import {PerformerService} from "../../../services/performer.service";
// @ts-ignore
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-performer-search',
  templateUrl: './performer-search.component.html',
  styleUrls: ['./performer-search.component.css']
})
export class PerformerSearchComponent implements OnInit {
  performers$!: Observable<Performer[]>;
  searchResult: Performer[] = [];
  searchFinished: boolean = false;

  private searchTerms = new Subject<string>();

  constructor(
    private performerService: PerformerService,
  ) { }

  ngOnInit(): void {
    this.performers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.performerService.getPerformerByName(term))
    )
    this.performers$.subscribe(performers => {
      this.searchResult = performers;
      this.searchFinished = true;
    });
    let element = document.querySelectorAll(".modal");
    M.Modal.init(element, {
      onCloseEnd: () => {this.searchResult = [] }
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
