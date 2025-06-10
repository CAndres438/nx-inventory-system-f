import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInventoryComponent } from './create-edit-inventory';

describe('CreateEditInventory', () => {
  let component: CreateEditInventoryComponent;
  let fixture: ComponentFixture<CreateEditInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
