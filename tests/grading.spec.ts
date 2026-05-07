import { expect, Page, test } from '@playwright/test';

type Student = { name: string, grade: number };

const courseCode = 'SOF009AS3A-3012';

const students: Student[] = [
    { name: "John Doe", grade: 5 }
];

test(`Set grades for all students in ${courseCode}`, async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('https://teacher.home.haaga-helia.fi/');
    await page.getByRole('link', { name: courseCode }).click();

    await page.getByRole('link', { name: 'Arvioinnit' }).click();
    await expect(page).toHaveTitle(/arviointi/i);

    await expect(page.locator("tr[data-student-name]").first()).toBeVisible();

    for (let student of students) {
        await test.step(`Setting grade for ${student.name}`, async () => {
            await setStudentGrade(student, page);
        });
    }
});


async function setStudentGrade(student: Student, page: Page) {
    const { name, grade } = student;

    const studentRow = page.locator(`tr[data-student-name='${name}']`);
    const selectElement = studentRow.locator(".grade-select");
    const statusCompleted = studentRow.locator(".status-completed");

    if (await studentRow.count() === 1) {
        const currentGrade = await selectElement.inputValue();

        if (currentGrade === "NULL") {
            console.log(`Setting ${grade} for ${name}`);

            await expect(statusCompleted).not.toBeVisible();

            await selectElement.selectOption(grade.toString());

            await expect(statusCompleted).toBeVisible();

            console.log(`${name} successfully graded ${grade}`);

        } else {
            console.warn(`${name} already has a grade (${currentGrade}).`);
        }
    } else {
        console.warn(`${name} was not found on the page`);
    }
}

