# Objective
**To add a company logo, make a working Add Item button, and integrate an SGST option in the application.**

# Table of Contents
- [Introduction](#introduction)
- [Step 1: Adding a Company Logo](#step-1-adding-a-company-logo)
- [Step 2: Implementing the Add Item Button](#step-2-implementing-the-add-item-button)
- [Step 3: Adding SGST Option](#step-3-adding-sgst-option)
- [Conclusion](#conclusion)

---

## Introduction
This journal documents the steps taken to implement three features in the application:
1. Adding a company logo to enhance branding.
2. Creating a functional Add Item button using JavaScript.
3. Introducing an SGST (State Goods and Services Tax) option in the app for better tax calculation.

These features were added to improve the application's usability and professional appearance.

---

### Why We Added These Features:
1. **Company Logo:** Enhances the app's visual identity and professional appeal.
2. **Add Item Button:** Provides functionality for users to add new items dynamically.
3. **SGST Option:** Facilitates accurate tax calculation, aligning the app with user requirements and compliance.

---

### Development Environment:
- **Machine Model:** "HP EliteBook 820 G3"
- **Operating System:** "Ubuntu 24.04.1 LTS"
- **Browser:** Google Chrome (Version 118.0)
- **Text Editor/IDE:** Visual Studio Code

---

## Step 1: Adding a Company Logo

### Task:
- Integrate the company logo into the application interface.

### Steps to Add the Logo:

1. **Obtain the Logo:**
   - Ensure the company logo is saved in a `.png` or `.jpg` format.
   - Place the logo file in the `images` directory of your project.

2. **Add HTML Code for the Logo:**
   - Insert the following code in the appropriate section of the HTML file:
     ```html
     <div class="company-logo">
         <img src="./images/company-logo.png" alt="Company Logo" width="150" height="150">
     </div>
     ```
   - `src`: Specifies the path to the logo image.
   - `alt`: Provides alternative text for accessibility.
   - `width` and `height`: Define the size of the logo.

3. **Style the Logo (Optional):**
   - Use CSS to position and style the logo:
     ```css
     .company-logo {
         text-align: center;
         margin: 20px auto;
     }
     .company-logo img {
         border-radius: 8px;
     }
     ```

**Why:** A visually appealing and prominent logo improves brand recognition and user experience.

---

## Step 2: Implementing the Add Item Button

### Task:
- Create a functional Add Item button that dynamically adds new items to a list.

### Steps to Implement:

1. **Add HTML for the Button and List:**
   - Insert this code in the HTML file:
     ```html
     <div class="add-item-section">
         <input type="text" id="item-input" placeholder="Enter item">
         <button id="add-item-button">Add Item</button>
         <ul id="item-list"></ul>
     </div>
     ```

2. **Add JavaScript Functionality:**
   - Write the following JavaScript code to make the button functional:
     ```javascript
     document.getElementById('add-item-button').addEventListener('click', function() {
         const input = document.getElementById('item-input');
         const itemList = document.getElementById('item-list');

         if (input.value.trim() !== "") {
             const listItem = document.createElement('li');
             listItem.textContent = input.value;
             itemList.appendChild(listItem);
             input.value = "";
         } else {
             alert('Please enter a valid item.');
         }
     });
     ```

**Why:** The Add Item button simplifies the process for users to dynamically add items to a list, improving interactivity.

---

## Step 3: Adding SGST Option

### Task:
- Introduce an SGST option in the application for tax calculations.

### Steps to Implement:

1. **Add HTML for the SGST Option:**
   - Insert this code in the HTML file:
     ```html
     <div class="tax-section">
         <label for="sgst">SGST (%):</label>
         <input type="number" id="sgst" value="9" min="0" max="100">
     </div>
     ```

2. **Integrate JavaScript for SGST Calculations:**
   - Add this functionality in the script:
     ```javascript
     document.getElementById('sgst').addEventListener('input', function() {
         const sgstValue = parseFloat(this.value);

         if (isNaN(sgstValue) || sgstValue < 0 || sgstValue > 100) {
             alert('Please enter a valid SGST percentage (0-100).');
         } else {
             console.log(`SGST is set to: ${sgstValue}%`);
         }
     });
     ```

**Why:** Adding an SGST option ensures compliance with tax requirements and makes the app more functional for business use.

---

## Conclusion
In this implementation journal, we successfully:
1. Added a visually appealing company logo.
2. Developed a functional Add Item button to enhance interactivity.
3. Integrated an SGST option to improve tax calculation capabilities.

These features collectively improved the application’s usability and visual appeal, aligning with user needs and expectations.
