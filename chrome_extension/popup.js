
document.getElementById("scanEmail").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                let emailBody = document.querySelector(".a3s"); // Extract email text
                if (emailBody) {
                    let emailText = emailBody.innerText;
                    chrome.runtime.sendMessage({ action: "checkEmail", emailText: emailText });
                } else {
                    console.log("No email body found.");
                }
            }
        });
    });
});
