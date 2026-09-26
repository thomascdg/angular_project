import { Injectable } from '@angular/core';
import { Goal } from '../../interface/Goal/goal';

@Injectable({
    providedIn: 'root',
})
export class GoalStorage {
    private readonly key = 'goals';

    load(): Goal[] {
        const raw = localStorage.getItem(this.key);
        return raw
            ? JSON.parse(raw).map((g: Goal) => ({ ...g, limit_date: new Date(g.limit_date) }))
            : [];
    }

    save(goals: Goal[]): void {
        const cleanGoals = goals.map(goal => {
            const cleanGoal = { ...goal } as Goal & { tasks?: unknown };
            delete cleanGoal.tasks;
            return cleanGoal;
        });
        localStorage.setItem(this.key, JSON.stringify(cleanGoals));
    }

    delete(id: string): void {
        const goals = this.load();
        const updatedGoals = goals.filter(g => g.id !== id);
        this.save(updatedGoals);
    }
}
