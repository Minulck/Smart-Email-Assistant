console.log("Content script loaded");


function getEmailContent() {
  // Try the main compose box first
  const composeBox = document.querySelector('.h7.bg.ie.Jux0I.j23lnd');
  if (composeBox) return composeBox.innerText;

  // Fallback selectors for other possible compose areas
  const selectors = [
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      console.log(`Found composed content using selector: ${selector}`);
      return content.innerText;
    }
  }
  return '';
}

function findComposedToolbar() {
  const selectors = [
    ".btC", // Gmail Compose Toolbar
    ".aDh", // Gmail Compose Dialog
    '[role="Dialog"]', // General Dialogs
    ".gU.Up",
  ];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      console.log(`Found composed toolbar using selector: ${selector}`);
      return toolbar;
    }
  }
  return null;
}

function createAiButton() {
  const button = document.createElement("div");
  button.className = "T-I T-I-KE L3";
  button.style.marginRight = "8px";
  button.style.cursor = "pointer";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

function injectButton() {
  const existingButton = document.querySelector(
    ".email-writer-assistant-button"
  );
  if (existingButton) existingButton.remove();

  const toolbar = findComposedToolbar();
  if (!toolbar) {
    console.warn("Composed toolbar not found");
    return;
  }

  const button = createAiButton();
  button.classList.add("email-writer-assistant-button");
  button.addEventListener("click", async () => {
    console.log("AI Reply button clicked");
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;

      const emailContent = getEmailContent(); // Function to get the email content
      const tone = "formal"; // or get this from user input if available
      console.log("Sending to backend:", { emailContent, tone });

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error!`);
      }
      const generate_reply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );
      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generate_reply);
      } else {
        console.warn("Compose box not found");
      }
    } catch (error) {
      console.error("Error generating AI reply:", error);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
}

const observe = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposedElements = addedNodes.some((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return false;
      if (
        typeof node.matches === "function" &&
        node.matches('.aDh,.btC,[role="Dialog"]')
      )
        return true;
      if (
        typeof node.querySelector === "function" &&
        node.querySelector('.aDh,.btC,[role="Dialog"]')
      )
        return true;
      return false;
    });
    if (hasComposedElements) {
      console.log(
        "Composed elements detected, sending message to background script"
      );
      setTimeout(injectButton, 500);
    }
  }
});

observe.observe(document.body, {
  childList: true,
  subtree: true,
});
