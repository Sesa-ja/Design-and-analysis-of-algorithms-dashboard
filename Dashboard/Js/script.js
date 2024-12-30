const ctx1 = document.getElementById('timeComplexityChart').getContext('2d');
const timeComplexityChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: [
            'Bubble Sort', 
            'Quick Sort', 
            'Merge Sort', 
            'Heap Sort',
            'Binary Search', 
            'Linear Search',
            'Dijkstra’s Algorithm', 
            'DFS', 
            'BFS',
            'Fibonacci (DP)', 
            'Knapsack Problem', 
            'Prim’s Algorithm', 
            'Kruskal’s Algorithm', 
            'Strassen’s Matrix', 
            'Karatsuba Algorithm', 
            'N-Queens', 
            'Hamiltonian Cycle', 
            'TSP (Approx.)'
        ],
        datasets: [
            {
                label: 'Best Case',
                data: [
                    1,    // Bubble Sort: O(n)
                    1.44, // Quick Sort: O(n log n)
                    1.44, // Merge Sort: O(n log n)
                    1.44, // Heap Sort: O(n log n)
                    1,    // Binary Search: O(1)
                    1,    // Linear Search: O(1)
                    1.44, // Dijkstra: O(|E| + |V| log |V|)
                    1,    // DFS: O(|V| + |E|)
                    1,    // BFS: O(|V| + |E|)
                    1,    // Fibonacci: O(n)
                    1.44, // Knapsack: O(nW)
                    1.44, // Prim's: O(|E| log |V|)
                    1.44, // Kruskal's: O(|E| log |V|)
                    2.81, // Strassen: O(n^2.81)
                    1.585, // Karatsuba: O(n^1.585)
                    3,    // N-Queens: O(n!)
                    3,    // Hamiltonian Cycle: O(n!)
                    2     // TSP Approx.: O(n²)
                ],
                backgroundColor: '#3b82f6'
            },
            {
                label: 'Average Case',
                data: [
                    2,    // Bubble Sort: O(n²)
                    1.44, // Quick Sort: O(n log n)
                    1.44, // Merge Sort: O(n log n)
                    1.44, // Heap Sort: O(n log n)
                    1,    // Binary Search: O(log n)
                    2,    // Linear Search: O(n)
                    1.44, // Dijkstra: O(|E| log |V|)
                    1.44, // DFS: O(|V| + |E|)
                    1.44, // BFS: O(|V| + |E|)
                    1,    // Fibonacci: O(n)
                    1.44, // Knapsack: O(nW)
                    1.44, // Prim's: O(|E| log |V|)
                    1.44, // Kruskal's: O(|E| log |V|)
                    2.81, // Strassen: O(n^2.81)
                    1.585, // Karatsuba: O(n^1.585)
                    3.44, // N-Queens: O(n!)
                    3.44, // Hamiltonian Cycle: O(n!)
                    2     // TSP Approx.: O(n²)
                ],
                backgroundColor: '#f59e0b'
            },
            {
                label: 'Worst Case',
                data: [
                    2,    // Bubble Sort: O(n²)
                    2,    // Quick Sort: O(n²)
                    1.44, // Merge Sort: O(n log n)
                    1.44, // Heap Sort: O(n log n)
                    1,    // Binary Search: O(log n)
                    2,    // Linear Search: O(n)
                    1.44, // Dijkstra: O(|E| log |V|)
                    1.44, // DFS: O(|V| + |E|)
                    1.44, // BFS: O(|V| + |E|)
                    1,    // Fibonacci: O(n)
                    1.44, // Knapsack: O(nW)
                    1.44, // Prim's: O(|E| log |V|)
                    1.44, // Kruskal's: O(|E| log |V|)
                    2.81, // Strassen: O(n^2.81)
                    1.585, // Karatsuba: O(n^1.585)
                    3.44, // N-Queens: O(n!)
                    3.44, // Hamiltonian Cycle: O(n!)
                    2     // TSP Approx.: O(n²)
                ],
                backgroundColor: '#ef4444'
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});


const ctx2 = document.getElementById('functionChart').getContext('2d');
const functionChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8], 
        datasets: [
            {
                label: 'O(1)',
                data: [1, 1, 1, 1, 1, 1, 1, 1], 
                borderColor: '#3b82f6',
                fill: false
            },
            {
                label: 'O(log n)',
                data: [0, 0, 1, 1.585, 2, 2.585, 3, 3.169], 
                borderColor: '#ef4444',
                fill: false
            },
            {
                label: 'O(n)',
                data: [1, 2, 3, 4, 5, 6, 7, 8], 
                borderColor: '#f59e0b',
                fill: false
            },
            {
                label: 'O(n log n)',
                data: [0, 0, 3, 5.585, 10, 15.585, 21, 28.169], 
                borderColor: '#10b981',
                fill: false
            },
            {
                label: 'O(n²)',
                data: [1, 4, 9, 16, 25, 36, 49, 64], 
                borderColor: '#6b7280',
                fill: false
            },
            {
                label: 'O(n³)',
                data: [1, 8, 27, 64, 125, 216, 343, 512], 
                borderColor: '#9333ea',
                fill: false
            },
            {
                label: 'O(2ⁿ)',
                data: [1, 2, 4, 8, 16, 32, 64, 128], 
                borderColor: '#f97316',
                fill: false
            },
            {
                label: 'O(n!)',
                data: [1, 1, 2, 6, 24, 120, 720, 5040], 
                borderColor: '#eab308',
                fill: false
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
