document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    });
});

// All Algorithms Data
const algorithms = {
    sorting: [
        { name: "Bubble Sort", bestCase: "O(n)", worstCase: "O(n²)" },
        { name: "Selection Sort", bestCase: "O(n²)", worstCase: "O(n²)" },
        { name: "Insertion Sort", bestCase: "O(n)", worstCase: "O(n²)" },
        { name: "Merge Sort", bestCase: "O(n log n)", worstCase: "O(n log n)" },
        { name: "Quick Sort", bestCase: "O(n log n)", worstCase: "O(n²)" }
    ],
    searching: [
        { name: "Binary Search", bestCase: "O(1)", worstCase: "O(log n)" },
        { name: "Linear Search", bestCase: "O(1)", worstCase: "O(n)" }
    ],
    graph: [
        { name: "BFS (Breadth-First Search)", bestCase: "O(V + E)", worstCase: "O(V + E)" },
        { name: "DFS (Depth-First Search)", bestCase: "O(V + E)", worstCase: "O(V + E)" },
        { name: "Dijkstra's Algorithm", bestCase: "O(E + V log V)", worstCase: "O(E log V)" },
        { name: "Prim’s Algorithm", bestCase: "O(E log V)", worstCase: "O(E log V)" },
        { name: "Kruskal’s Algorithm", bestCase: "O(E log E)", worstCase: "O(E log E)" }
    ],
    dp: [
        { name: "Fibonacci (Dynamic Programming)", bestCase: "O(1)", worstCase: "O(n)" },
        { name: "Knapsack (0/1)", bestCase: "O(nW)", worstCase: "O(nW)" },
        { name: "LCS (Longest Common Subsequence)", bestCase: "O(nm)", worstCase: "O(nm)" },
        { name: "LIS (Longest Increasing Subsequence)", bestCase: "O(n log n)", worstCase: "O(n²)" }
    ],
    greedy: [
        { name: "Activity Selection", bestCase: "O(n log n)", worstCase: "O(n log n)" },
        { name: "Huffman Coding", bestCase: "O(n log n)", worstCase: "O(n log n)" }
    ],
    backtracking: [
        { name: "N-Queens Problem", bestCase: "O(n!)", worstCase: "O(n!)" },
        { name: "Sudoku Solver", bestCase: "O(9^k)", worstCase: "O(9^k)" }
    ],
    tree: [
        { name: "Tree Traversals", bestCase: "O(n)", worstCase: "O(n)" },
        { name: "BST Operations", bestCase: "O(log n)", worstCase: "O(n)" },
        { name: "AVL Rotations", bestCase: "O(1)", worstCase: "O(1)" },
        { name: "LCA (Lowest Common Ancestor)", bestCase: "O(log n)", worstCase: "O(n)" }
    ]
};

// Best & Worst Case Complexities
const algorithmComplexities = {};
Object.keys(algorithms).forEach(category => {
    algorithms[category].forEach(algo => {
        algorithmComplexities[algo.name] = { best: algo.bestCase, worst: algo.worstCase };
    });
});

// Function to Execute Code
async function testExecuteCode() {
    const code = document.getElementById("code-input").value;
    const languageId = document.getElementById("language-select").value;
    const algorithm = document.getElementById("algorithm-dropdown").value;

    if (!code.trim() || !algorithm) {
        alert("Please select an algorithm and enter code before running.");
        return;
    }

    document.getElementById("output-display").textContent = "Executing...";

    try {
        const startTime = performance.now(); // Start execution timer

        const response = await fetch("http://localhost:5000/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source_code: code, language_id: languageId })
        });

        const result = await response.json();
        const executionTime = (performance.now() - startTime).toFixed(2); // Measure execution time

        document.getElementById("output-display").textContent = result.stdout || "No Output";

        // Update leaderboard with execution details
        updateLeaderboard(algorithm, executionTime, result.stdout);

    } catch (error) {
        document.getElementById("output-display").textContent = "Execution Error";
    }
}

// Function to update leaderboard
function updateLeaderboard(algorithm, executionTime, output) {
    const leaderboard = document.getElementById("leaderboard-body");
    const complexities = algorithmComplexities[algorithm] || { best: "Unknown", worst: "Unknown" };

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${algorithm}</td>
        <td>${complexities.best}</td>
        <td>${complexities.worst}</td>
        <td>${executionTime} ms</td>
        <td>${output ? output.substring(0, 20) + "..." : "N/A"}</td>
    `;

    leaderboard.appendChild(newRow);
}

// Function to display algorithms in dropdown
function showAlgorithms(category) {
    const dropdown = document.getElementById("algorithm-dropdown");
    dropdown.innerHTML = '<option value="">-- Select Algorithm --</option>';

    algorithms[category].forEach(algo => {
        let option = document.createElement("option");
        option.value = algo.name;
        option.textContent = algo.name;
        dropdown.appendChild(option);
    });

    document.getElementById("algorithm-selection").classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    // Set initial mode from local storage
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLightMode = document.body.classList.contains("light-mode");
        themeToggle.textContent = isLightMode ? "☀️" : "🌙";
        
        // Save preference
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    });
});
// Function to Clear Leaderboard
function clearLeaderboard() {
    document.getElementById("leaderboard-body").innerHTML = "";
}

// Function to Reset Code Input
function resetCode() {
    document.getElementById("code-input").value = "";
    document.getElementById("output-display").textContent = "Waiting for execution...";
}
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");

    // Check saved theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLightMode = document.body.classList.contains("light-mode");
        themeToggle.textContent = isLightMode ? "☀️" : "🌙";

        // Save preference in local storage
        localStorage.setItem("theme", isLightMode ? "light" : "dark");
    });
});


// Function to display algorithm details
function displayAlgorithmDetails() {
    const selectedAlgorithm = document.getElementById("algorithm-dropdown").value;
    const descriptionElement = document.getElementById("algorithm-description");

    for (let category in algorithms) {
        let algorithm = algorithms[category].find(algo => algo.name === selectedAlgorithm);
        if (algorithm) {
            descriptionElement.textContent = `Best Case: ${algorithm.bestCase}, Worst Case: ${algorithm.worstCase}`;
            return;
        }
    }
    descriptionElement.textContent = "Select an algorithm to see details.";
}
