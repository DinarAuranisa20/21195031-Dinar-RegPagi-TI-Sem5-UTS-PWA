// Minta izin notifikasi
if ('Notification' in window) {
    Notification.requestPermission()
      .then(function (permission) {
        if (permission=='granted')
        {
            alert('Pemberitahuan telah di izinkan');
        } else if (permission === 'denied') {
            // Izin diblokir
            alert('Pemberitahuan telah di blokir');
        }    
      });
  }
  
  // Fungsi untuk menampilkan notifikasi
  function showNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, {
          body: message,
          icon: 'icon.png'
        });
      });
    }
  }