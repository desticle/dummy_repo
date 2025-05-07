# Lab 5 - Starter
Make sure you make a PR to your own repo's main and not the class' repo!! Otherwise you will lose points!!

## Student Information

*   **Name:** Chencheng Li
*   **Lab Partner(s):** N/A

## GitHub Pages Links
- Expose: [https://chencheng-li.github.io/Lab5_Starter/expose.html]
- Explore: [https://chencheng-li.github.io/Lab5_Starter/explore.html]

## Check Your Understanding - Unit Testing

**1) Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.**

I would likely **not** use a single unit test to test the entire "message" feature as described.

*   **Scope:** The "message" feature, which involves a user writing and *sending* a message to another user, typically involves multiple components and interactions beyond a single, isolated unit of code. This often includes UI elements for message composition, network requests to a server, server-side logic to process and route the message, and potentially database interactions to store the message.
*   **Dependencies:** Testing the full "send" functionality would require mocking or interacting with these external dependencies (network, server, database), which moves beyond the scope of a true unit test. Unit tests are meant to test small, isolated pieces of code (like individual functions or methods) in a controlled environment.
*   **Type of Testing:** While individual functions *within* the "message" feature (e.g., a function that formats the message content before sending, or a function that validates the recipient's address format) would be excellent candidates for unit tests, the end-to-end act of sending a message is better suited for **integration tests** (to test how different components like the client and server work together) or **end-to-end (E2E) tests** (to simulate a real user scenario through the UI).

So, I would use unit tests for specific, isolated logic *within* the feature, but not for the entire feature of "writing and sending a message to another user" as a whole.

**2) Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters.**

Yes, I **would** definitely use a unit test to test the "max message length" feature. 

*   **Isolated Logic:** The core logic for this feature likely resides in a specific function or method that takes the input text (or its length) and returns a boolean indicating if it's valid, or perhaps it's part of the input validation logic that truncates or prevents further input. This logic is usually self-contained and doesn't have external dependencies like network calls or database interactions.
*   **Clear Inputs and Outputs:** It's straightforward to define test cases with clear inputs (strings of various lengths) and expected outputs (e.g., a string of 79 characters is allowed, 80 characters is allowed, 81 characters is not allowed, or the input is truncated to 80 characters).
*   **Fast and Reliable:** Unit tests for this kind of validation are typically very fast to execute and are highly reliable because they don't depend on external systems.
*   **Regression Prevention:** This is a critical piece of validation logic. Unit tests help ensure that this functionality doesn't break accidentally when other parts of the application are changed. For example, we can test edge cases like empty strings, strings exactly at the limit, and strings just over the limit.
