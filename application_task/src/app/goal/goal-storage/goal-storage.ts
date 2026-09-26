import { Service } from '@angular/core';
import { Goal } from '../../interface/Goal/goal';

@Service()
export class GoalStorage {
    private readonly key = 'goals';

    load(): Goal[] {
        const raw = localStorage.getItem(this.key);
        return raw
            ? JSON.parse(raw).map((g: Goal) => ({ ...g, limit_date: new Date(g.limit_date) }))
            : [];
    }

    save(goals: Goal[]): void {
        localStorage.setItem(this.key, JSON.stringify(goals));
    }

    delete(id: string): void {
        const goals = this.load();
        const updatedGoals = goals.filter(g => g.id !== id);
        this.save(updatedGoals);
    }
}
