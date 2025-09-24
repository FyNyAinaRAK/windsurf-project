const fs = require('fs');
const https = require('https');
const path = require('path');

// Créer le dossier images s'il n'existe pas
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Dossier images créé avec succès');
}

// Liste des images à télécharger
const images = {
  'placeholder.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'btp.jpg': 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'transport.jpg': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'immobilier.jpg': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'communication.jpg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'services.jpg': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
  'security.jpg': 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
  'import-export.jpg': 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80'
};

// Fonction pour télécharger une image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Supprimer le fichier en cas d'erreur
      reject(err);
    });
  });
}

// Télécharger toutes les images
async function downloadAllImages() {
  try {
    for (const [filename, url] of Object.entries(images)) {
      const filepath = path.join(imagesDir, filename);
      if (!fs.existsSync(filepath)) {
        console.log(`Téléchargement de ${filename}...`);
        await downloadImage(url, filepath);
      } else {
        console.log(`${filename} existe déjà, téléchargement ignoré`);
      }
    }
    console.log('Toutes les images ont été téléchargées avec succès !');
  } catch (error) {
    console.error('Erreur lors du téléchargement des images:', error);
  }
}

// Exécuter le téléchargement
downloadAllImages();
