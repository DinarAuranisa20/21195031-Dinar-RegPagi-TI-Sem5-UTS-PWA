 // Inisialisasi IndexedDB
        var db;
        var request = indexedDB.open('komentarDB', 1);

        request.onsuccess = function(event) {
            db = event.target.result;
        };

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            var objectStore = db.createObjectStore('komentar', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('nama', 'nama', { unique: false });
            objectStore.createIndex('komentar', 'komentar', { unique: false });
        };

        document.getElementById('komentar-form').addEventListener('submit', function(event) {
            event.preventDefault();

            var nama = document.getElementById('nama').value;
            var komentar = document.getElementById('komentar').value;

            var transaction = db.transaction(['komentar'], 'readwrite');
            var objectStore = transaction.objectStore('komentar');
            var newItem = { nama: nama, komentar: komentar };

            var request = objectStore.add(newItem);
            request.onsuccess = function(event) {
                console.log('Komentar berhasil ditambahkan.');
                document.getElementById('nama').value = '';
                document.getElementById('komentar').value = '';
                showKomentar();
            };

            request.onerror = function(event) {
                console.error('Gagal menambahkan komentar: ' + event.target.error);
            };
        });

        function showKomentar() {
            if (db) { // Periksa apakah db telah diinisialisasi
                var transaction = db.transaction(['komentar'], 'readonly');
                var objectStore = transaction.objectStore('komentar');
                var komentarUl = document.getElementById('komentar-ul');
                komentarUl.innerHTML = '';
        
                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        var li = document.createElement('li');
                        li.textContent = cursor.value.nama +' : '+ cursor.value.komentar  ;
                        komentarUl.appendChild(li);
                        cursor.continue();
                    }
                };
            }
        }
        
        showKomentar();
