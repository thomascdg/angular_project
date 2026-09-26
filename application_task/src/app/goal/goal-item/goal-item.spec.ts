import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalItem } from './goal-item';
import { Goal } from '../../interface/Goal/goal';

describe('GoalItem', () => {
  let component: GoalItem;
  let fixture: ComponentFixture<GoalItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalItem],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalItem);
    component = fixture.componentInstance;
    component.goal = {
      id: 'goal-1',
      title: 'Objectif de test',
      limit_date: new Date(),
      completed: false,
    } satisfies Goal;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
