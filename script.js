const result_disp = document.getElementById("result");
const ac = document.getElementById('ac');
const canc = document.getElementById('canc');
const buttons = document.querySelectorAll(".btn_number");
const buttons_operator = document.querySelectorAll(".btn_operator");
const equal = document.getElementById('equal');

let currentInput = '';
const max_value = 12

document.addEventListener("DOMContentLoaded", function() {
    ac.addEventListener("click", function() {
        currentInput = '';
        result_disp.innerHTML = '0';
    });

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonText = button.textContent;

            if (currentInput === '0' && buttonText !== '.') {
                currentInput = buttonText;
            } else if (currentInput.length >= max_value) {
                alert("Limite massimo di 12 caratteri raggiunto.");
                return;
            } else {
                currentInput += buttonText;
            }

            result_disp.innerHTML = currentInput;
        });
    });

    buttons_operator.forEach(button_op => {
        button_op.addEventListener("click", function() {
            const buttonText = button_op.textContent;

            if (currentInput.length >= max_value && currentInput !== '' && !(currentInput.includes('+') || currentInput.includes('-') || currentInput.includes('/') || currentInput.includes('x'))) {
                alert("Limite massimo di 12 caratteri raggiunto.");
                return;
            }
            
            if (currentInput === '' && buttonText === '-') {
                currentInput = '-';
            }

            else if (currentInput !== '' && !['+', '-', 'x', '/', '='].includes(currentInput.slice(-1))) {
                currentInput += buttonText;
            }
            
            result_disp.innerHTML = currentInput;
        });
    });


    canc.addEventListener("click", function() {
        currentInput = currentInput.slice(0, -1);
        
        if (currentInput === '') {
            result_disp.innerHTML = '0';
        } else {
            result_disp.innerHTML = currentInput;
        }
    });

    equal.addEventListener("click", function() {
        const fullExpression = currentInput; 
        let result = '';
        
        try {
            if (!fullExpression) {
                result = 'Error';
            } else {

                if (/[{}\[\]\(\)]/.test(fullExpression)) { // Tested for possible exploit
                    result = 'Error';
                    result_disp.innerHTML = result;
                    currentInput = result.toString();
                    return;
                }

                let expression = fullExpression.replace(/x/g, '*');
                expression = expression.replace(/÷/g, '/'); 

                result = eval(expression); 
            }
            
            if (isNaN(result)) {
                result = 'Error';
            } else {
                result = result.toString().slice(0, max_value);
            }
        } catch (e) {
            result = 'Error';
        }

        result_disp.innerHTML = result;
        currentInput = result.toString();  
    });


    
    document.getElementById("p_or_m").addEventListener("click", function() {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = "-" + currentInput;
        }
        result_disp.innerHTML = currentInput;
    });

    document.getElementById("percentage").addEventListener("click", function() {
        let percentage = currentInput / 100;
        currentInput = percentage.toString();

        result_disp.innerHTML = currentInput;
    });
});