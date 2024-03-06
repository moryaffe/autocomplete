import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AutoCompleteComponent } from './auto-complete.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from '../data.service';
import { of } from 'rxjs';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        AutoCompleteComponent
      ],
      providers: [DataService]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default width and itemSize', () => {
    expect(component.width).toBe(40);
    expect(component.itemSize).toBe(40);
  });

  it('should emit the selected city when an item is clicked', fakeAsync(() => {
    component.filteredOptions$ = of(['New York', 'Los Angeles']);
    fixture.detectChanges(); 
    tick(); // Complete any asynchronous operations
    fixture.detectChanges();
  
    const options = fixture.debugElement.queryAll(By.css('.autocomplete-results li'));
    expect(options.length).toBe(2);
  
    let selectedCity: string = '';
    component.getCity.subscribe(city => selectedCity = city);
  
    options[0].nativeElement.click();
    fixture.detectChanges();
  
    expect(selectedCity).toBe('New York');
  }));

  it('should display the dropdown when the input is focused', fakeAsync(() => {
    const inputElement = fixture.debugElement.query(By.css('.autocomplete-input')).nativeElement;
    inputElement.dispatchEvent(new Event('focus'));
    tick();
    fixture.detectChanges();
  
    expect(component.isDropdownVisible).toBeTrue();
  }));

  it('should not return any options when special characters are input', fakeAsync(() => {
    const inputElement = fixture.debugElement.query(By.css('.autocomplete-input')).nativeElement;
    spyOn(console, 'error');
  
    inputElement.value = '@@@';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    expect(console.error).toHaveBeenCalled();
  }));
  
  
  
});
