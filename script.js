document.querySelectorAll('select').forEach(select => {
  const updateColor = () => {
    select.style.color = select.value === "" ? "#D9D9D9" : "#000";
  };
  select.addEventListener('change', updateColor);
  updateColor(); // initial check
});

function initPhoneInput(input) {
  if (!input || input.dataset.itiInitialized === "true") return;

  if (!window.intlTelInput) return;

  window.intlTelInput(input, {
    initialCountry: "in",
    preferredCountries: ["in"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });
  input.dataset.itiInitialized = "true";
}

function scheduleIdleTask(task) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(task, { timeout: 1500 });
  } else {
    setTimeout(task, 600);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  scheduleIdleTask(() => {
    const track = document.getElementById("carouselTrack");
    if (!track || track.dataset.loopReady === "1") return;
    track.innerHTML += track.innerHTML;
    track.dataset.loopReady = "1";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  scheduleIdleTask(() => {
    const track = document.getElementById("carouselTrackApp");
    if (!track || track.dataset.loopReady === "1") return;
    track.innerHTML += track.innerHTML;
    track.dataset.loopReady = "1";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".phone").forEach(initPhoneInput);
});

const dropdown = document.getElementById("specializationDropdown");
const box = dropdown?.querySelector(".select-box");
const options = dropdown?.querySelector(".options");

if (dropdown && box && options) {
  box.onclick = () => {
    dropdown.classList.toggle("open");
  };

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
  });

  const checkboxes = dropdown.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const selected = [...checkboxes]
        .filter(c => c.checked)
        .map(c => c.value)
        .join(", ");
      box.innerHTML = selected || 'Choose Your Specialization<span><img id="selectionDown" src="images/icon-arrow-down.webp"></span>';
    });
  });
}

function initSingleSelect(dropdownId, hiddenSelectId) {
  const dropdown = document.getElementById(dropdownId);
  const box = dropdown?.querySelector(".select-box");
  const hiddenSelect = document.getElementById(hiddenSelectId);
  const optionLabels = dropdown?.querySelectorAll(".options label");

  if (!dropdown || !box || !hiddenSelect || !optionLabels) return;

  const syncLabel = (value) => {
    const selectedLabel = value || box.dataset.placeholder || box.textContent.trim();
    box.innerHTML = `${selectedLabel}<span><img class="select-arrow" src="images/icon-arrow-down.webp" alt="Dropdown Icon"></span>`;
    hiddenSelect.value = value;
    hiddenSelect.dispatchEvent(new Event("change", { bubbles: true }));
  };

  box.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  optionLabels.forEach(label => {
    label.addEventListener("click", (e) => {
      e.stopPropagation();
      syncLabel(label.dataset.value || "");
      dropdown.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
  });

  hiddenSelect.addEventListener("change", () => {
    const value = hiddenSelect.value;
    const currentLabel = value || box.dataset.placeholder;
    box.innerHTML = `${currentLabel}<span><img class="select-arrow" src="images/icon-arrow-down.webp" alt="Dropdown Icon"></span>`;
  });

  syncLabel(hiddenSelect.value || "");
}

initSingleSelect("courseSelectDropdown", "courseSelection");
initSingleSelect("modeSelectDropdown", "modeSelection");

const pageHeader = document.querySelector("header");
if (pageHeader) {
  let lastScrollY = window.scrollY || 0;
  let headerTicking = false;
  const hideThreshold = 96;

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY || 0;
    const scrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY <= hideThreshold || !scrollingDown) {
      pageHeader.classList.remove("is-hidden");
    } else {
      pageHeader.classList.add("is-hidden");
    }

    lastScrollY = currentScrollY;
    headerTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(updateHeaderState);
  }, { passive: true });

  window.addEventListener("load", updateHeaderState);
  updateHeaderState();
}

const formCourseSelect = document.querySelector('.lead-form select[name="course"]');
const formSpecializationSelect = document.querySelector('.lead-form .leadSpecializationChoice');

