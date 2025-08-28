function updateResults() {
  const votes = JSON.parse(localStorage.getItem("votes")) || {};
  const positions = ["President", "Vice President", "Treasurer", "Secretary", "PIO"];

  positions.forEach(position => {
    for (const candidate in votes[position]) {
      const span = document.getElementById(`${position}-${candidate}`);
      if (span) {
        span.textContent = votes[position][candidate];
      }
    }
  });
}

window.addEventListener("storage", () => {
  setTimeout(updateResults, 100);
});

updateResults();
