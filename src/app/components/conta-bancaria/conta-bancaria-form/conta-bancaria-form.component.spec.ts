import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaBancariaFormComponent } from './conta-bancaria-form.component';

describe('ContaBancariaFormComponent', () => {
  let component: ContaBancariaFormComponent;
  let fixture: ComponentFixture<ContaBancariaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaBancariaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContaBancariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
