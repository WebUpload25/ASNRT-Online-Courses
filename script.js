const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script Loaded Successfully!");

  // 🏷️ ট্যাব পরিবর্তনের ফাংশন
  window.showTab = function (tabId) {
    console.log(`🔄 Switched to tab: ${tabId}`);
    document.querySelectorAll(".tab").forEach(tab => {
      tab.style.display = "none";
    });

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.style.display = "block";
      console.log(`✅ Showing tab: ${tabId}`);
    } else {
      console.error(`❌ Tab ${tabId} not found!`);
    }
  };

  // 🎯 কোর্স ডিটেইলস দেখানো
  document.querySelectorAll(".course-btn").forEach(button => {
    button.addEventListener("click", function () {
      const courseName = this.getAttribute("data-course");
      console.log(`📌 ${courseName} কোর্সের বাটনে ক্লিক করা হয়েছে!`);
  
      const courseInfo = {
        'ওয়েব ডেভেলপমেন্ট': {
          description: `এই কোর্সে আপনি শিখবেন কীভাবে প্রফেশনাল ওয়েবসাইট তৈরি করতে হয়।`,
          topics: ['HTML, CSS, এবং JavaScript', 'রেস্পন্সিভ ডিজাইন (Mobile Friendly)', 'ফ্রেমওয়ার্ক: Bootstrap, Tailwind', 'রিয়েল প্রজেক্ট তৈরি'],
          duration: '৬ মাস',
          suitable: 'একদম নতুনদের জন্য',
          fee: '৳৫,০০০',
          video: 'videos/Front-End Developer Roadmap - From Novice to Front-End Expert.mp4'
        },
  
        'গ্রাফিক ডিজাইন': {
          description: `ক্রিয়েটিভ ডিজাইনের জগতে প্রথম পা রাখতে চাইলে এই কোর্স আপনার জন্য।`,
          topics: ['Photoshop ও Illustrator', 'লোগো, পোস্টার ও সোশ্যাল মিডিয়া ডিজাইন', 'UI/UX ডিজাইন বেসিক', 'Fiverr & Upwork Tips'],
          duration: '৩ মাস',
          suitable: 'যারা ডিজাইন ভালোবাসেন',
          fee: '৳৩,৫০০',
          video: 'videos/Roadmap to Web Development - for Students.mp4'
        },
  
        'ডিজিটাল মার্কেটিং': {
          description: `এখানে আপনি শিখবেন কীভাবে প্রোডাক্ট বা সার্ভিস অনলাইনে মার্কেট করতে হয়।`,
          topics: ['Facebook & Instagram Marketing', 'Google Ads ও SEO', 'Email Marketing & Funnels', 'কনটেন্ট স্ট্র্যাটেজি ও অ্যানালিটিক্স'],
          duration: '৩ মাস',
          suitable: 'যারা ফ্রিল্যান্সিং বা ব্যবসা করতে চান',
          fee: '৳৪,৯৯৯',
          video: 'videos/Front-End Developer Roadmap - From Novice to Front-End Expert.mp4'
        },
  
        'অফিস অ্যাপলিকেশন': {
          description: `Microsoft Office অ্যাপ্লিকেশনগুলোতে দক্ষতা অর্জন করতে শিখবেন।`,
          topics: ['Microsoft Word, Excel, PowerPoint', 'Data Analysis & Reporting', 'Advanced Excel & Formulas'],
          duration: '৩ মাস',
          suitable: 'অফিস কাজের জন্য যারা দক্ষ হতে চান',
          fee: '৳২,৯৯৯',
          video: 'videos/Roadmap to Web Development - for Students.mp4'
        },
  
        'ডাটাবেস ম্যানেজমেন্ট': {
          description: `ডাটাবেস ডিজাইন এবং ম্যানেজমেন্ট শিখে আপনি নিজের ক্যারিয়ার তৈরি করতে পারবেন।`,
          topics: ['SQL & Database Design', 'Microsoft Access & MySQL', 'Data Backup & Security'],
          duration: '৩ মাস',
          suitable: 'যারা ডাটাবেস অ্যাডমিনিস্ট্রেশন শিখতে চান',
          fee: '৳৩,৯৯৯',
          video: 'videos/Front-End Developer Roadmap - From Novice to Front-End Expert.mp4'
        },
  
        'লার্নিং ইংলিশ': {
          description: `ইংলিশ ভাষার কোর্স যেখানে আপনি ইংলিশে দক্ষ হয়ে উঠবেন।`,
          topics: ['Basic to Advanced English Grammar', 'Speaking & Writing Skills', 'Professional Email Writing'],
          duration: '৬ মাস',
          suitable: 'যারা ইংলিশে দক্ষ হতে চান',
          fee: '৳৪,৯৯৯',
          video: 'videos/Roadmap to Web Development - for Students.mp4'
        }
      };
  
      const course = courseInfo[courseName];
  
      if (course) {
        document.getElementById("course-title").innerText = courseName;
  
        // কোর্স বর্ণনা
        document.getElementById("course-description").innerHTML = `
          <p>${course.description}</p>
          <p><b>⏳ কোর্স সময়কাল:</b> ${course.duration}</p>
          <p><b>🎓 উপযুক্ত:</b> ${course.suitable}</p>
          <p><b>💸 কোর্স ফি:</b> ${course.fee}</p>
        `;
  
        // টপিক লিস্ট
        const topicsList = document.getElementById("course-topics");
        topicsList.innerHTML = "";
        course.topics.forEach(topic => {
          const li = document.createElement("li");
          li.textContent = `✅ ${topic}`;
          topicsList.appendChild(li);
        });
  
        // ভিডিও যোগ করা
        document.getElementById("course-video-container").innerHTML = `
          <h4>🎥 রেকর্ডেড ভিডিও:</h4>
          <video width="100%" height="380" controls>
            <source src="${course.video}" type="video/mp4">
            আপনার ব্রাউজার ভিডিও চালাতে পারছে না।
          </video>
        `;
  
        console.log("✅ কোর্সের তথ্য আপডেট হয়েছে!");
        showTab("course-details");
  
      } else {
        console.error(`❌ ${courseName} কোর্সের তথ্য পাওয়া যায়নি!`);
      }
    });
  });
  
  // 🔙 "কোর্সে ফিরে যান" বাটনের ইভেন্ট হ্যান্ডলার
  document.getElementById("course-details").querySelector("button").addEventListener("click", function () {
    console.log("🔙 কোর্স লিস্টে ফিরে যাওয়া হচ্ছে...");
    showTab("courses");
  });

  // 🔰 প্রথমে শুধু হোম সেকশন দেখানো
  showTab("home");
});

