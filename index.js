// Data compiled from
const universityData = [
    { name: "Ankara University", app: "June 10-22, 2026", response: "3 Weeks", reg: "Aug 25-29, 2026", scholarship: "Türkiye Bursları" },
    { name: "Istanbul University", app: "July 7-18, 2026", response: "2-4 Weeks", reg: "Sept 1-5, 2026", scholarship: "YÖK Scholarships" },
    { name: "Marmara University", app: "June 20-30, 2026", response: "3 Weeks", reg: "Sept 1-12, 2026", scholarship: "Graduate Stipends" },
    { name: "Hacettepe University", app: "June 2-27, 2026", response: "4 Weeks", reg: "Aug 4-11, 2026", scholarship: "Türkiye Bursları" },
    { name: "Karabük University", app: "June 5-Aug 15, 2026", response: "1 Week", reg: "Aug 18-22, 2026", scholarship: "Low Tuition" },
    { name: "Akdeniz University", app: "Nov 24-Dec 24, 2026", response: "4 Weeks", reg: "Feb 2-6, 2027", scholarship: "Erasmus+" }
];

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('uniDataBody');
    const currentDate = new Date('2026-02-24');

    // Populate Table
    universityData.forEach(uni => {
        const row = document.createElement('tr');
        
        // Logic to highlight upcoming registrations
        const regMonth = uni.reg.split(' ')[0];
        const regDay = uni.reg.split(' ')[1].split('-')[0];
        const regYear = uni.reg.split(', ')[1] || "2026";
        const regDate = new Date(`${regMonth} ${regDay}, ${regYear}`);

        if (regDate > currentDate) { row.classList.add('upcoming'); }

        row.innerHTML = `<td>${uni.name}</td><td>${uni.app}</td><td>${uni.response}</td><td>${uni.reg}</td><td>${uni.scholarship}</td>`;
        tableBody.appendChild(row);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

// Table Sorting Function
function sortTable(n) {
    let table = document.getElementById("datesTable");
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
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) { shouldSwitch = true; break; }
            } else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) { shouldSwitch = true; break; }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") { dir = "desc"; switching = true; }
        }
    }
}