const formSpecializationMap = {
  MBA: [
    "Finance",
    "Marketing",
    "Human Resource",
    "Analytics",
    "Data Science",
    "Retail Management",
    "BFSI",
    "Information Technology",
    "Fintech",
    "Operations",
    "International Business",
    "Information System Technology",
    "Project Management",
    "Supply Chain Management",
    "Total Quality Management",
    "Digital Marketing",
    "Business Analytics",
    "Logistics Management",
    "Hospital and Healthcare",
    "Banking",
    "Financial Services",
    "International Finance",
    "Digital Entrepreneurship",
    "Dual Specialization"
  ],
  PGDM: [
    "Finance",
    "Operations",
    "Human Resources",
    "Marketing",
    "Business Analytics",
    "Strategy",
    "General Management"
  ],
  "PGDM Executive": [
    "Finance",
    "Operations",
    "Human Resources",
    "Marketing",
    "Business Analytics",
    "Strategy",
    "General Management"
  ],
  PGDBA: [
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Operations Management",
    "Management Accounting",
    "Customer Relationship Management"
  ],
  MCA: [
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Gaming Development",
    "Full Stack Web Development",
    "Software Engineering",
    "Blockchain",
    "Augmented Reality",
    "Virtual Reality",
    "Data Engineering",
    "Data Analytics",
    "Cloud and Security"
  ],
  MCOM: [
    "Financial Management",
    "Accounting",
    "Mathematics",
    "Economics",
    "Banking",
    "Financial Services"
  ],
  MA: [
    "Honors",
    "English",
    "History",
    "Sociology",
    "Political Science",
    "Public Policy and Governance",
    "Psychology",
    "Journalism and Mass Communication",
    "Hindi",
    "Malayalam",
    "Tamil",
    "Kannada"
  ],
  MSc: [
    "Mathematics",
    "Statistics",
    "General"
  ],
  MSW: [
    "General",
    "Social Work"
  ],
  BSc: [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "General"
  ],
  BAJMC: [
    "Journalism",
    "Mass Communication",
    "General"
  ],
  BLib: [
    "General"
  ],
  MLib: [
    "General"
  ],
  BBA: [
    "Finance",
    "Marketing",
    "Human Resource",
    "Operations",
    "International Business",
    "Digital Marketing",
    "Business Analytics",
    "Retail Management"
  ],
  BCA: [
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Full Stack Web Development",
    "Software Engineering",
    "Blockchain",
    "Data Analytics"
  ],
  BCOM: [
    "Accounting",
    "Financial Management",
    "Economics",
    "Banking",
    "Financial Services",
    "Mathematics"
  ],
  BA: [
    "Honors",
    "English",
    "History",
    "Sociology",
    "Political Science",
    "Psychology",
    "Journalism and Mass Communication",
    "Hindi",
    "Malayalam",
    "Tamil",
    "Kannada"
  ]
};

function populateFormSpecializations(courseValue, selectedValue = "") {
  if (!formSpecializationSelect) return;

  const specs = formSpecializationMap[courseValue] || [];
  formSpecializationSelect.innerHTML = '<option value="" hidden>Select Your Specialization</option>';

  if (!courseValue) {
    formSpecializationSelect.value = "";
    formSpecializationSelect.disabled = true;
    return;
  }

  specs.forEach(spec => {
    const option = document.createElement("option");
    option.value = spec;
    option.textContent = spec;
    formSpecializationSelect.appendChild(option);
  });

  formSpecializationSelect.disabled = false;
  formSpecializationSelect.value = specs.includes(selectedValue) ? selectedValue : "";
}

if (formCourseSelect && formSpecializationSelect) {
  populateFormSpecializations(formCourseSelect.value);
  formCourseSelect.addEventListener("change", () => {
    populateFormSpecializations(formCourseSelect.value);
    syncLeadFormFields();
  });
  formSpecializationSelect.addEventListener("change", syncLeadFormFields);
}

const cartArea = document.getElementById('cartArea');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

scrollLeft.onclick = () => cartArea.scrollBy({ left: -350, behavior: 'smooth' });
scrollRight.onclick = () => cartArea.scrollBy({ left: 350, behavior: 'smooth' });

// Carts Filtration Process
function getSelectedFilters() {
  const selectedCourse = document.getElementById("courseSelection").value;
  const selectedMode = document.getElementById("modeSelection").value;
  const selectedUniv = document.getElementById("universitySelection").value;
  return { selectedCourse, selectedMode, selectedUniv };
}

