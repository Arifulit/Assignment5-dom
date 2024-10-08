// Get elements
const donateButtons = document.querySelectorAll('.btn-add-money');
const inputAddMoneyElements = document.querySelectorAll('.input-add-money');
const accountBalances = document.querySelectorAll('.account-balance');
const currentBalanceElement = document.getElementById('current-balance');
const modalContainer = document.getElementById('modal-container');
const modalMessage = document.getElementById('modal-message');
const closeModalButtons = document.querySelectorAll('.close-modal');

const donationSection = document.querySelector('.donation-section');
const historySection = document.getElementById('history-section');
const btnDonation = document.getElementById('btn-donation');
const btnHistory = document.getElementById('btn-history');
const historyList = document.getElementById('history-list');


// Function to handle button activation
function activateButton(button) {
    btnDonation.classList.remove('active');
    btnHistory.classList.remove('active');
    button.classList.add('active');
}

// Show donation section and hide history
btnDonation.addEventListener('click', function () {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    activateButton(btnDonation);  
  });

// Show history section and hide donation
btnHistory.addEventListener('click', function () {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    activateButton(btnHistory);  
    loadHistory();
});


// Function to load history from localStorage
function loadHistory() {
    historyList.innerHTML = ''; 
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    if (donations.length === 0) {
        historyList.innerHTML = '<li>No donations found.</li>';
     } else {
        donations.forEach(donation => {
            const listItem = document.createElement('li');
            listItem.className = "p-4 border rounded-lg shadow-md bg-gray-50";
            listItem.innerHTML = `
                <span class="text-black font-bold">${donation.amount} Taka is donated for famine-2024 at Feni, Bangladesh</span>
                <br><small class="text-gray-500">Date: ${donation.date} GMT +0600 (Bangladesh Standard Time) </small>`;
            historyList.appendChild(listItem);
        });
    }
}

// Handle Donate Now button click for each card
donateButtons.forEach((donateButton, index) => {
    donateButton.addEventListener('click', function () {
        const moneyValue = parseFloat(inputAddMoneyElements[index].value);
        const accountBalanceElement = accountBalances[index];

        if (isNaN(moneyValue) || moneyValue <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        let currentBalance = parseFloat(currentBalanceElement.innerText);
        let accountBalance = parseFloat(accountBalanceElement.innerText);

        if (moneyValue > currentBalance) {
            alert('You do not have enough money to donate.');
            return;
        }

        currentBalance -= moneyValue; 
        accountBalance += moneyValue; 

        currentBalanceElement.innerText = currentBalance.toFixed(2); 
        accountBalanceElement.innerText = accountBalance.toFixed(2);   
        inputAddMoneyElements[index].value = '';

        const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
        const donation = { amount: moneyValue, date: dateTime };

        let donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push(donation);
        localStorage.setItem('donations', JSON.stringify(donations));

        showModal();
    });
});

donationSection.classList.remove('hidden');
historySection.classList.add('hidden');

// Listen for scroll events to change navbar style
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-main');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled'); 
    } else {
        navbar.classList.remove('scrolled'); 
    }
});

// Function to show modal
const showModal = () => {
    modalContainer.classList.remove('hidden');
};

const closeModal = () => {
    modalContainer.classList.add('hidden');
};

closeModalButtons.forEach(closeBtn => closeBtn.addEventListener('click', closeModal));
modalContainer.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
