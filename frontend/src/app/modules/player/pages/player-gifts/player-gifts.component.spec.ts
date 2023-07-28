import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGiftsComponent } from './player-gifts.component';

describe('PlayerGiftsComponent', () => {
  let component: PlayerGiftsComponent;
  let fixture: ComponentFixture<PlayerGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerGiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