function filterCarts() {
  const { selectedCourse, selectedMode, selectedUniv } = getSelectedFilters();

  document.querySelectorAll(".cart").forEach(cart => {
    const filterString = cart.dataset.filter || "";
    const filters = filterString.split(",").map(s => s.trim());
    const [course, mode, univ, ...specs] = filters;

    const matchCourse = !selectedCourse || course === selectedCourse;
    const matchMode = !selectedMode || mode === selectedMode;
    const matchUniv = !selectedUniv || univ === selectedUniv;

    cart.style.display = (matchCourse && matchMode && matchUniv) ? "inline-block" : "none";
  });
}

function updateFilterSummary() {
  const { selectedCourse, selectedMode, selectedUniv } = getSelectedFilters();
  const activeCount = [selectedCourse, selectedMode, selectedUniv].filter(Boolean).length;
  const counter = document.getElementById("activeFilterCount");
  if (counter) {
    counter.textContent = `${activeCount} active`;
  }
}

// Attach filter logic to all inputs
["courseSelection", "modeSelection", "universitySelection"].forEach(id => {
  document.getElementById(id).addEventListener("change", () => {
    filterCarts();
    updateFilterSummary();
  });
});
const clearFiltersBtn = document.getElementById("clearFilters");
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    document.getElementById("courseSelection").value = "";
    document.getElementById("modeSelection").value = "";
    document.getElementById("universitySelection").value = "";
    const courseBox = document.querySelector('#courseSelectDropdown .select-box');
    if (courseBox) {
      courseBox.innerHTML = 'Choose Your Course<span><img class="select-arrow" src="images/icon-arrow-down.webp" alt="Course Dropdown Icon"></span>';
    }
    const modeBox = document.querySelector('#modeSelectDropdown .select-box');
    if (modeBox) {
      modeBox.innerHTML = 'Choose Your Mode<span><img class="select-arrow" src="images/icon-arrow-down.webp" alt="Mode Dropdown Icon"></span>';
    }

    document.querySelectorAll('select').forEach(select => {
      const updateColor = () => {
        select.style.color = select.value === "" ? "#D9D9D9" : "#000";
      };
      updateColor();
    });

    filterCarts();
    syncLeadFormFields();
    updateFilterSummary();
  });
}

window.addEventListener("DOMContentLoaded", updateFilterSummary);

// Review Scrolling
function initReviewScroller() {
  const track = document.getElementById("reviewTrack");
  if (!track || track.dataset.loopReady === "1") return;

  track.innerHTML += track.innerHTML; // duplicate reviews for a seamless loop
  track.dataset.loopReady = "1";

  let loopWidth = track.scrollWidth / 2;
  let scrollSpeed = 0.9; // smooth continuous speed
  let isPaused = false;
  let offset = 0;

  const recalcLoopWidth = () => {
    loopWidth = track.scrollWidth / 2;
  };

  recalcLoopWidth();
  window.addEventListener("resize", recalcLoopWidth);

  function autoScroll() {
    if (!isPaused) {
      offset += scrollSpeed;

      // Seamless wrap so the strip never visibly stops
      if (offset >= loopWidth) {
        offset -= loopWidth;
      }

      track.style.transform = `translateX(${-offset}px)`;
    }

    requestAnimationFrame(autoScroll);
  }

  // Pause on hover/touch
  track.addEventListener("mouseenter", () => { isPaused = true; });
  track.addEventListener("mouseleave", () => { isPaused = false; });
  track.addEventListener("touchstart", () => { isPaused = true; }, { passive: true });
  track.addEventListener("touchend", () => { isPaused = false; }, { passive: true });
  track.addEventListener("pointerenter", () => { isPaused = true; });
  track.addEventListener("pointerleave", () => { isPaused = false; });

  autoScroll(); // start scroll
}

window.addEventListener("load", () => {
  scheduleIdleTask(initReviewScroller);
});

