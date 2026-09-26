import { Task } from "../task/Task";

export interface Goal {
    id: string;
    title: string;
    limit_date: Date;
    completed: boolean;
    tasks: Task[];
}
