import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scopes } from './scopes';

describe('Scopes', () => {
  let component: Scopes;
  let fixture: ComponentFixture<Scopes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Scopes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scopes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
