import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AutoCompleteComponent } from './auto-complete.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceMock = jasmine.createSpyObj('DataService', ['search']);
    await TestBed.configureTestingModule({
      imports: [AutoCompleteComponent],
      declarations: [AutoCompleteComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataService.search on valid input', fakeAsync(() => {
    const testValue = 'Test';
    dataServiceMock.search.and.returnValue(of(['Test1', 'Test2']));
  
    component.searchControl.setValue(testValue);
    tick(300); // Simulate debounce time
  
    expect(dataServiceMock.search).toHaveBeenCalledWith(testValue);
  }));

  it('should not call dataService.search on input with special characters', fakeAsync(() => {
    const testValue = 'Test@';
    component.searchControl.setValue(testValue);
    tick(300); // Simulate debounce time
  
    expect(dataServiceMock.search).not.toHaveBeenCalled();
  }));

  it('should set searchControl value and hide dropdown on selectItem', () => {
    const testItem = 'TestItem';
    component.selectItem(testItem);
  
    expect(component.searchControl.value).toBe(testItem);
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should show/hide dropdown on input focus/item selection', () => {
    const inputEl = fixture.debugElement.query(By.css('.autocomplete-input')).nativeElement;
    inputEl.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
  
    let viewportEl = fixture.debugElement.query(By.css('.autocomplete-viewport'));
    expect(viewportEl).toBeTruthy(); // Dropdown should be visible
  
    // Simulate item selection
    component.selectItem('Test Item');
    fixture.detectChanges();
  
    viewportEl = fixture.debugElement.query(By.css('.autocomplete-viewport'));
    expect(viewportEl).toBeFalsy(); // Dropdown should be hidden
  });

  it('should adjust virtual scroll viewport height based on the number of options', () => {
    component.filteredOptions$ = of(['Option 1', 'Option 2', 'Option 3']);
    fixture.detectChanges();
  
    const viewportEl = fixture.debugElement.query(By.css('.autocomplete-viewport')).nativeElement;
    const expectedHeight = component.itemSize * 3; // Assuming 3 options
    expect(viewportEl.style.height).toBe(`${expectedHeight}px`);
  });
  
  
});
