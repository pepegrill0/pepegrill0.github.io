       const nameInput = document.getElementById('name-input');
        const addBtn = document.getElementById('add-btn');
        const namesList = document.getElementById('names-list');
        const sortBtn = document.getElementById('sort-btn');
        const resultContainer = document.getElementById('result-container');
        const winnerNameEl = document.getElementById('winner-name');

        let names = [];

        function updateUI() {
            namesList.innerHTML = '';
            names.forEach((name, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${name}</span>
                    <button class="delete-btn" onclick="removeName(${index})">❌</button>
                `;
                namesList.appendChild(li);
            });

            // Habilitar o deshabilitar botón de sortear según si hay al menos 2 personas
            sortBtn.disabled = names.length < 2;
        }

        function addName() {
            const name = nameInput.value.trim();
            if (name !== '' && !names.includes(name)) {
                names.push(name);
                nameInput.value = '';
                updateUI();
                resultContainer.style.display = 'none';
            }
            nameInput.focus();
        }

        window.removeName = function(index) {
            names.splice(index, 1);
            updateUI();
            resultContainer.style.display = 'none';
        }

        addBtn.addEventListener('click', addName);
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addName();
        });

        sortBtn.addEventListener('click', () => {
            if (names.length < 2) return;

            sortBtn.disabled = true;
            resultContainer.style.display = 'block';
            winnerNameEl.style.color = '#fba94c'; // Color de suspenso

            let counter = 0;
            const maxCount = 15; // Cuántas veces cambia antes de parar
            const intervalTime = 100; // Velocidad del parpadeo

            const suspenseInterval = setInterval(() => {
                // Mostrar nombres al azar durante la animación
                const randomIndex = Math.floor(Math.random() * names.length);
                winnerNameEl.textContent = names[randomIndex];
                counter++;

                if (counter >= maxCount) {
                    clearInterval(suspenseInterval);
                    // Elección final real
                    const finalWinnerIndex = Math.floor(Math.random() * names.length);
                    winnerNameEl.textContent = names[finalWinnerIndex];
                    winnerNameEl.style.color = 'var(--primary)'; // Color ganador definitivo
                    sortBtn.disabled = false;
                }
            }, intervalTime);
        });