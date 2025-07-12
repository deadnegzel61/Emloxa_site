// index.html ve kayit.html için giriş/kayıt buton işlevselliği
document.addEventListener('DOMContentLoaded', () => {
    // Giriş butonu
    const loginButton = document.querySelector('form .btn');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Formun varsayılan gönderimini engelle
            // Normalde burada kullanıcı adı/şifre doğrulaması yapılırdı.
            // Şimdilik doğrudan main.html'e yönlendiriyoruz.
            window.location.href = 'main.html';
        });
    }

    // Kayıt butonu (kayit.html sayfasında)
    const registerButton = document.querySelector('form .btn'); // Aynı selector, farklı sayfada
    if (registerButton && window.location.pathname.includes('kayit.html')) {
        registerButton.addEventListener('click', (e) => {
            e.preventDefault(); // Formun varsayılan gönderimini engelle
            // Normalde burada kayıt işlemi yapılırdı.
            // Şimdilik doğrudan main.html'e yönlendiriyoruz.
            window.location.href = 'main.html';
        });
    }

    // main.html için kanal seçim işlevselliği
    const channelList = document.querySelector('.channel-list');
    if (channelList) {
        channelList.addEventListener('click', (e) => {
            if (e.target.classList.contains('channel-item')) {
                // Tüm kanallardan aktif sınıfını kaldır
                document.querySelectorAll('.channel-item').forEach(item => {
                    item.classList.remove('active');
                });
                // Tıklanan kanala aktif sınıfını ekle
                e.target.classList.add('active');

                // Kanal başlığını güncelle (isteğe bağlı)
                const chatHeader = document.querySelector('.chat-header h2');
                if (chatHeader) {
                    chatHeader.textContent = e.target.textContent;
                }
            }
        });
    }
});
