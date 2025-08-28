const form = document.getElementById("voteForm");
const toast = document.getElementById("toast");

// Show toast message with optional type: "success" (green) or "error" (red)
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = "show";

  // Set color based on type
  toast.style.backgroundColor = type === "success" ? "#28a745" : "#e60000";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = document.getElementById("userId").value.trim();
  if (!userId) {
    showToast("Error: ID is required!", "error");
    return;
  }

  let votedIds = JSON.parse(localStorage.getItem("votedIds")) || [];
  if (votedIds.includes(userId)) {
    showToast("Error: This ID has already voted!", "error");
    return;
  }

  const positions = ["President", "Vice President", "Treasurer", "Secretary", "PIO"];
  let votes = JSON.parse(localStorage.getItem("votes")) || {};

  let allSelected = true;
  positions.forEach(position => {
    const choice = document.querySelector(`input[name="${position}"]:checked`);
    if (!choice) {
      allSelected = false;
    }
  });

  if (!allSelected) {
    showToast("Error: Please vote for all positions!", "error");
    return;
  }

  // Count votes
  positions.forEach(position => {
    const choice = document.querySelector(`input[name="${position}"]:checked`).value;
    if (!votes[position]) votes[position] = {};
    if (!votes[position][choice]) votes[position][choice] = 0;
    votes[position][choice]++;
  });

  votedIds.push(userId);

  // Save to localStorage
  localStorage.setItem("votes", JSON.stringify(votes));
  localStorage.setItem("votedIds", JSON.stringify(votedIds));

  showToast("Vote submitted successfully!", "success");
  form.reset();

  // Trigger storage event to update dashboard
  window.dispatchEvent(new Event("storage"));
});
