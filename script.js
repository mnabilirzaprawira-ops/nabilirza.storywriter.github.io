// Database Identitas (Raw Data)
const rawDefaultNames = [
    "Akane Yinara", "Diona Azalea", "Dionte Azalea", "Shenna Maheswari Yin", "Asmondia Zea Kalila", "Akane Naura Shenina",
    "Dionte Azka Mahardika", "Akane Ravindra Shena", "Kenzo Yuan Mahesa", "Arka Qinata Yin", "Akane Shankara", "Dionte Elvano",
    "Asmond Reynard", "Almond Reynard", "Yuan Alfarezel", "Muhammad Nabil Irza Prawira", "Nabil Irza Prawira", "Iriandis",
    "Nabil Irza Iriandis", "Balladeer", "Aira Chris Pratama", "Long Zhang", "Yin", "Yuratensei Nabil Al-Xan", "Nabil Izanagi Ardhana",
    "Yurizaen Nabil Kanzazena", "Nabil Auriel Kaneta", "Akari Hana", "Enzo Arashi", "Gasawa Imausha", "Myden XenZrar Hanzen Quaine",
    "Nyxie Seraphina Wijayal", "Rin Azumi", "Kurogame Akumu", "Yuratensei (Shinwa Kiyomi)", "Nabila Myden", "Nabil Innato",
    "Cyron Nabil I", "Shoyun Raiden", "Akari YuriXna", "Yuriza Rin Akumura I", "Rin Akumura II", "Konoe Akari", "Nailun Kanzazena",
    "Hanan Riandra Malik", "Kiran Harsa Latifa", "Ye Shulan", "Xe Zilin", "Xen Lin Mei", "Rin Kiyumi", "Rin Aneso", "Rin Yunzi",
    "Qixas", "Qinto Tantano", "Shinma Terano", "Ojulus", "Innama", "Hyana", "Imatusha", "Xinosa", "XenZen", "Nabil Kaneta Aridhana",
    "Vaneo Ardhana", "Yuriza III", "Nova Genevieve Prawira", "Kaesang Xylo Verdian", "Nabil Elrian Shinaka", "Kaneta Youra (Kiyan)",
    "Keira Vanesa Qing", "Nailun Al-Jazzera", "Akari Kaneta Yora (Yor)", "Sino Manito Aridhana", "Nabil Elnis Fausha", "Nabil Irianna Al-Syifa",
    "Kaesang Abimanyu", "Shentu Xian", "Nabil Irianna Al-Jazzera II", "Di-Sha Long", "Ardiansyah Al-Jazzera", "Kala La Jazzera III",
    "Nabil Dinasti Affan", "Nabil Felix F. M.", "Citra Wirasaba", "Ni-Tian Chrystal", "Yue Xin", "Wirasaba", "Leonardo", "Lien Hua",
    "Shentu Jue", "Akari Yoru", "Nabil Nozomi", "Nabil Shonwa", "Nabil Lhusfa", "Farhan Maulana", "Suci Al-Jazzera", "Ni-Tian Long",
    "Ni-Tian Lu", "Di-Sha Wan", "Xinmei", "Nabil Ayana", "Myden Nabil", "Nabil Han", "Suci Ramadhan", "Aida", "Nabil", "Fani Ferdiansyah", "Cyron II"
];

// Inisialisasi Storage
let vaultData = JSON.parse(localStorage.getItem('vaultNames_V2')) || rawDefaultNames.map(n => ({name: n, votes: Math.floor(Math.random()*20)}));

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function renderAllNames(data = vaultData) {
    const list = document.getElementById('all-names-list');
    list.innerHTML = data.map((item, i) => `
        <div class="name-item">
            <span>${item.name}</span>
            <button class="vote-btn" onclick="vote(${i})">${item.votes}</button>
        </div>
    `).join('');
}

function filterNames() {
    const q = document.getElementById('search-bar').value.toLowerCase();
    const filtered = vaultData.filter(i => i.name.toLowerCase().includes(q));
    renderAllNames(filtered);
}

function renderTopNames() {
    const list = document.getElementById('top-names-list');
    const sorted = [...vaultData].sort((a,b) => b.votes - a.votes).slice(0, 20);
    list.innerHTML = sorted.map((item, i) => `
        <div class="name-item">
            <span><b>#${i+1}</b> ${item.name}</span>
            <span style="color:var(--gold)">${item.votes} VP</span>
        </div>
    `).join('');
}

function vote(i) {
    vaultData[i].votes++;
    localStorage.setItem('vaultNames_V2', JSON.stringify(vaultData));
    renderAllNames();
    showToast("✨ Appreciated!");
}

// 🔐 ADMIN PROTOCOL
let clicks = 0; let isAdmin = false;
document.getElementById('secret-trigger').addEventListener('click', (e) => {
    clicks++;
    if(clicks === 4) {
        isAdmin = true; showToast("🔐 Admin Mode: Active");
    }
    setTimeout(() => { 
        if(clicks > 0 && clicks < 4 && !isAdmin) window.open("https://instagram.com/n4bilirzap.ip", "_blank");
        clicks = 0; 
    }, 400);
});

function submitNewName() {
    const name = document.getElementById('new-name').value.trim();
    if(!name) return showToast("Isi nama dulu!");
    
    if(isAdmin) {
        vaultData.push({name: name, votes: 0});
        localStorage.setItem('vaultNames_V2', JSON.stringify(vaultData));
        showToast("⚡ Admin Bypass: Sukses!");
        document.getElementById('new-name').value = "";
        return;
    }

    document.getElementById('process-dashboard').style.display = 'block';
    let pSec = 300; // 5 menit
    let tSec = 600; // 10 menit
    
    const interval = setInterval(() => {
        pSec--; tSec--;
        document.getElementById('fill-publish').style.width = ((300-pSec)/300*100) + "%";
        document.getElementById('fill-top').style.width = ((600-tSec)/600*100) + "%";
        
        if(pSec === 0) {
            vaultData.push({name: name, votes: 0});
            localStorage.setItem('vaultNames_V2', JSON.stringify(vaultData));
            showToast("✅ Vault Updated!");
        }
        if(tSec === 0) {
            clearInterval(interval);
            showToast("🏆 Sync Complete!");
            document.getElementById('new-name').value = "";
        }
    }, 1000);
}

// Start
renderAllNames();
