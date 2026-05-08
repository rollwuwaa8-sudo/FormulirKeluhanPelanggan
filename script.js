const scriptURL = 'https://script.google.com/macros/s/AKfycbxiAmU9FC3tiabRH4GrEJGfbhLDsei8lyO6Ss9gInE8l_8jMuFDmRRfTJirgD9xfsUD/exec';
const form = document.getElementById('complaintForm');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('statusMessage');
const resultDisplay = document.getElementById('resultDisplay');
const summaryContent = document.getElementById('summaryContent');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = 'Mengirim...';
    
    // Ambil data dari form untuk ditampilkan nanti
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
            btn.disabled = false;
            btn.innerText = 'Kirim Keluhan';
            
            // Sembunyikan form dan tampilkan pesan sukses
            form.classList.add('hidden');
            msg.classList.remove('hidden');
            msg.classList.add('success');
            msg.innerText = 'Terima kasih! Keluhan Anda telah terkirim.';

            // Tampilkan data yang baru saja dikirim
            resultDisplay.classList.remove('hidden');
            summaryContent.innerHTML = `
                <ul style="list-style: none; padding: 0; text-align: left;">
                    <li><strong>Nama:</strong> ${dataObj.nama}</li>
                    <li><strong>Email:</strong> ${dataObj.email}</li>
                    <li><strong>Kategori:</strong> ${dataObj.kategori}</li>
                    <li><strong>Pesan:</strong> ${dataObj.pesan}</li>
                </ul>
            `;
        })
        .catch(error => {
            btn.disabled = false;
            btn.innerText = 'Kirim Keluhan';
            msg.classList.remove('hidden');
            msg.classList.add('error');
            msg.innerText = 'Maaf, terjadi kesalahan.';
            console.error('Error!', error.message);[cite: 3]
        });
});
