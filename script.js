document.addEventListener('DOMContentLoaded', () => {
    // Rastgele 4 haneli sayı üretir
    const generateRandomTag = () => Math.floor(1000 + Math.random() * 9000);

    // --- Sayfa Yönlendirme ve Giriş Kontrolü (index.html ve kayit.html için) ---
    const setupAuthPages = () => {
        const loginButton = document.querySelector('#index-login-btn');
        const registerButton = document.querySelector('#kayit-btn');

        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('email'); // index.html'deki email input'u
                const passwordInput = document.getElementById('password');

                // *** Buradaki kullanıcı adı ve şifreyi değiştirebilirsiniz ***
                const expectedUsername = 'Emloxa';
                const expectedPassword = '123';

                if (emailInput.value === expectedUsername && passwordInput.value === expectedPassword) {
                    localStorage.setItem('currentUser', expectedUsername); // Giriş yapan kullanıcı adını kaydet
                    localStorage.setItem('currentUserTag', generateRandomTag());
                    window.location.href = 'main.html';
                } else {
                    alert('Hatalı kullanıcı adı veya şifre! Lütfen Emloxa ve 123 kullanın.');
                }
            });
        }

        if (registerButton && window.location.pathname.includes('kayit.html')) {
            registerButton.addEventListener('click', (e) => {
                e.preventDefault();
                const usernameInput = document.getElementById('username');
                const emailInput = document.getElementById('email'); // kayit.html'deki email input'u
                const passwordInput = document.getElementById('password');
                const confirmPasswordInput = document.getElementById('confirm-password');

                if (usernameInput.value.trim() === '' || emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
                    alert('Lütfen tüm alanları doldurun!');
                    return;
                }

                if (passwordInput.value !== confirmPasswordInput.value) {
                    alert('Şifreler eşleşmiyor!');
                    return;
                }

                // Kayıt olan kullanıcının bilgilerini kaydet (şimdilik bu, gerçek bir veritabanı değil)
                localStorage.setItem('currentUser', usernameInput.value.trim());
                localStorage.setItem('currentUserTag', generateRandomTag());
                alert('Kaydınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.');
                window.location.href = 'index.html'; // Kayıt sonrası giriş sayfasına yönlendir
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

        // localStorage'dan kullanıcı bilgilerini çek
        const currentUser = localStorage.getItem('currentUser');
        const currentUserTag = localStorage.getItem('currentUserTag');

        // Eğer kullanıcı yoksa veya giriş yapmamışsa giriş sayfasına yönlendir
        if (!currentUser || !currentUserTag) {
            window.location.href = 'index.html';
            return; // Kodun daha fazla çalışmasını engelle
        }

        // Kullanıcı adını ve etiketini göster
        displayUsername.textContent = `${currentUser}#${currentUserTag}`;

        // Başlangıç kanalları ve arkadaşlar (şimdilik sadece kanallar)
        // Her öğe için bir 'messages' dizisi tuttuk.
        let channelsAndFriends = [
            { id: 'genel', name: 'Genel', type: 'channel', messages: [] },
            { id: 'oyun', name: 'Oyun Sohbeti', type: 'channel', messages: [] },
            { id: 'yardim', name: 'Yardım', type: 'channel', messages: [] }
        ];

        let currentActiveItem = null; // Aktif öğeyi tutmak için

        // Kanal/Arkadaş listesini çizen fonksiyon
        const renderChannelList = () => {
            channelList.innerHTML = ''; // Listeyi temizle
            channelsAndFriends.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('channel-item');
                li.textContent = item.name;
                li.dataset.type = item.type; // 'channel' veya 'friend'
                li.dataset.id = item.id; // Her öğeye benzersiz bir ID ver (şimdilik name ile aynı olabilir)

                if (item === currentActiveItem) {
                    li.classList.add('active');
                }
                channelList.appendChild(li);
            });
        };

        // Aktif kanal/arkadaşı ayarlayan fonksiyon
        const setActiveItem = (item) => {
            currentActiveItem = item;
            renderChannelList(); // Listeyi yeniden çizmek için
            if (item.type === 'friend') {
                chatHeaderTitle.textContent = `@${item.name}`;
            } else {
                chatHeaderTitle.textContent = `#${item.name}`;
            }
            displayMessages(item.messages); // Yeni kanalın/arkadaşın mesajlarını göster
        };

        // Mesajları sohbet alanına basan fonksiyon
        const displayMessages = (messages) => {
            messageArea.innerHTML = ''; // Sohbet alanını tamamen temizle
            messages.forEach(msg => {
                addMessageToChat(msg.author, msg.text, msg.time, msg.isOwn);
            });
            messageArea.scrollTop = messageArea.scrollHeight; // En alta kaydır
        };

        // Tek bir mesajı sohbet alanına ekleyen fonksiyon
        const addMessageToChat = (author, text, time, isOwn = false) => {
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
            messageTimeSpan.textContent = time;

            messageAuthorDiv.appendChild(messageTimeSpan);

            const messageTextDiv = document.createElement('div');
            messageTextDiv.classList.add('message-text');
            messageTextDiv.textContent = text;

            messageContent.appendChild(messageAuthorDiv);
            messageContent.appendChild(messageTextDiv);
            messageDiv.appendChild(messageAvatar);
            messageDiv.appendChild(messageContent);

            messageArea.appendChild(messageDiv);
        };


        // Kanal Seçim İşlevselliği
        channelList.addEventListener('click', (e) => {
            if (e.target.classList.contains('channel-item')) {
                const selectedItemName = e.target.textContent;
                // 'id' ile bulmak daha güvenli olabilir, şimdilik name ile bulalım.
                const selectedItem = channelsAndFriends.find(item => item.name === selectedItemName);
                if (selectedItem) {
                    setActiveItem(selectedItem);
                }
            }
        });

        // Arkadaş Ekleme Butonu İşlevselliği
        if (addFriendButton && addFriendInputArea) {
            addFriendButton.addEventListener('click', () => {
                addFriendInputArea.style.display = addFriendInputArea.style.display === 'none' ? 'flex' : 'none';
                if (addFriendInputArea.style.display === 'flex') {
                    addFriendInput.focus(); // Input açılınca odaklan
                }
            });
        }

        // Arkadaş Ekleme İşlevi
        if (sendFriendRequestBtn && addFriendInput) {
            sendFriendRequestBtn.addEventListener('click', () => {
                const friendUsername = addFriendInput.value.trim();
                if (friendUsername) {
                    if (channelsAndFriends.some(item => item.name === friendUsername && item.type === 'friend')) {
                        alert('Bu kullanıcı zaten arkadaş listenizde!');
                        return;
                    }

                    // Kendi kendine arkadaş eklemeyi engelle
                    if (friendUsername === currentUser) {
                        alert('Kendinizi arkadaş olarak ekleyemezsiniz!');
                        return;
                    }

                    // Simülasyon: Arkadaşı listeye ekle
                    const newFriend = { id: friendUsername, name: friendUsername, type: 'friend', messages: [] };
                    channelsAndFriends.push(newFriend);
                    
                    addFriendInput.value = ''; // Input'u temizle
                    addFriendInputArea.style.display = 'none'; // Alanı gizle

                    setActiveItem(newFriend); // Yeni eklenen arkadaşı aktif yap
                    alert(`${friendUsername} arkadaş olarak eklendi! (Bu sadece bir simülasyondur)`);
                } else {
                    alert('Lütfen bir kullanıcı adı girin.');
                }
            });
        }

        // Mesaj Gönderme İşlevselliği (Simülasyon)
        if (sendMessageBtn && messageInput && messageArea) {
            sendMessageBtn.addEventListener('click', () => {
                const messageText = messageInput.value.trim();
                if (messageText && currentActiveItem) {
                    const currentTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                    const newMessage = { author: currentUser, text: messageText, time: currentTime, isOwn: true };
                    currentActiveItem.messages.push(newMessage);
                    addMessageToChat(currentUser, messageText, currentTime, true);
                    messageInput.value = ''; // Input'u temizle

                    // Basit bir bot cevabı simülasyonu
                    setTimeout(() => {
                        const botMessage = {
                            author: 'Bot', // Bot veya arkadaşın adı
                            text: `Merhaba ${currentUser}! "${messageText}" mesajına cevap veriyorum.`,
                            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                            isOwn: false
                        };
                        currentActiveItem.messages.push(botMessage);
                        addMessageToChat(botMessage.author, botMessage.text, botMessage.time, botMessage.isOwn);
                        messageArea.scrollTop = messageArea.scrollHeight; // Bot mesajından sonra da kaydır
                    }, 1000);
                }
            });

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessageBtn.click();
                }
            });
        }

        // Sayfa yüklendiğinde varsayılan olarak ilk kanalı seç (Genel)
        setActiveItem(channelsAndFriends[0]);
    };

    // Hangi sayfada olduğumuza göre ilgili fonksiyonu çağır
    // body'de 'app-container' sınıfı varsa main.html'dir
    if (document.body.classList.contains('app-container')) {
        setupMainPage();
    } else { // index.html veya kayit.html
        setupAuthPages();
    }
});
