const scriptURL = 'https://script.google.com/macros/s/AKfycbxiAmU9FC3tiabRH4GrEJGfbhLDsei8lyO6Ss9gInE8l_8jMuFDmRRfTJirgD9xfsUD/exec';
const form = document.getElementById('complaintForm');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('statusMessage');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = 'Mengirim...';
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            btn.disabled = false;
            btn.innerText = 'Kirim Keluhan';
            msg.classList.remove('hidden', 'error');
            msg.classList.add('success');
            msg.innerText = 'Terima kasih! Keluhan Anda telah terkirim.';
            form.reset();
        })
        .catch(error => {
            btn.disabled = false;
            btn.innerText = 'Kirim Keluhan';
            msg.classList.remove('hidden', 'success');
            msg.classList.add('error');
            msg.innerText = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
            console.error('Error!', error.message);
        });
});
