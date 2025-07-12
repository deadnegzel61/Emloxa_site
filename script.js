document.addEventListener('DOMContentLoaded', () => {
    // --- Genel Fonksiyonlar ---

    // Rastgele 4 haneli sayı üretir
    const generateRandomTag = () => Math.floor(1000 + Math.random() * 9000);

    // Sayfa Yönlendirme İşlevselliği (index.html ve kayit.html için)
    const setupAuthButtons = () => {
        const loginButton = document.querySelector('form .btn');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Normalde burada kullanıcı adı/şifre doğrulaması yapılır.
                // Basit bir simülasyon için kullanıcı adını "Emloxa" olarak set edip yönlendiriyoruz.
                localStorage.setItem('currentUser', 'Emloxa');
                localStorage.setItem('currentUserTag', generateRandomTag());
                window.location.href = 'main.html';
            });
        }

        const registerButton = document.querySelector('form .btn');
        if (registerButton && window.location.pathname.includes('kayit.html')) {
            registerButton.addEventListener('click', (e) => {
                e.preventDefault();
                // Normalde burada kayıt işlemi yapılır.
                // Basit bir simülasyon için kullanıcı adını "Emloxa" olarak set edip yönlendiriyoruz.
                const usernameInput = document.getElementById('username');
                const desiredUsername = usernameInput ? usernameInput.value : 'Emloxa'; // Kullanıcı girmişse onu al
                localStorage.setItem('currentUser', desiredUsername);
                localStorage.setItem('currentUserTag', generateRandomTag());
                window.location.href = 'main.html';
            });
        }
    };

    // --- main.html Özel İşlevsellikleri ---
    const setupMainPage = () => {
        const displayUsername = document.getElementById('displayUsername');
        const channelList = document.querySelector('.channel-list');
        const addFriendButton = document.querySelector('.add-friend-button');
        const addFriendInputArea = document.querySelector('.add-friend-input-area');
        const addFriendInput = document.getElementById('addFriendInput');
        const sendFriendRequestBtn = document.getElementById('sendFriendRequestBtn');
        const chatHeaderTitle = document.getElementById('chatHeaderTitle');
        const messageInput = document.getElementById('messageInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');
        const messageArea = document.querySelector('.message-area');

        // 1. Kullanıcı Adı ve Rastgele Etiketi Ayarlama
        const currentUser = localStorage.getItem('currentUser') || 'KullanıcıAdı';
        const currentUserTag = localStorage.getItem('currentUserTag') || generateRandomTag();
        if (displayUsername) {
            displayUsername.textContent = `${currentUser}#${currentUserTag}`;
        }

        // 2. Kanal Seçim İşlevselliği
        if (channelList) {
            channelList.addEventListener('click', (e) => {
                if (e.target.classList.contains('channel-item')) {
                    document.querySelectorAll('.channel-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');

                    if (chatHeaderTitle) {
                        // Eğer data-type "friend" ise özel mesaj gibi göster
                        if (e.target.dataset.type === 'friend') {
                            chatHeaderTitle.textContent = `@${e.target.textContent}`;
                        } else {
                            chatHeaderTitle.textContent = `#${e.target.textContent}`;
                        }
                    }
                }
            });
        }

        // 3. Arkadaş Ekleme Butonu İşlevselliği
        if (addFriendButton && addFriendInputArea) {
            addFriendButton.addEventListener('click', () => {
                addFriendInputArea.style.display = addFriendInputArea.style.display === 'none' ? 'flex' : 'none';
                addFriendInput.focus(); // Input açılınca odaklan
            });
        }

        // 4. Arkadaş Ekleme İşlevi
        if (sendFriendRequestBtn && addFriendInput && channelList) {
            sendFriendRequestBtn.addEventListener('click', () => {
                const friendUsername = addFriendInput.value.trim();
                if (friendUsername) {
                    // Simülasyon: Arkadaşı listeye ekle
                    const newFriendItem = document.createElement('li');
                    newFriendItem.classList.add('channel-item');
                    newFriendItem.dataset.type = 'friend'; // Arkadaş olduğunu belirtmek için
                    newFriendItem.textContent = friendUsername;
                    channelList.appendChild(newFriendItem);
                    
                    addFriendInput.value = ''; // Input'u temizle
                    addFriendInputArea.style.display = 'none'; // Alanı gizle

                    // Yeni eklenen arkadaşı aktif yap
                    document.querySelectorAll('.channel-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    newFriendItem.classList.add('active');
                    chatHeaderTitle.textContent = `@${friendUsername}`; // Başlığı güncelle
                    messageArea.innerHTML = ''; // Sohbet alanını temizle

                    alert(`${friendUsername} arkadaş olarak eklendi! (Bu sadece bir simülasyondur)`);
                } else {
                    alert('Lütfen bir kullanıcı adı girin.');
                }
            });
        }

        // 5. Mesaj Gönderme İşlevselliği (Basit Simülasyon)
        if (sendMessageBtn && messageInput && messageArea) {
            const addMessage = (author, text, isOwn = false) => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                if (isOwn) {
                    messageDiv.classList.add('own-message');
                }

                const messageAvatar = document.createElement('div');
                messageAvatar.classList.add('message-avatar');

                const messageContent = document.createElement('div');
                messageContent.classList.add('message-content');

                const messageAuthorDiv = document.createElement('div');
                messageAuthorDiv.classList.add('message-author');
                messageAuthorDiv.textContent = author;

                const messageTimeSpan = document.createElement('span');
                messageTimeSpan.classList.add('message-time');
                messageTimeSpan.textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

                messageAuthorDiv.appendChild(messageTimeSpan);

                const messageTextDiv = document.createElement('div');
                messageTextDiv.classList.add('message-text');
                messageTextDiv.textContent = text;

                messageContent.appendChild(messageAuthorDiv);
                messageContent.appendChild(messageTextDiv);
                messageDiv.appendChild(messageAvatar);
                messageDiv.appendChild(messageContent);

                messageArea.appendChild(messageDiv);
                messageArea.scrollTop = messageArea.scrollHeight; // En alta kaydır
            };

            sendMessageBtn.addEventListener('click', () => {
                const messageText = messageInput.value.trim();
                if (messageText) {
                    addMessage(currentUser, messageText, true); // Kendi mesajımız
                    messageInput.value = ''; // Input'u temizle

                    // Basit bir bot cevabı simülasyonu
                    setTimeout(() => {
                        addMessage('Bot', `Merhaba ${currentUser}! "${messageText}" mesajına cevap veriyorum.`);
                    }, 1000);
                }
            });

            // Enter tuşu ile mesaj gönderme
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessageBtn.click();
                }
            });
        }
    };

    // Hangi sayfada olduğumuza göre ilgili fonksiyonu çağır
    if (document.body.classList.contains('app-container')) { // Eğer main.html ise
        setupMainPage();
    } else { // Eğer index.html veya kayit.html ise
        setupAuthButtons();
    }

    // İlk açılışta eğer ana sayfa ise varsayılan kanalları yükle (yalancıktan)
    if (window.location.pathname.includes('main.html')) {
        const initialChannels = [
            { name: 'Genel', type: 'channel' },
            { name: 'Oyun Sohbeti', type: 'channel' },
            { name: 'Yardım', type: 'channel' }
        ];

        const channelList = document.querySelector('.channel-list');
        if (channelList) {
            channelList.innerHTML = ''; // Mevcut içeriği temizle
            initialChannels.forEach(channel => {
                const channelItem = document.createElement('li');
                channelItem.classList.add('channel-item');
                channelItem.dataset.type = channel.type;
                channelItem.textContent = channel.name;
                if (channel.name === 'Genel') {
                    channelItem.classList.add('active'); // Genel'i varsayılan olarak aktif yap
                }
                channelList.appendChild(channelItem);
            });
        }
    }
});
