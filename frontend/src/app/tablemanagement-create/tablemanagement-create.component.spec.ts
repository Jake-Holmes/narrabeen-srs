import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablemanagementCreateComponent } from './tablemanagement-create.component';

describe('TablemanagementCreateComponent', () => {
  let component: TablemanagementCreateComponent;
  let fixture: ComponentFixture<TablemanagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablemanagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablemanagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
