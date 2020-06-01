import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderSubmittedComponent } from "./order-submitted.component";

describe("OrderSubmittedComponent", () => {
  let component: OrderSubmittedComponent;
  let fixture: ComponentFixture<OrderSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSubmittedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
