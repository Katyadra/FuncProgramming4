type CalculatorState = { display: string };

// Начальное состояние
const initialState: CalculatorState = { display: "" };

// Чистые функции для обновления состояния
const appendToDisplay = (state: CalculatorState, value: string): CalculatorState => {
    if (value === "√") {
        // Добавляем "Math.sqrt(" вместо "Math.sqrt()"
        return { display: state.display + "Math.sqrt(" };
    }
    return { display: state.display + value };
};

const clearDisplay = (): CalculatorState => initialState;

// Проверка баланса скобок
const isBalanced = (expr: string): boolean => {
    const stack: string[] = [];
    for (const char of expr) {
        if (char === "(") stack.push("(");
        if (char === ")") {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
};

// Функция вычисления результата
const computeResult = (state: CalculatorState): CalculatorState => {
    try {
        if (!isBalanced(state.display)) {
            throw new Error("Незакрытые скобки");
        }
        const result = eval(state.display);
        return { display: Number.isNaN(result) ? "Ошибка" : result.toString() };
    } catch (error) {
        return { display: "Ошибка" };
    }
};

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    let state: CalculatorState = initialState;
    const display = document.getElementById("display") as HTMLInputElement;

    // Обновление интерфейса
    const render = (state: CalculatorState) => {
        display.value = state.display;
    };

    // Обработчики событий
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.getAttribute("data-action");
            if (!action) return;

            state = action === "clear" 
                ? clearDisplay() 
                : action === "=" 
                    ? computeResult(state)
                    : appendToDisplay(state, action);

            render(state);
        });
    });
});