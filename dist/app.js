"use strict";
// Начальное состояние
const initialState = { display: "" };
// Чистые функции для обновления состояния
const appendToDisplay = (state, value) => {
    if (value === "√") {
        // Добавляем "Math.sqrt(" вместо "Math.sqrt()"
        return { display: state.display + "Math.sqrt(" };
    }
    return { display: state.display + value };
};
const clearDisplay = () => initialState;
// Проверка баланса скобок
const isBalanced = (expr) => {
    const stack = [];
    for (const char of expr) {
        if (char === "(")
            stack.push("(");
        if (char === ")") {
            if (stack.length === 0)
                return false;
            stack.pop();
        }
    }
    return stack.length === 0;
};
// Функция вычисления результата
const computeResult = (state) => {
    try {
        if (!isBalanced(state.display)) {
            throw new Error("Незакрытые скобки");
        }
        const result = eval(state.display);
        return { display: Number.isNaN(result) ? "Ошибка" : result.toString() };
    }
    catch (error) {
        return { display: "Ошибка" };
    }
};
// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    let state = initialState;
    const display = document.getElementById("display");
    // Обновление интерфейса
    const render = (state) => {
        display.value = state.display;
    };
    // Обработчики событий
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.getAttribute("data-action");
            if (!action)
                return;
            state = action === "clear"
                ? clearDisplay()
                : action === "="
                    ? computeResult(state)
                    : appendToDisplay(state, action);
            render(state);
        });
    });
});