// Popup
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("formModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".form-close");
  const popupEntryShownKey = "seg_lead_popup_entry_shown";
  const popupExitShownKey = "seg_lead_popup_exit_shown";
  let entryTimer = null;

  const isModalOpen = () => modal.style.display === "flex";
  const hasShownEntry = () => !!sessionStorage.getItem(popupEntryShownKey);
  const hasShownExit = () => !!sessionStorage.getItem(popupExitShownKey);
  const canShowEntry = () => !hasShownEntry();
  const canShowExit = () => !hasShownExit();

  const openModal = (reason = "manual") => {
    modal.style.display = "flex";

    if (reason === "entry") {
      sessionStorage.setItem(popupEntryShownKey, "1");
    } else if (reason === "exit") {
      sessionStorage.setItem(popupExitShownKey, "1");
    } else {
      sessionStorage.setItem(popupEntryShownKey, "1");
      sessionStorage.setItem(popupExitShownKey, "1");
    }
  };

  const closeModal = () => {
    modal.style.display = "none";
    if (entryTimer) {
      clearTimeout(entryTimer);
      entryTimer = null;
    }
  };

  const scheduleEntryPopup = () => {
    if (!canShowEntry()) return;

    entryTimer = setTimeout(() => {
      if (canShowEntry() && !isModalOpen()) {
        openModal("entry");
      }
    }, 3000);
  };

  const handleExitIntent = (e) => {
    if (!canShowExit() || isModalOpen()) return;

    const isLeavingWindow = !e.relatedTarget && e.clientY <= 0;
    if (isLeavingWindow) {
      openModal("exit");
    }
  };

  // Show modal on any .apply click
  document.querySelectorAll(".apply").forEach(button => {
    button.addEventListener("click", () => {
      openModal("manual");
      
        // Fire GA4 event
        if (typeof gtag === "function") {
          gtag("event", "thank_you_popup_shown", {
            event_category: "Form",
            event_label: "Thank You Modal Displayed"
          });
        }
    });
  });

  // Open the same lead form when someone clicks "Go to Official Website"
  document.querySelectorAll(".utm-univ-link, .gow").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal("manual");

      const cart = button.closest(".cart");
      const universityTitle = cart?.querySelector("h3")?.textContent?.trim() || "";
      const sourceField = modal.querySelector('input[name="source"]');
      const universityField = modal.querySelector('input[name="university"]');

      if (sourceField) sourceField.value = "official_website_popup";
      if (universityField && universityTitle) universityField.value = universityTitle;

      if (typeof gtag === "function") {
        gtag("event", "official_website_popup_opened", {
          event_category: "Form",
          event_label: universityTitle || "Official Website"
        });
      }
    });
  });

  // Close on close button click
  closeBtn?.addEventListener("click", closeModal);

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  scheduleEntryPopup();
  document.addEventListener("mouseout", handleExitIntent);
  document.documentElement.addEventListener("mouseleave", handleExitIntent);
});

// Thank You Popup
document.addEventListener("DOMContentLoaded", () => {
  const thanksmodal = document.getElementById("thanksModal");
  const thankscloseBtn = thanksmodal.querySelector(".thanksform-close");

  // Close on close button click
  thankscloseBtn.addEventListener("click", () => {
    thanksmodal.style.display = "none";
  });

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === thanksmodal) {
      thanksmodal.style.display = "none";
    }
  });
});

// Footer Courses
// document.querySelectorAll("#coursesFooter .footer-bullets li").forEach(li => {
//   li.addEventListener("click", () => {
//     const matchedCourse = li.dataset.course;

//     // Set dropdown value
//     const courseSelect = document.getElementById("courseSelection");
//     courseSelect.value = matchedCourse;

//     // Set all select boxes with class "leadCourses"
//     document.querySelectorAll(".leadCourses").forEach(select => {
//       select.value = matchedCourse;
//     });

//     // Call filterCarts()
//     filterCarts();

//     // Scroll to section
//     // window.location.hash = "#courses";
//     document.querySelector("#courses").scrollIntoView({
//       behavior: "smooth"
//     });

//     // Show form modal after 2 seconds
//     setTimeout(() => {
//       document.getElementById("formModal").style.display = "flex";
//     }, 2000);
//   });
// });

