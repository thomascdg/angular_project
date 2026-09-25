import { TestBed } from '@angular/core/testing';
import { GoalStorage } from './goal-storage';

describe('GoalStorage', () => {
  let service: GoalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
