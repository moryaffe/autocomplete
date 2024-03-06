import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AutoCompleteComponent,HttpClientModule, AppRoutingModule],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update city when getChosenCity is called', () => {
    const testCity = 'New York';
    expect(component.city).toBe(''); // Initial value is empty
    component.getChosenCity(testCity);
    expect(component.city).toBe(testCity); // Value after calling getChosenCity
  });
});