function handleFooterClick(matchedCourse = null, specialization = null, university = null) {
  // Update course dropdowns if course is provided
if (matchedCourse) {
    document.getElementById("courseSelection").value = matchedCourse;
    document.querySelectorAll(".leadCourses").forEach(select => {
      select.value = matchedCourse;
      document.getElementById("universitySelection").value = "";
    });
    if (typeof populateFormSpecializations === "function") {
      populateFormSpecializations(matchedCourse);
    }
  }

  // Update specialization input if provided
  // if (specialization) {
  //   document.querySelectorAll(".leadSpecializations").forEach(input => {
  //     input.value = specialization;
  //     document.getElementById("universitySelection").value = "";
  //   });
  // }

// Update specialization input if provided
// if (specialization) {
//   // Remove "MBA in " prefix (case insensitive)
//   const cleanedSpecialization = specialization.replace(/^MBA in\s+/i, "").trim();

//   // Update all leadSpecializations inputs
//   document.querySelectorAll(".leadSpecializations").forEach(input => {
//     input.value = cleanedSpecialization;
//     document.getElementById("universitySelection").value = "";
//   });

//   // Check the corresponding checkbox if it exists
//   const checkbox = document.querySelector(`#specializationDropdown input[type="checkbox"][value="${cleanedSpecialization}"]`);
//   if (checkbox) {
//     checkbox.checked = true;
//   }
// }

// Update specialization input if provided
if (specialization) {
  // Remove "MBA in " prefix (case insensitive)
  const cleanedSpecialization = specialization.replace(/^MBA in\s+/i, "").trim();

  // Update all leadSpecializations inputs
  document.querySelectorAll(".leadSpecializations").forEach(input => {
    input.value = cleanedSpecialization;
    document.getElementById("universitySelection").value = "";
  });

  if (formSpecializationSelect) {
    const availableOption = Array.from(formSpecializationSelect.options).find(option => option.value === cleanedSpecialization);
    if (availableOption) {
      formSpecializationSelect.value = cleanedSpecialization;
    }
  }
}

  // Update university dropdown if provided
  if (university) {
    document.getElementById("universitySelection").value = university;
  }

  // Call filter function
  filterCarts();
  syncLeadFormFields();

  // Scroll to section
  document.querySelector("#courses").scrollIntoView({
    behavior: "smooth"
  });

  // Open the popup immediately
  document.getElementById("formModal").style.display = "flex";
}

// 1. Courses Footer (uses data-course attribute)
document.querySelectorAll("#coursesFooter .footer-bullets li").forEach(li => {
  li.addEventListener("click", () => {
    const matchedCourse = li.dataset.course;
    handleFooterClick(matchedCourse);
  });
});

// 2. Universities Footer (set university selection)
document.querySelectorAll("#universitiesFooter .footer-bullets li").forEach(li => {
  li.addEventListener("click", () => {
    document.getElementById("universitySelection").classList.remove("notShow");
    const university = li.textContent.trim();
    handleFooterClick(null, null, university);
  });
});

const footerApplyBtn = document.getElementById("footerApplyBtn");
if (footerApplyBtn) {
  footerApplyBtn.addEventListener("click", () => {
    document.getElementById("formModal").style.display = "flex";
  });
}

// Mobile Menu
const mobileMenu = document.getElementById("mobileMenu");
const menu = document.getElementById("menu");
const menuImg = mobileMenu.querySelector("img");

mobileMenu.addEventListener("click", () => {
  const isOpen = menu.style.display === "grid";

  if (isOpen) {
    menu.style.display = "none";
    menuImg.src = "images/icon-mobile-menu.webp";
    menuImg.style.maxWidth = "";
    menuImg.style.opacity = "";
  } else {
    menu.style.display = "grid";
    menuImg.src = "images/icon-cross.webp";
    menuImg.style.maxWidth = "60%";
    menuImg.style.opacity = "65%";
  }
});

// Nav Bar Links
window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const currentHash = window.location.hash;

    links.forEach(link => {
      const linkHash = new URL(link.href).hash; // Normalizes href like index.html#courses
      link.classList.toggle("active", linkHash === currentHash);
    });
  }

  updateActiveLink();
  window.addEventListener("hashchange", updateActiveLink);
});

// For Collecting extra form data(s)
function syncLeadFormFields() {
  // 1. Get selected mode value
  const selectedMode = document.getElementById("modeSelection").value;
  document.querySelectorAll(".leadMode").forEach(input => {
    input.value = selectedMode;
  });

  // 2. Get selected university value
  const selectedUniversity = document.getElementById("universitySelection").value;
  document.querySelectorAll(".leadUniversity").forEach(input => {
    input.value = selectedUniversity;
  });

  // 3. Get selected specialization from the form field
  const selectedSpecialization = document.querySelector('.lead-form .leadSpecializationChoice')?.value || "";
  document.querySelectorAll(".leadSpecializations").forEach(input => {
    input.value = selectedSpecialization;
  });
}

