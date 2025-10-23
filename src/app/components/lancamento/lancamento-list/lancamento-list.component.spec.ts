import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoListComponent } from './lancamento-list.component';

describe('LancamentoListComponent', () => {
  let component: LancamentoListComponent;
  let fixture: ComponentFixture<LancamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LancamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
