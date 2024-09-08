"use strict";
// Get form and preview elements
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const downloadPdfButton = document.getElementById('download-pdf');
const backButton = document.getElementById("backButton");
const editButton = document.getElementById("editButton");
const resumeContent = document.getElementById("resumeContent");
const shareLinkButton = document.getElementById("shareLinkButton");
// Handle form submission
form.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    // Collect form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education").value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills").value;
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    const photoURL = photoFile ? URL.createObjectURL(photoFile) : '';
    // Populate the resume preview
    resumePhoto.src = photoURL;
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    // Hide form and show resume page
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    // Generate shareable link with URL query parameters (excluding image)
    const queryParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        workExperience: workExperience,
        skills: skills,
    });
    const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`;
    shareLinkButton.addEventListener("click", () => {
        window.open(uniqueUrl, "_blank");
    });
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
});
// Add back button functionality to go back to the form
backButton.addEventListener("click", () => {
    var _a;
    // Show the form again and hide the resume preview
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
    // Optionally clear query parameters
    window.history.replaceState(null, '', '/');
});
// Add edit button functionality
editButton.addEventListener("click", () => {
    var _a;
    // Populate the form with current resume data for editing
    updateFormFromResume();
    // Show the form again for editing
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
// Function to update the form fields with current resume data
function updateFormFromResume() {
    var _a, _b, _c;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(" from ")) || [];
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace('Email: ', '')) || '';
    document.getElementById("phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace('Phone: ', '')) || '';
    document.getElementById("degree").value = degree || '';
    document.getElementById("education").value = education || '';
    document.getElementById("workExperience").value = resumeWorkExperience.textContent || '';
    document.getElementById("skills").value = resumeSkills.textContent || '';
    document.getElementById("photo").value = resumePhoto.textContent || " ";
}
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Generate and download PDF
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error) => {
        console.error('PDF generation error:', error);
    });
});
// Handle query parameters on page load
window.addEventListener('DOMContentLoaded', () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const degree = params.get('degree') || '';
    const education = params.get('education') || '';
    const workExperience = params.get('workExperience') || '';
    const skills = params.get('skills') || '';
    if (name || email || phone || degree || education || workExperience || skills) {
        // Populate the resume preview if query params are present
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        // Hide form and show resume page
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
