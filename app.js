function push(stack, value) {
  stack.push(value);
}

function pop(stack) {
  if (stack.length === 0) {
    console.error("Stack underflow");
    throw new Error("Stack underflow");
  }
  return stack.pop();
}

function evaluateInfix(expression) {
  const operators = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const stack = [];
  const output = [];

  for (let i = 0; i < expression.length; i++) {
    if (!isNaN(expression[i])) {
      let operand = "";
      while (
        i < expression.length &&
        (!isNaN(expression[i]) || expression[i] === ".")
      ) {
        operand += expression[i++];
      }
      i--; // Move back one position to adjust for the loop increment
      output.push(parseFloat(operand));
    } else if (["+", "-", "*", "/"].includes(expression[i])) {
      while (
        stack.length > 0 &&
        operators[stack[stack.length - 1]] >= operators[expression[i]]
      ) {
        output.push(stack.pop());
      }
      stack.push(expression[i]);
    } else if (expression[i] === "(") {
      stack.push(expression[i]);
    } else if (expression[i] === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // Remove the '(' from the stack
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  const resultStack = [];
  for (let i = 0; i < output.length; i++) {
    if (!isNaN(output[i])) {
      resultStack.push(output[i]);
    } else if (["+", "-", "*", "/"].includes(output[i])) {
      const operand2 = resultStack.pop();
      const operand1 = resultStack.pop();
      switch (output[i]) {
        case "+":
          resultStack.push(operand1 + operand2);
          break;
        case "-":
          resultStack.push(operand1 - operand2);
          break;
        case "*":
          resultStack.push(operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            throw new Error("Division by zero");
          }
          resultStack.push(operand1 / operand2);
          break;
      }
    }
  }

  if (resultStack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return resultStack[0];
}

function push(stack, value) {
  stack.push(value);
}

function pop(stack) {
  if (stack.length === 0) {
    console.error("Stack underflow");
    throw new Error("Stack underflow");
  }
  return stack.pop();
}

function postfixEvaluate(postfix) {
  const stack = [];
  for (let i = 0; i < postfix.length; ) {
    if (!isNaN(postfix[i])) {
      stack.push(parseInt(postfix[i++], 10));
    } else if (["+", "-", "*", "/"].includes(postfix[i])) {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      switch (postfix[i]) {
        case "+":
          stack.push(operand1 + operand2);
          break;
        case "-":
          stack.push(operand1 - operand2);
          break;
        case "*":
          stack.push(operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            console.error("Division by zero");
            throw new Error("Division by zero");
          }
          stack.push(Math.floor(operand1 / operand2));
          break;
      }
      i++;
    } else {
      i++;
    }
  }

  return stack.pop();
}

function prefixEvaluate(prefix) {
  const stack = [];
  for (let i = prefix.length - 1; i >= 0; i--) {
    if (!isNaN(prefix[i])) {
      push(stack, parseFloat(prefix[i]));
    } else if (["+", "-", "*", "/"].includes(prefix[i])) {
      const operand1 = pop(stack);
      const operand2 = pop(stack);
      switch (prefix[i]) {
        case "+":
          push(stack, operand1 + operand2);
          break;
        case "-":
          push(stack, operand1 - operand2);
          break;
        case "*":
          push(stack, operand1 * operand2);
          break;
        case "/":
          if (operand2 === 0) {
            console.error("Division by zero");
            throw new Error("Division by zero");
          }
          push(stack, operand1 / operand2);
          break;
      }
    }
  }
  return pop(stack);
}

function evaluateExpression() {
  const expression = document.getElementById("expression").value;
  const choice = document.getElementById("choice").value;
  const resultContainer = document.getElementById("result");
  try {
    let result;
    if (choice === "infix") {
      result = evaluateInfix(expression);
    } else if (choice === "postfix") {
      result = postfixEvaluate(expression);
    } else if (choice === "prefix") {
      result = prefixEvaluate(expression);
    }
    // console.log(expression);
    resultContainer.innerHTML = `<p>Result: ${result}</p>`;
  } catch (error) {
    resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
