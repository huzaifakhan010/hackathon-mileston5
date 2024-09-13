"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.getElementById('Form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b;
    event.preventDefault();
    // Gather form element references once for efficiency
    const usernameElement = document.getElementById('username');
    const profilepicinput = document.getElementById('profilepic');
    const nameElement = document.getElementById('Name');
    const emailElement = document.getElementById('email');
    const PhoneElement = document.getElementById('phone');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    // Validate required fields (consider adding more validations if needed)
    if (!((_a = profilepicinput.files) === null || _a === void 0 ? void 0 : _a[0]) || !nameElement.value || !emailElement.value || !PhoneElement.value) {
        alert('Please fill in all required fields: Profile Picture, Name, Email, and Phone Number.');
        return;
    }
    const myname = nameElement.value;
    const email = emailElement.value;
    const phone = PhoneElement.value;
    const education = educationElement.value;
    const skills = skillsElement.value;
    const experience = experienceElement.value;
    // **Handle username removal (two options):**
    // Option 1: Remove username from the generated resume content
    // const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`; // Not used in this option
    const resumeOutput = `
    <h2>Resume</h2>
    ${((_b = profilepicinput.files) === null || _b === void 0 ? void 0 : _b[0]) ? `<Image src="${URL.createObjectURL(profilepicinput.files[0])}" alt="Profile Picture" class="profilepic">` : ''}
    <p><strong>Name:</strong><span id="edit-name" class="editable">${myname}</span></p>
    <p><strong>Email:</strong><span id="edit-email" class="editable">${email} </span></p>
    <p><strong>Phone Number:</strong><span id="edit-phone" class="editable">${phone} </span></p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>
  `;
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();
        });
        buttonsContainer.appendChild(downloadButton);
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            try {
                const shareableLink = `https://yourdomain.com/resumes/${myname.replace(/\s+/g, "_")}_cv.html`;
                yield navigator.clipboard.writeText(shareableLink);
                alert("Shareable link copied to Clipboard");
            }
            catch (err) {
                console.log("Failed to copy link:", err);
                alert("Failed to copy link to clipboard.Please try again.");
            }
        }));
        buttonsContainer.appendChild(shareLinkButton);
    }
    else {
        console.error("Resume output container not found");
    }
});
