const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let budgetChart = null;

// Initialize chart when page loads
window.onload = function () {
  const ctx = document.getElementById("budgetChart").getContext("2d");

  budgetChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: Array(12).fill(0),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: Array(12).fill(0),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += "$" + context.parsed.y.toLocaleString();
              return label;
            },
          },
        },
      },
    },
  });

  // Add event listener to update chart when Chart tab is shown
  const chartTab = document.getElementById("chart-tab");
  chartTab.addEventListener("shown.bs.tab", function () {
    updateChart();
  });

  // Add event listener for download button
  const downloadBtn = document.getElementById("downloadChartBtn");
  downloadBtn.addEventListener("click", downloadChartAsImage);

  // Add event listener for username form submission
  const usernameForm = document.getElementById("usernameForm");
  usernameForm.addEventListener("submit", handleUsernameSubmit);

  // Initialize chart with current input values
  updateChart();
};

// Function to get all input values and update the chart
function updateChart() {
  const incomeData = [];
  const expenseData = [];

  const monthAbbrev = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  monthAbbrev.forEach((month) => {
    const incomeValue =
      parseFloat(document.getElementById(`income-${month}`).value) || 0;
    const expenseValue =
      parseFloat(document.getElementById(`expense-${month}`).value) || 0;

    incomeData.push(incomeValue);
    expenseData.push(expenseValue);
  });

  // Update chart data
  budgetChart.data.datasets[0].data = incomeData;
  budgetChart.data.datasets[1].data = expenseData;
  budgetChart.update();
}

// Function to handle username form submission
function handleUsernameSubmit(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const username = usernameInput.value;

  // Username validation regex pattern
  const usernamePattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

  // Check if existing message element exists, otherwise create one
  let messageDiv = document.getElementById("usernameMessage");
  if (!messageDiv) {
    messageDiv = document.createElement("div");
    messageDiv.id = "usernameMessage";
    messageDiv.className = "mt-3";
    usernameInput.parentElement.appendChild(messageDiv);
  }

  // Validate username against pattern
  if (usernamePattern.test(username)) {
    messageDiv.className = "alert alert-success mt-3";
    messageDiv.innerHTML = `<strong>Success!</strong> Username "${username}" is valid and has been accepted.`;
    usernameInput.classList.remove("is-invalid");
    usernameInput.classList.add("is-valid");
  } else {
    messageDiv.className = "alert alert-danger mt-3";
    messageDiv.innerHTML = `<strong>Invalid Username!</strong> Please ensure your username contains at least 1 uppercase letter, 1 number, 1 special character (@$!%*?&), and is at least 5 characters long.`;
    usernameInput.classList.remove("is-valid");
    usernameInput.classList.add("is-invalid");
  }
}

// Function to download chart as image
function downloadChartAsImage() {
  // Get the canvas element
  const canvas = document.getElementById("budgetChart");

  // Convert canvas to data URL (PNG format)
  const imageURL = canvas.toDataURL("image/png");

  // Create a temporary link element
  const downloadLink = document.createElement("a");
  downloadLink.href = imageURL;

  // Set the filename with current date
  const currentDate = new Date().toISOString().split("T")[0];
  downloadLink.download = `budget-chart-${currentDate}.png`;

  // Trigger the download
  downloadLink.click();
}

// Export functions for testing (Node.js environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    updateChart,
    handleUsernameSubmit,
    downloadChartAsImage,
    months,
  };
}
