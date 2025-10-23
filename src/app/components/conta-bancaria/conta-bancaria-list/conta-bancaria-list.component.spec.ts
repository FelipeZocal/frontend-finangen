import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaBancariaListComponent } from './conta-bancaria-list.component';

describe('ContaBancariaListComponent', () => {
  let component: ContaBancariaListComponent;
  let fixture: ComponentFixture<ContaBancariaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaBancariaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaBancariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
