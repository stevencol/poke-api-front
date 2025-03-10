import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoPokemonComponent } from './card-info-pokemon.component';

describe('CardInfoPokemonComponent', () => {
  let component: CardInfoPokemonComponent;
  let fixture: ComponentFixture<CardInfoPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
