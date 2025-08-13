// anim.js
// Sincronizar las letras con la canción
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('audio');
  const lyrics = document.getElementById('lyrics');
  const playBtn = document.getElementById('playBtn');

  // Array de objetos que contiene cada línea y su tiempo de aparición en segundos
  const lyricsData = [
    { text: "Y ya me contaron que te acomplejas de tu imagen 😵‍💫💔", time: 15 },
    { text: "Y mira al espejo, que linda eres sin maquillaje ❤️✨", time: 22 },
    { text: "Y si eres gorda o flaca todo eso no me importa a mí 😙💞", time: 30 },
    { text: "Y tampoco soy perfecto solo sé que yo te quiero así 😍💘", time: 37 },
    { text: "Y el corazón, no tiene cara. Y te prometo que lo nuestro nunca va a terminar 💖🔒", time: 45 },
    { text: "Y el amor, vive en el alma. Ni con un deseo sabes que nada de irá va a cambiar 💫💌", time: 53 },
    { text: "Prende una vela, rézale a Dios. Y dale gracias que tenemos ese lindo corazón 🙏💗", time: 60 },
    { text: "Prende una vela, pide perdón. Y por creer que tú eres fea te dedico esta canción 🎶💝", time: 68 },
    { text: "Y si eres gorda o flaca todo eso no me importa a mí 😙💞", time: 75 },
    { text: "Y tampoco soy perfecto solo sé que yo te quiero así 😍💘", time: 82 },

    { text: "Ni yo sé cómo programé esto 💀💀💀", time: 91 },
    { text: "Las cosas que hago por amor sususu 👽", time: 100 },

    { text: "Y si eres gorda o flaca todo eso no me importa a mí 😙💞", time: 108 },
    { text: "Y tampoco soy perfecto solo sé que yo te quiero así 😍💘", time: 115 },
    { text: "Y el corazón, no tiene cara. Y te prometo que lo nuestro nunca va a terminar 💖🔒", time: 123 },
    { text: "Y el amor, vive en el alma. Ni con un deseo sabes que nada de tí irá a cambiar 💫💌", time: 130 },
    { text: "Nadie es perfecto en el amor. Ay, seas blanquita, morenita. No me importa el color 🌈🤍", time: 138 },
    { text: "Mírame a mí, mírame bien. Aunque tenga cara de bonito me acomplejo yo también 😬👻", time: 145 },
    { text: "Y si eres gorda o flaca todo eso no me importa a mí 😙💞", time: 153 },
    { text: "Y tampoco soy perfecto solo sé que yo te quiero así 😍💘", time: 160 },

    { text: "tururu 🎵", time: 171 },

    { text: "Y el corazón, no tiene cara. Y te prometo que lo nuestro nunca va a terminar 💖🔒", time: 183 },
    { text: "Y el amor, vive en el alma. Ni con un deseo sabes que nada de ti irá a cambiar 💫💌", time: 190 },
    { text: "Te adoro amor, wa wa wa ❤️‍🔥💍", time: 200 }
  ];

  // Función que actualiza las lyrics según el tiempo actual del audio
  function updateLyrics() {
    const t = Math.floor(audio.currentTime);
    const currentLine = lyricsData.find(line => t >= line.time && t < line.time + 6);

    if (currentLine) {
      // Fade más suave: calcula opacidad según diferencia de tiempo real (no floored)
      const fadeInDuration = 0.5; // segundos para el fade-in
      const diff = audio.currentTime - currentLine.time;
      const opacity = Math.max(0, Math.min(1, diff / fadeInDuration));

      lyrics.style.opacity = opacity;
      lyrics.textContent = currentLine.text;
    } else {
      lyrics.style.opacity = 0;
      lyrics.textContent = '';
    }
  }

  // Manejo del botón reproducir/pausar
  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play(); // devuelve Promise — por eso usamos await
        playBtn.textContent = '⏸ Pausar';
        playBtn.setAttribute('aria-pressed', 'true');

        // Agrega el listener timeupdate si no está
        audio.addEventListener('timeupdate', updateLyrics);
      } else {
        audio.pause();
        playBtn.textContent = '▶ Reproducir';
        playBtn.setAttribute('aria-pressed', 'false');
      }
    } catch (err) {
      console.error('Error al reproducir el audio:', err);
      // puedes mostrar un mensaje visual aquí si quieres
    }
  });

  // Cuando el audio termina, restablecemos el botón y las lyrics
  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶ Reproducir';
    playBtn.setAttribute('aria-pressed', 'false');
    lyrics.style.opacity = 0;
    lyrics.textContent = '';
    // remover listener para evitar llamadas innecesarias (opcional)
    audio.removeEventListener('timeupdate', updateLyrics);
  });

  // Si el usuario busca saltar en la pista manualmente, actualizamos las lyrics inmediatamente
  audio.addEventListener('seeked', updateLyrics);

  // Inicializamos estado visual de lyrics
  lyrics.style.opacity = 0;
});