async function executeCode() {
    const code = document.getElementById("code-input").value;
    const languageId = document.getElementById("language-select").value;

    if (!code.trim()) {
        alert("Please enter code before running.");
        return;
    }

    document.getElementById("output-display").textContent = "Executing...";

    try {
        console.log("Sending request...");

        const response = await fetch("http://localhost:5000/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                source_code: code,
                language_id: languageId,
                stdin: "", // Optional input
                expected_output: null,
            }),
        });

        console.log("Response received:", response);
        
        const result = await response.json();
        console.log("Result:", result);

        document.getElementById("output-display").textContent = result.stdout || result.stderr || "No Output";
    } catch (error) {
        console.error("Error executing code:", error);
        document.getElementById("output-display").textContent = "Execution Error";
    }
}
