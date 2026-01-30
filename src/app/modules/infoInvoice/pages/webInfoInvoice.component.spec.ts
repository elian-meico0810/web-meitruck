import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebInfoInvoiceComponent } from './webInfoInvoice.component';

describe('WebInfoInvoiceComponent', () => {
  let component: WebInfoInvoiceComponent;
  let fixture: ComponentFixture<WebInfoInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebInfoInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebInfoInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have delivered as default active tab', () => {
    expect(component.activeTab).toBe('delivered');
  });

  it('should change active tab when setActiveTab is called', () => {
    component.setActiveTab('rejected');
    expect(component.activeTab).toBe('rejected');
  });
});