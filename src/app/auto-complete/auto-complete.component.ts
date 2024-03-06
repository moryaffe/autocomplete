import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs';
import { DataService } from '../data.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollingModule]
})
export class AutoCompleteComponent implements OnInit {
  @Input() width = 40;
  @Output() getCity: EventEmitter<string> = new EventEmitter<string>();
  searchControl = new FormControl();
  filteredOptions$: Observable<string[]> = of([]);
  itemSize = 40;
  isDropdownVisible = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.handleValueChange(value)),
      catchError(error => this.handleError(error))
    );
  }

  handleValueChange(value: string): Observable<string[]> {
    if (this.preventSpecialCharacters(value)) {
      let err = "Input contains special characters. Only English letters, numbers, and spaces are allowed.";
      console.error(err);
      return of([]);
    }
    return this.dataService.search(value);
  }

  preventSpecialCharacters(value: string): boolean {
    // Returns true if special characters are found
    return /[^a-zA-Z0-9 ]/.test(value);
  }

  selectItem(item: string): void {
    this.isDropdownVisible = false;
    this.searchControl.setValue(item, { emitEvent: false });
    this.getCity.emit(item);
  }

  private handleError(error: any): Observable<string[]> {
    console.error(`Error: ${error.message || error}`);
    return of([]);
  }
}
