import { TestBed } from '@angular/core/testing';

import { PokemonClientService } from './pokemon-client.service';

describe('PokemonClientService', () => {
  let service: PokemonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
