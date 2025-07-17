const submitBtn = document.getElementById("submitBtn");
const resultBox = document.getElementById("resultBox");
const emailInput = document.getElementById("emailInput");

submitBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();

  if (!email) {
    resultBox.innerHTML = "<div style='color:red;'>Please enter an email address.</div>";
    return;
  }

  const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

  try {
    resultBox.innerHTML = "⏳ Validating...";
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("API call failed");

    const result = await response.json();

    if (result.state !== "deliverable") {
      resultBox.innerHTML = `
        <div style='color: red; font-weight: bold;'>
          ❌ Invalid Email: ${result.reason.replace("_", " ")}
        </div>
      `;
      return;
    }

    let str = `<div style="color:green; font-weight:bold;">✅ Email is valid!</div><br/>`;
    for (let key of Object.keys(result)) {
      if (result[key] !== null && result[key] !== "") {
        str += `<div><strong>${key}</strong>: ${result[key]}</div>`;
      }
    }

    resultBox.innerHTML = str;

  } catch (error) {
    resultBox.innerHTML = `<div style='color:red;'>❌ Error: ${error.message}</div>`;
  }
});