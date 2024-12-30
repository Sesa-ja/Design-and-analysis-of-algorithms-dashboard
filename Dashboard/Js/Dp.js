document.addEventListener('DOMContentLoaded', function () {
    const numItemsInput = document.getElementById('numItems');
    const knapsackCapacityInput = document.getElementById('capacity');
    const itemRows = document.getElementById('item-rows');
    const dpTableBody = document.getElementById('dp-table-body');
    const dpTableHead = document.getElementById('dp-table-head');

    const startSimulationBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const delayBtn = document.getElementById('delayBtn');
    const delayInput = document.getElementById('delayInput');

    function createItemsTable(numItems) {
        itemRows.innerHTML = ''; 
        for (let i = 1; i <= numItems; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${i}</td>
                <td><input type="number" min="1" class="item-weight" value="1"></td>
                <td><input type="number" min="1" class="item-value" value="1"></td>`;
            itemRows.appendChild(row);
        }
    }

    function createDPTable(numItems, capacity) {
        dpTableBody.innerHTML = ''; 
        dpTableHead.innerHTML = '<tr><th></th>'; 
        for (let w = 0; w <= capacity; w++) {
            dpTableHead.innerHTML += `<th>${w}</th>`; 
        }
        dpTableHead.innerHTML += '</tr>';

        for (let i = 0; i <= numItems; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${i}</td>`; 
            for (let w = 0; w <= capacity; w++) {
                row.innerHTML += `<td>0</td>`; 
            }
            dpTableBody.appendChild(row);
        }
    }

    async function startSimulation(delay = 0) {
        const numItems = parseInt(numItemsInput.value) || 0;
        const capacity = parseInt(knapsackCapacityInput.value) || 0;
        const weights = [];
        const values = [];

        const itemRowsArray = Array.from(itemRows.querySelectorAll('tr'));
        itemRowsArray.forEach(row => {
            const weight = parseInt(row.querySelector('.item-weight').value);
            const value = parseInt(row.querySelector('.item-value').value);
            weights.push(weight);
            values.push(value);
        });

        createDPTable(numItems, capacity); 

        const dp = [];
        for (let i = 0; i <= numItems; i++) {
            dp[i] = new Array(capacity + 1).fill(0);
        }

        for (let i = 1; i <= numItems; i++) {
            for (let w = 0; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }

                const cell = dpTableBody.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${w + 2})`);
                if (cell) {
                    cell.textContent = dp[i][w];
                }

                if (delay > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        const maxValue = dp[numItems][capacity];
        let totalWeight = 0;
        let totalValue = 0;
        const selectedItems = [];

        let w = capacity;
        for (let i = numItems; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                selectedItems.push(i);
                totalWeight += weights[i - 1];
                totalValue += values[i - 1];
                w -= weights[i - 1];
            }
        }

        document.getElementById('maxContainer').textContent = 'Maximum Container: ' + maxValue;
        document.getElementById('totalWeight').textContent = 'Total Weight: ' + totalWeight;
        document.getElementById('totalValue').textContent = 'Total Value: ' + totalValue;
        document.getElementById('selectedItems').textContent = 'Selected Items: ' + selectedItems.join(', ');
    }

    resetBtn.addEventListener('click', () => {
        numItemsInput.value = 3; 
        knapsackCapacityInput.value = 5; 
        createItemsTable(3); 
        createDPTable(3, 5); 

        document.getElementById('maxContainer').textContent = 'Maximum Container: ';
        document.getElementById('totalWeight').textContent = 'Total Weight: ';
        document.getElementById('totalValue').textContent = 'Total Value: ';
        document.getElementById('selectedItems').textContent = 'Selected Items: ';
    });

    startSimulationBtn.addEventListener('click', () => startSimulation(0)); // No delay
    delayBtn.addEventListener('click', () => {
        const delay = parseInt(delayInput.value) || 0;
        startSimulation(delay); 
    });

    createItemsTable(3);
    createDPTable(3, 5);

    document.getElementById('maxContainer').textContent = 'Maximum Container: ';
    document.getElementById('totalWeight').textContent = 'Total Weight: ';
    document.getElementById('totalValue').textContent = 'Total Value: ';
    document.getElementById('selectedItems').textContent = 'Selected Items: ';
});

async function startSimulation(delay = 0) {
    const numItems = parseInt(numItemsInput.value) || 0;
    const capacity = parseInt(knapsackCapacityInput.value) || 0;
    const weights = [];
    const values = [];

    const itemRowsArray = Array.from(itemRows.querySelectorAll('tr'));
    itemRowsArray.forEach(row => {
        const weight = parseInt(row.querySelector('.item-weight').value);
        const value = parseInt(row.querySelector('.item-value').value);
        weights.push(weight);
        values.push(value);
    });

    createDPTable(numItems, capacity);

    const dp = [];
    for (let i = 0; i <= numItems; i++) {
        dp[i] = new Array(capacity + 1).fill(0);
    }

    for (let i = 1; i <= numItems; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }

            const cell = dpTableBody.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${w + 2})`);
            if (cell) {
                cell.textContent = dp[i][w];
                cell.classList.add('hover'); 

                
                setTimeout(() => {
                    cell.classList.remove('hover');
                }, delay);
            }

            if (delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    const maxValue = dp[numItems][capacity];
    let totalWeight = 0;
    let totalValue = 0;
    const selectedItems = [];

    let w = capacity;
    for (let i = numItems; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(i);
            totalWeight += weights[i - 1];
            totalValue += values[i - 1];
            w -= weights[i - 1];
        }
    }

    document.getElementById('maxContainer').textContent = 'Maximum Container: ' + maxValue;
    document.getElementById('totalWeight').textContent = 'Total Weight: ' + totalWeight;
    document.getElementById('totalValue').textContent = 'Total Value: ' + totalValue;
    document.getElementById('selectedItems').textContent = 'Selected Items: ' + selectedItems.join(', ');
}
