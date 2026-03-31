// 🌟 Exact list from Nabil
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

// System Storage
let defaultNames = JSON.parse(localStorage.getItem('vaultNamesLiquidV1'));
if (!defaultNames) {
    defaultNames = rawDefaultNames.map(name => ({
        name: name,
        votes: Math.floor(Math.random() * 50) + 10
    }));
    localStorage.setItem('vaultNamesLiquidV1', JSON.stringify(defaultNames));
}

// Custom Toast Function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

// Navigation
window.showSection = function(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    if(sectionId !== 'all-names-section') {
        document.getElementById('search-bar').value = "";
    }
}

// Render Names
window.renderAllNames = function(filteredArray = defaultNames) {
    const listDiv = document.getElementById('all-names-list');
    listDiv.innerHTML = '';

    filteredArray.forEach((item, i) => {
        const originalIndex = defaultNames.findIndex(n => n.name === item.name);
        const div = document.createElement('div');
        div.className = 'name-item';
        div.style.animationDelay = `${i * 0.05}s`;
        div.innerHTML = `
            <span style="font-weight:600; font-size:1.1rem">${item.name}</span>
            <button class="vote-btn" onclick="voteName(${originalIndex})">Appreciate (${item.votes})</button>
        `;
        listDiv.appendChild(div);
    });
}

window.filterNames = function() {
    const searchVal = document.getElementById('search-bar').value.toLowerCase();
    const filtered = defaultNames.filter(item => item.name.toLowerCase().includes(searchVal));
    renderAllNames(filtered);
}

window.renderTopNames = function() {
    const listDiv = document.getElementById('top-names-list');
    listDiv.innerHTML = '';
    const sortedNames = [...defaultNames].sort((a, b) => b.votes - a.votes).slice(0, 50);
    
    sortedNames.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'name-item';
        div.style.animationDelay = `${index * 0.05}s`;
        
        let rankColor = "var(--text-muted)";
        if (index === 0) rankColor = "#ffd700"; 
        else if (index === 1) rankColor = "#c0c0c0"; 
        else if (index === 2) rankColor = "#cd7f32"; 

        div.innerHTML = `
            <span style="font-weight:600; font-size: 1.1rem;">
                <span style="color:${rankColor}; margin-right:10px; font-weight:800;">#${index + 1}</span> 
                ${item.name}
            </span>
            <span style="color: var(--gold); font-size: 0.9rem; font-weight:800;">${item.votes} VP</span>
        `;
        listDiv.appendChild(div);
    });
}

window.voteName = function(index) {
    defaultNames[index].votes += 1;
    localStorage.setItem('vaultNamesLiquidV1', JSON.stringify(defaultNames));
    showToast(`✨ Appreciated: ${defaultNames[index].name}`);
    
    const searchVal = document.getElementById('search-bar').value;
    if(searchVal !== "") { filterNames(); } else { renderAllNames(); }
}


// 🔐 SECRET ADMIN OVERRIDE PROTOCOL 🔐
let secretClicks = 0;
let secretTimeout;
let isAdmin = false;

window.handleSecretClick = function(e) {
    e.preventDefault(); 
    secretClicks++;
    clearTimeout(secretTimeout);

    if(secretClicks >= 4) {
        isAdmin = true;
        showToast("🔐 SYSTEM OVERRIDE: Admin Mode Engaged.");
        secretClicks = 0;
    } else {
        secretTimeout = setTimeout(() => {
            if (secretClicks > 0 && secretClicks < 4 && !isAdmin) {
                window.open("https://instagram.com/n4bilirzap.ip", "_blank");
            }
            secretClicks = 0; 
        }, 400); 
    }
}


// Submit Logic with Progress Bars & Admin Bypass
let isProcessing = false;

window.submitNewName = function() {
    if(isProcessing) {
        showToast("⚠️ Protokol sedang berjalan!");
        return;
    }

    const nameInput = document.getElementById('new-name');
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        showToast("⚠️ Identitas tidak boleh kosong!");
        return;
    }

    // CEK ADMIN MODE
    if (isAdmin) {
        showToast(`⚡ ADMIN BYPASS: ${nameValue} langsung dipublikasi!`);
        defaultNames.push({ name: nameValue, votes: 0 });
        localStorage.setItem('vaultNamesLiquidV1', JSON.stringify(defaultNames));
        nameInput.value = "";
        return; 
    }

    // USER BIASA (Ada Delay)
    isProcessing = true;
    document.getElementById('process-dashboard').style.display = 'block';
    document.getElementById('waiting-msg').style.display = 'block';

    // Constants
    const totalPublishTime = 5 * 60; // 5 menit
    const totalTopTime = 10 * 60;    // 10 menit
    
    let publishSeconds = totalPublishTime;
    let topSeconds = totalTopTime;

    const timePublishEl = document.getElementById('time-publish');
    const timeTopEl = document.getElementById('time-top');
    const fillPublishEl = document.getElementById('fill-publish');
    const fillTopEl = document.getElementById('fill-top');

    // Reset widths
    fillPublishEl.style.width = '0%';
    fillTopEl.style.width = '0%';

    showToast("⏳ Menambahkan ke antrean...");

    const interval = setInterval(() => {
        publishSeconds--;
        topSeconds--;

        // Publish Update
        if (publishSeconds >= 0) {
            const m = Math.floor(publishSeconds / 60);
            const s = publishSeconds % 60;
            timePublishEl.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            fillPublishEl.style.width = `${((totalPublishTime - publishSeconds) / totalPublishTime) * 100}%`;
        }

        if (publishSeconds === 0) {
            timePublishEl.innerText = "SELESAI";
            timePublishEl.style.color = "#00f5ff";
            defaultNames.push({ name: nameValue, votes: 0 });
            localStorage.setItem('vaultNamesLiquidV1', JSON.stringify(defaultNames));
            showToast(`✅ ${nameValue} berhasil ditambahkan ke Vault Utama!`);
        }

        // Top Update
        if (topSeconds >= 0) {
            const m = Math.floor(topSeconds / 60);
            const s = topSeconds % 60;
            timeTopEl.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            fillTopEl.style.width = `${((totalTopTime - topSeconds) / totalTopTime) * 100}%`;
        }

        if (topSeconds === 0) {
            timeTopEl.innerText = "SELESAI";
            timeTopEl.style.color = "#00f5ff";
            showToast(`🏆 ${nameValue} sudah masuk ke Papan Peringkat!`);
            clearInterval(interval);
            isProcessing = false;
            nameInput.value = "";
            document.getElementById('waiting-msg').innerText = "✅ Semua proses sinkronisasi selesai.";
            document.getElementById('waiting-msg').style.color = "var(--gold)";
        }
    }, 1000);
}
