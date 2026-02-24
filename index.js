// Data extracted from
const universityData = [
    { name: "Ankara University", app: "June 10-22, 2026", response: "3 Weeks", reg: "Aug 25-29, 2026", scholarship: "Türkiye Bursları" },
    { name: "Istanbul University", app: "July 7-18, 2026", response: "2-4 Weeks", reg: "Sept 1-5, 2026", scholarship: "YÖK Scholarships" },
    { name: "Marmara University", app: "June 20-30, 2026", response: "3 Weeks", reg: "Sept 1-12, 2026", scholarship: "Graduate Stipends" },
    { name: "Hacettepe University", app: "June 2-27, 2026", response: "4 Weeks", reg: "Aug 4-11, 2026", scholarship: "Türkiye Bursları" },
    { name: "METU (ODTÜ)", app: "June 2-July 9, 2026", response: "6 Weeks", reg: "Sept 1-5, 2026", scholarship: "Merit Reductions" },
    { name: "Ege University", app: "July 1-14, 2026", response: "2 Weeks", reg: "Aug 25-29, 2026", scholarship: "State-funded" },
    { name: "Dokuz Eylül", app: "July 7-Aug 20, 2026", response: "3 Weeks", reg: "Sept 1-12, 2026", scholarship: "Success Awards" },
    { name: "Gazi University", app: "June 23-Aug 1, 2026", response: "2 Weeks", reg: "Aug 25-29, 2026", scholarship: "Türkiye Bursları" },
    { name: "Karabük University", app: "June 5-Aug 15, 2026", response: "1 Week", reg: "Aug 18-22, 2026", scholarship: "Low Tuition" },
    { name: "Bursa Technical", app: "July 1-18, 2026", response: "3 Weeks", reg: "Sept 8-12, 2026", scholarship: "Technical Aid" },
    { name: "Akdeniz University", app: "Nov 24-Dec 24, 2026", response: "4 Weeks", reg: "Feb 2-6, 2027", scholarship: "Erasmus+" },
    { name: "Erciyes University", app: "June 15-July 10, 2026", response: "2 Weeks", reg: "Sept 1-5, 2026", scholarship: "Standard State" },
    { name: "Atatürk University", app: "July 1-11, 2026", response: "1 Week", reg: "Sept 1-5, 2026", scholarship: "Merit Support" }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. POPULATE & HIGHLIGHT TABLE ---
    const tableBody = document.getElementById('uniDataBody');
    const currentDate = new Date('2026-02-24'); // Current date logic

    universityData.forEach(uni => {
        const row = document.createElement('tr');
        
        // Date parsing to highlight upcoming registrations
        try {
            const regParts = uni.reg.split(' ');
            const month = regParts[0];
            const dayRange = regParts[1].split('-')[0];
            const year = uni.reg.split(', ')[1] || "2026";
            
            const regStartDate = new Date(`${month} ${dayRange}, ${year}`);
            
            // If the registration date is in the future, highlight row green
            if (regStartDate > currentDate) {
                row.classList.add('upcoming');
            }
        } catch(e) { console.error("Date parsing error for:", uni.name); }

        row.innerHTML = `
            <td class="fw-bold">${uni.name}</td>
            <td>${uni.app}</td>
            <td>${uni.response}</td>
            <td>${uni.reg}</td>
            <td><span class="badge bg-secondary">${uni.scholarship}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // --- 2. FAQ SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.accordion-item');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();

        faqItems.forEach(item => {
            const questionText = item.querySelector('.accordion-button').textContent.toLowerCase();
            const answerText = item.querySelector('.accordion-body').textContent.toLowerCase();

            if (questionText.includes(query) || answerText.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- 3. TABLE SORTING FUNCTION ---
function sortTable(n) {
    const table = document.getElementById("datesTable");
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc"; 
    
    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
