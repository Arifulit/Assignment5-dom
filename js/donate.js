// Get elements
const donateButton = document.getElementById('btn-add-money');
const currentBalanceElement = document.getElementById('current-balance');
const accountBalanceElement = document.getElementById('account-balance');
const inputAddMoneyElement = document.getElementById('input-add-money');
const modalContainer = document.getElementById('modal-container');
const closeModalButtons = document.querySelectorAll('.close-modal');

const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');
const btnDonation = document.getElementById('btn-donation');
const btnHistory = document.getElementById('btn-history');
const historyList = document.getElementById('history-list');

// Function to handle button activation
function activateButton(button) {
    // Remove active class from all buttons
    btnDonation.classList.remove('active');
    btnHistory.classList.remove('active');
    
    // Add active class to the clicked button
    button.classList.add('active');
}

// Show donation section and hide history
btnDonation.addEventListener('click', function () {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    activateButton(btnDonation);  // Activate the Donation button
});

// Show history section and hide donation
btnHistory.addEventListener('click', function () {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    activateButton(btnHistory);  // Activate the History button

    // Load history from localStorage
    loadHistory();
});

// Function to load history from localStorage
function loadHistory() {
    historyList.innerHTML = ''; // Clear previous history items

    const donations = JSON.parse(localStorage.getItem('donations')) || [];

    if (donations.length === 0) {
        historyList.innerHTML = '<li>No donations found.</li>';
    } else {
        donations.forEach(donation => {
            const listItem = document.createElement('li');
            listItem.className = "p-4 border rounded-lg shadow-md bg-gray-50";
            listItem.innerHTML = `
                <span class="text-black">${donation.amount} Taka is donated for famine-2024 at Feni, Bangladesh</span>
                <br><small class="text-gray-500">Date: ${donation.date}</small>`;
            historyList.appendChild(listItem);
        });
    }
}

// Handle Donate Now button click
donateButton.addEventListener('click', function () {
    const moneyValue = parseFloat(inputAddMoneyElement.value);

    if (isNaN(moneyValue) || moneyValue <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Get the current balances
    let currentBalance = parseFloat(currentBalanceElement.innerText);
    let accountBalance = parseFloat(accountBalanceElement.innerText);

    // Check if there's enough balance to donate
    if (moneyValue > currentBalance) {
        alert('You do not have enough money to donate.');
        return;
    }

    // Update the balances
    currentBalance -= moneyValue; // Subtract from current balance
    accountBalance += moneyValue;  // Add to account balance

    // Update the displayed balances
    currentBalanceElement.innerText = currentBalance.toFixed(2); // Update current balance
    accountBalanceElement.innerText = accountBalance.toFixed(2);   // Update account balance

    // Clear the input field after the action
    inputAddMoneyElement.value = '';

    // Create a donation object
    const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const donation = { amount: moneyValue, date: dateTime };

    // Save the donation to localStorage
    let donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));

    
    showModal();
});

// Show donation section by default
donationSection.classList.remove('hidden');
historySection.classList.add('hidden');

// Listen for scroll events to change navbar style
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-main');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled'); // Add class when scrolled
    } else {
        navbar.classList.remove('scrolled'); // Remove class when at top
    }
});

// Function to show modal
const showModal = () => {
    modalContainer.classList.remove('hidden');
};

// Function to close modal
const closeModal = () => {
    modalContainer.classList.add('hidden');
};

// Event listeners to close modal on button click or click outside the modal
closeModalButtons.forEach(closeBtn => closeBtn.addEventListener('click', closeModal));
modalContainer.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});












