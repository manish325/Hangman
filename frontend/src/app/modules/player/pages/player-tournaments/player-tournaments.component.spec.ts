import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentsComponent } from './player-tournaments.component';

describe('PlayerTournamentsComponent', () => {
  let component: PlayerTournamentsComponent;
  let fixture: ComponentFixture<PlayerTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTournamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
