import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEmailComponent } from './approve-email.component';

describe('ApproveEmailComponent', () => {
  let component: ApproveEmailComponent;
  let fixture: ComponentFixture<ApproveEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