// 📥 নিবন্ধন প্রক্রিয়া
const registerForm = document.getElementById('register-form');

registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const gender = document.getElementById('gender').value;
    const preferredCourse = document.getElementById('preferred-course').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // ✅ ইনপুট যাচাই
    if (name.length < 3) {
        alert("⚠️ নাম কমপক্ষে ৩ অক্ষরের হতে হবে!");
        return;
    }

    // ✅ বৈধ ইমেইল যাচাই
    if (!email.includes("@") || !email.includes(".")) {
        alert("❌ বৈধ ইমেইল লিখুন!");
        return;
    }

    // ✅ পাসওয়ার্ড যাচাই
    if (password.length < 6) {
        alert("🔑 পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
        return;
    }

    // ✅ পাসওয়ার্ড মিল যাচাই
    if (password !== confirmPassword) {
        alert('❌ পাসওয়ার্ড মিলছে না!');
        return;
    }

    // ✅ ফোন নম্বর যাচাই
    if (!phone.match(/^\+?[0-9]{10,15}$/)) {
        alert("❌ সঠিক ফোন নম্বর দিন!");
        return;
    }

    // ✅ জন্ম তারিখ যাচাই
    if (!dob) {
        alert("❌ জন্ম তারিখ দিন!");
        return;
    }

    // 🔄 ফর্ম সাবমিট করার জন্য ডাটা প্রস্তুত
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("preferredCourse", preferredCourse);
    formData.append("password", password);
    formData.append("confirm-password", confirmPassword); // Optional, if needed for further validation

    try {
        const response = await fetch("register.php", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
      alert(`🎉 ${name}, আপনার নিবন্ধন সফল হয়েছে!`);
      registerForm.reset();
      showTab('login');
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    console.error("❌ নিবন্ধন ত্রুটি:", error);
    alert("⚠️ সার্ভার সংযোগ সমস্যা! পরে আবার চেষ্টা করুন।");
  }
});


// 🔑 লগইন প্রক্রিয়া
const loginForm = document.getElementById('login-form');

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await fetch("login.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert(`🎉 স্বাগতম, ${result.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(result.user));

      // প্রোফাইল তথ্য আপডেট
      document.getElementById('profile-name').textContent = result.user.name;
      document.getElementById('profile-email').textContent = result.user.email;
      document.getElementById('profile-course').textContent = result.user.preferredCourse;

      showTab('profile'); // প্রোফাইল পেজে নিয়ে যাবে
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    console.error("❌ লগইন ত্রুটি:", error);
    alert("⚠️ সার্ভার সংযোগ সমস্যা! পরে আবার চেষ্টা করুন।");
  }
});


// 🚪 লগআউট ফাংশন
document.getElementById('logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem("loggedInUser");
  alert("🚪 আপনি লগআউট করেছেন!");
  showTab('login');
});
