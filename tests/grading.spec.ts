import { expect, Locator, test } from '@playwright/test';

type Student = { name: string, grade: number };

const courseCode = 'SOF004AS2A-3000';
const gradingPage = `https://teacher.home.haaga-helia.fi/group/opettajan-tyopoyta/toteutuksen-arviointi?p_p_id=AssessmentManagementPortlet_WAR_assessmentmanagementportlet&p_p_lifecycle=0&_AssessmentManagementPortlet_WAR_assessmentmanagementportlet_struts.portlet.action=%2Fassessment%2Fassessment&realizationCode=${courseCode}`;

const students: Student[] = [
    { name: "John Doe", grade: 0 }
];


test(`Set grades for all students in ${courseCode}`, async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto(gradingPage);

    await expect(page).toHaveTitle(/arviointi/i);

    await expect(page.locator("tr[data-student-name]").first()).toBeVisible();

    for (let student of students) {
        await test.step(`Setting grade for ${student.name}`, async () => {
            const studentRow = page.locator(`tr[data-student-name='${student.name}']`);
            await setStudentGrade(student, studentRow);
        });
    }
});


async function setStudentGrade({ name, grade }: Student, studentRow: Locator) {
    const gradeSelect = studentRow.locator(".grade-select");
    const statusEnrolled = studentRow.locator(".status-enrolled");

    if (await studentRow.count() === 1) {
        const currentGrade = await gradeSelect.inputValue();

        if (currentGrade === "NULL") {
            console.log(`Setting ${grade} for ${name}`);

            await expect(statusEnrolled).toBeVisible();

            await gradeSelect.selectOption(grade.toString());

            await expect(statusEnrolled).not.toBeVisible();

            console.log(`${name} successfully graded ${grade}`);

        } else {
            console.warn(`${name} already has a grade (${currentGrade}).`);
        }
    } else {
        console.warn(`${name} was not found on the page`);
    }
}
