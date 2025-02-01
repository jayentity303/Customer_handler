
const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service you prefer
    auth: {
        user: 'e26386610@gmail.com',
        pass: '(Jayenity303)'
    }
});

// Function to send email
function sendEmail(email, subject, text) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// Show and hide sections
function showSection(sectionId) {
    document.querySelectorAll('.container, .home-container').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Toggle between light and dark modes
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    document.querySelector('.toggle-mode').textContent =
        body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Calculate Amount and Taxes
function calculateAmount() {
    const qty = parseFloat(document.getElementById('qty').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const amount = qty * rate;
    document.getElementById('amount').value = amount.toFixed(2);
    calculateTaxes();
}

function calculateTaxes() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const sgstRate = parseFloat(document.getElementById('sgst1').value) || 0;
    const cgstRate = parseFloat(document.getElementById('cgst1').value) || 0;
    const igstRate = parseFloat(document.getElementById('igst1').value) || 0;

    document.getElementById('sgst2').value = ((amount * sgstRate) / 100).toFixed(2);
    document.getElementById('cgst2').value = ((amount * cgstRate) / 100).toFixed(2);
    document.getElementById('igst2').value = ((amount * igstRate) / 100).toFixed(2);
}

// Submit Data
function submitData() {
    const table = document.getElementById('data-table').querySelector('tbody');
    const row = document.createElement('tr');

    const inputs = ['name', 'email', 'contact', 'product', 'unit', 'qty', 'rate', 'amount', 'sgst1', 'sgst2', 'cgst1', 'cgst2', 'igst1', 'igst2'];
    inputs.forEach(id => {
        const td = document.createElement('td');
        td.textContent = document.getElementById(id).value;
        row.appendChild(td);
    });

    const dateTd = document.createElement('td');
    dateTd.textContent = new Date().toLocaleString();
    row.appendChild(dateTd);

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('secondary-btn');
    deleteBtn.onclick = () => row.remove();
    deleteTd.appendChild(deleteBtn);
    row.appendChild(deleteTd);

    table.appendChild(row);
    showSection('show-data');
}

// Export data to Excel
function exportToExcel() {
    const table = document.getElementById('data-table');
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, 'data_records.xlsx');
}

// Show and close Send Data Modal
function showSendPopup() {
    document.getElementById('send-modal').style.display = 'flex';
}

function closeSendPopup() {
    document.getElementById('send-modal').style.display = 'none';
}

function showMessage(type, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    messageDiv.textContent = text;
    messageDiv.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    messageDiv.style.color = 'white';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

