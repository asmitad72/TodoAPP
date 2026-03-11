import {Locator, Page} from "@playwright/test";
export class TodoListPage {
    readonly page: Page;
    readonly taskInputField: Locator;
    readonly clearCompleted: Locator;
    readonly taskItem: Locator;
    readonly activeItemsFilter: Locator;
    readonly completedItemsFilter: Locator;
    readonly removeButton: Locator;
    readonly completeTaskButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.taskInputField = page.getByTestId('text-input');
        this.clearCompleted = page.locator('.clear-completed');
        this.taskItem = page.getByTestId('todo-item-label');
        this.activeItemsFilter = page.locator('[href="#/active"]');
        this.completedItemsFilter = page.locator('[href="#/completed"]');
        this.removeButton = page.getByRole('button', { name: '×' })
        this.completeTaskButton= page.getByTestId('todo-item-toggle')
    }

    async addItem(itemName: string): Promise<void> {
        await this.taskInputField.fill(itemName);
        await this.taskInputField.press('Enter');
    }
    async removeTask(taskName:string) {
        const taskItem = this.taskItem.filter({hasText: taskName});
        await taskItem.hover();
        await this.removeButton.click();
    }
    async completeTask(taskIndex:number) {
        await this.completeTaskButton.nth(taskIndex).click();
    }

    async renameTask(oldTaskName: string, newTaskName: string) {
        await this.addItem(oldTaskName);
        const taskItem = this.taskItem.filter({ hasText: oldTaskName });
        await taskItem.dblclick();
        const editInput = this.page.locator('[data-testid="text-input"]').last();
        await editInput.fill(newTaskName);
        await editInput.press('Enter');
    }
}
