
async function checkEmailForPhishing(emailText) {
    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email_text": emailText })
    });

    const data = await response.json();
    return data;
}

function notifyUser(isPhishing, probability) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: isPhishing ? "⚠️ Phishing Alert!" : "✅ Safe Email",
        message: isPhishing ? `Warning! This email might be a phishing attempt. Score: ${probability.toFixed(2)}` : "This email looks safe."
    });
}

// Listen for a message from content.js (where we'll extract email text)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkEmail") {
        checkEmailForPhishing(message.emailText).then(data => {
            notifyUser(data.prediction === 1, data.probability);
        });
    }
});
