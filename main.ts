document.getElementById('Form')?.addEventListener('submit', function (event) {
  event.preventDefault();

  // Gather form element references once for efficiency
  const usernameElement = document.getElementById('username') as HTMLInputElement;
  const profilepicinput = document.getElementById('profilepic') as HTMLInputElement;
  const nameElement = document.getElementById('Name') as HTMLInputElement;
  const emailElement = document.getElementById('email') as HTMLInputElement;
  const PhoneElement = document.getElementById('phone') as HTMLInputElement;
  const educationElement = document.getElementById('education') as HTMLInputElement;
  const experienceElement = document.getElementById('experience') as HTMLInputElement;
  const skillsElement = document.getElementById('skills') as HTMLInputElement;

  // Validate required fields (consider adding more validations if needed)
  if (!profilepicinput.files?.[0] || !nameElement.value || !emailElement.value || !PhoneElement.value) {
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
    ${profilepicinput.files?.[0] ? `<Image src="${URL.createObjectURL(profilepicinput.files[0])}" alt="Profile Picture" class="profilepic">` : ''}
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
  const resumeOutputElement = document.getElementById('resumeOutput')
  if(resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutput;
   resumeOutputElement.classList.remove("hidden");
   const buttonsContainer = document.createElement("div");
   buttonsContainer.id = "buttonsContainer";
   resumeOutputElement.appendChild(buttonsContainer);

   const downloadButton= document.createElement("button");
   downloadButton.textContent = "Download as PDF";
   downloadButton.addEventListener("click",()=>{
    window.print();
   });

   buttonsContainer.appendChild(downloadButton);

   const shareLinkButton = document.createElement("button");
   shareLinkButton.textContent = "Copy Shareable Link";
   shareLinkButton.addEventListener("click", async () => {
    try{
      const shareableLink = `https://yourdomain.com/resumes/${myname.replace(
        /\s+/g,
        "_"
      )}_cv.html`;
    

      await navigator.clipboard.writeText(shareableLink);
      alert("Shareable link copied to Clipboard");
      }catch(err){
      console.log("Failed to copy link:",err);
      alert("Failed to copy link to clipboard.Please try again.");
    }
      });
        buttonsContainer.appendChild(shareLinkButton);
        }else{
         console.error("Resume output container not found");
       }
    
    }
);