let selectedOp = null;

const opBtns = document.querySelectorAll('.op-btn');

opBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    opBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedOp = btn.dataset.op;
    document.getElementById('op-symbol').textContent = btn.dataset.sym;
  });
});

function calcular() {
  const a = parseFloat(document.getElementById('num1').value);
  const b = parseFloat(document.getElementById('num2').value);
  const resultEl = document.getElementById('result');
  const exprEl = document.getElementById('expr');
  const sym = document.querySelector('.op-btn.active')?.dataset.sym || '?';

  resultEl.className = 'resultado-val';

  if (isNaN(a) || isNaN(b)) {
    resultEl.className = 'resultado-val error';
    resultEl.textContent = 'insira os dois valores';
    exprEl.textContent = '';
    return;
  }

  if (!selectedOp) {
    resultEl.className = 'resultado-val error';
    resultEl.textContent = 'escolha uma operação';
    exprEl.textContent = '';
    return;
  }

  let resultado;

  switch (selectedOp) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '*': resultado = a * b; break;
    case '/':
      if (b === 0) {
        resultEl.className = 'resultado-val error';
        resultEl.textContent = 'divisão por zero';
        exprEl.textContent = `${a} ${sym} ${b}`;
        return;
      }
      resultado = a / b;
      break;
  }

  const formatar = n => Number.isInteger(n) ? n.toString() : parseFloat(n.toFixed(10)).toString();

  exprEl.textContent = `${a} ${sym} ${b} =`;
  resultEl.textContent = formatar(resultado);
}

// ── Limpar ──
function resetar() {
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('result').textContent = '—';
  document.getElementById('result').className = 'resultado-val';
  document.getElementById('expr').textContent = '';
  document.getElementById('op-symbol').textContent = '·';
  opBtns.forEach(b => b.classList.remove('active'));
  selectedOp = null;
}

document.getElementById('btn-calcular').addEventListener('click', calcular);
document.getElementById('btn-reset').addEventListener('click', resetar);

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') calcular();
});