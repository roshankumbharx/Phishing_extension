
function checkEmail() {
    let emailBody = document.querySelector(".a3s"); // Gmail email body selector
    if (emailBody) {
        let emailText = emailBody.innerText;
        chrome.runtime.sendMessage({ action: "checkEmail", emailText: emailText });
    } else {
        console.log("No email body found.");
    }
}