document.getElementById("modeSelection").addEventListener("change", syncLeadFormFields);
document.getElementById("universitySelection").addEventListener("change", syncLeadFormFields);

if (dropdown) {
  document.querySelectorAll('#specializationDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", syncLeadFormFields);
  });
}

// For Official UTM Links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".cart-area").forEach(cart => {
    const links = cart.querySelectorAll(".utm-univ-link");
    
    links.forEach(link => {
      if (link.getAttribute("href") === "") {
        link.classList.add("notShow");
      }
    });
  });
});

// UTM Tracking and Passing to another page
new URLSearchParams(location.search).forEach((v, k) =>
document.querySelectorAll(`input[name="${k}"]`).forEach(i => i.value = v)
);

const params = location.search;
document.querySelectorAll('a[href*="?"], a[href]:not([href*="?"])').forEach(a => {
const sep = a.href.includes('?') ? '&' : '?';
a.href += params.replace(/^\?/, '') ? sep + params.slice(1) : '';
});

// Send Data to Google Sheets
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll('.lead-form');

  forms.forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // prevent default form submission

      const formData = new FormData(form);
      const params = new URLSearchParams(window.location.search);
      const crmPayload = {
        name: formData.get("name") || "",
        mobile: formData.get("phone") || "",
        email: formData.get("email") || "",
        detail1: formData.get("course") || "",
        detail2: formData.get("state") || "",
        source: formData.get("source") || "",
        specialization: formData.get("specialization") || "",
        mode: formData.get("mode") || "",
        university: formData.get("university") || ""
      };

      // Append URL parameters to form data
      for (const [key, value] of params.entries()) {
        formData.append(key, value);
      }

      // Send lead to CRM in parallel with the other integrations
      const crmRequest = fetch('https://3092a01d-31a6-46a0-a092-11aa63948adc.neodove.com/integration/custom/7998e1da-c784-42b5-8967-02aa22f0447d/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(crmPayload)
      })
      .then(() => {
        console.log("Data sent to CRM");
      })
      .catch(error => {
        console.error("Error sending data to CRM:", error);
      });

      // Get the submit button with class .submit-button inside the form
      const submitBtn = form.querySelector(".submit-button");
      if (submitBtn) {
        submitBtn.textContent = "Submitting..."; // Change text
        submitBtn.disabled = true; // Optional: disable button
      }

      // Send data to Google Sheets
      const googleSheetsRequest = fetch('https://script.google.com/macros/s/AKfycbypzMXn4tLsdv0hMb-qGD7MjZDQEex_Z1zbcBsRsvxs-PD-6YcLXGG3WHjjMhPSkey8/exec', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        console.log("Data sent to Google Sheets");
      })
      .catch(error => {
        console.error("Error sending data to Google Sheets:", error);
      });

      // 2. Prepare and send to NeoDove
      const jsonData = {};
      for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
      }

      const neoDoveRequest = googleSheetsRequest.then(() => fetch('https://3092a01d-31a6-46a0-a092-11aa63948adc.neodove.com/integration/custom/dba06b4e-9078-4f34-be0a-a72a95809909/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }))
      .then(() => {
        console.log("Data sent to NeoDove");
      })
      .catch(error => {
        console.error("Error sending data to NeoDove:", error);
      });

      await Promise.allSettled([crmRequest, googleSheetsRequest, neoDoveRequest]);

      // Trigger Google Ads conversion event
      gtag_report_conversion();

      const thankYouUrl = new URL("thankyou.html", window.location.href);
      const name = formData.get("name") || "";
      const course = formData.get("course") || "";
      const university = formData.get("university") || "";

      if (name) thankYouUrl.searchParams.set("name", name);
      if (course) thankYouUrl.searchParams.set("course", course);
      if (university) thankYouUrl.searchParams.set("university", university);

      gtag_report_conversion(thankYouUrl.toString());
    });
  });
});
