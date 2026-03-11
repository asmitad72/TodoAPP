import { test, expect } from '@playwright/test';
import {TodoListPage} from "./pages/TodoListPage";
let todoListPage: TodoListPage;

test.beforeEach(async ({page}  ) => {
    await page.goto('');
    todoListPage = new TodoListPage(page);
})

test('Create one TODO item', async ({ page }) => {
    const taskName = 'Buy milk';
    await todoListPage.addItem(taskName);
    const buyMilkTask = todoListPage.taskItem.filter({hasText: taskName});
    await expect(buyMilkTask).toBeVisible();
});


test('Create 2 items and remove one of them', async ({ page }) => {
    const task1 = 'Buy bread';
    await todoListPage.addItem(task1);
    const task2 = 'Buy milk';
    await todoListPage.addItem(task2);
    await todoListPage.removeTask(task1);
    await expect(todoListPage.taskItem).toHaveCount(1);
})

test('Create 2 items and complete one of them', async ({ page }) => {
    const task1 = 'Buy bread';
    await todoListPage.addItem(task1);
    const task2 = 'Buy milk';
    await todoListPage.addItem(task2);
    await todoListPage.completeTask(1);
    await todoListPage.activeItemsFilter.click()
    await expect(todoListPage.taskItem).toHaveCount(1);
    await todoListPage.completedItemsFilter.click()
    await expect(todoListPage.taskItem).toHaveCount(1);
})

test('Complete task and clear completed', async ({ page }) => {
    const task1 = 'Buy bread';
    await todoListPage.addItem(task1);
    const task2 = 'Buy milk';
    await todoListPage.addItem(task2);
    const task3 = 'Buy water';
    await todoListPage.addItem(task3);
    await todoListPage.completeTask(2);
    await todoListPage.completeTask(1);
    await expect(todoListPage.taskItem).toHaveCount(3);
    await todoListPage.clearCompleted.click()
    await expect(todoListPage.taskItem).toHaveCount(1);
})
/*advance task-Implement a test that changes the name of an item
 using the dblclick() method.*/

test('Change the name of an item using the dblclick() ', async ({ page }) => {
    const oldTaskName = 'Task1';
    const newTaskName = 'Task2';
    await todoListPage.renameTask(oldTaskName, newTaskName);
    const taskName = todoListPage.taskItem.filter({hasText: newTaskName});
    await expect(taskName).toBeVisible();
})





