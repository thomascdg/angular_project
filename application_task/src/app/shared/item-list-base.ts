export interface ListItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface ListStorage<T extends ListItem> {
  load(): T[];
  save(items: T[]): void;
  delete(id: string): void;
}

export abstract class ItemListBase<T extends ListItem> {
  items: T[] = [];
  newTitle = '';

  protected constructor(protected readonly storage: ListStorage<T>) {}

  protected abstract createItem(title: string): T;

  protected addItem(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.items.push(this.createItem(title));
    this.newTitle = '';
    this.storage.save(this.items);
  }

  protected toggleItem(item: T): void {
    const itemToUpdate = this.items.find(current => current.id === item.id);
    if (itemToUpdate) {
      itemToUpdate.completed = !itemToUpdate.completed;
      this.storage.save(this.items);
    }
  }

  protected deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.storage.delete(id);
  }

  protected loadItems(): void {
    this.items = this.storage.load();
  }
}