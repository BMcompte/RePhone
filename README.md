# RePhone — shop-page

Cette branche `shop-page` contient une page HTML simple et responsive pour vendre des iPhone reconditionnés (modèles 12,13,14,15,16) avec :
- Images placeholders (https://via.placeholder.com) à remplacer par vos photos dans `assets/images/`
- Capacités 64 / 128 / 256 Go
- Paiement intégré via PayPal (Smart Buttons)

Fichiers ajoutés:
- `index.html` — page principale
- `css/style.css` — styles
- `js/script.js` — génération dynamique des produits et intégration PayPal

Configuration PayPal (obligatoire avant mise en production):
1. Créez une application sur https://developer.paypal.com (My Apps & Credentials).
2. Copiez votre **Client ID** (Live ou Sandbox selon l'environnement).
3. Dans `index.html`, remplacez `REPLACE_WITH_PAYPAL_CLIENT_ID` dans la balise script PayPal par votre Client ID.
   - Exemple: `<script src="https://www.paypal.com/sdk/js?client-id=AbCdEfGh...&currency=EUR"></script>`
4. Testez d'abord en mode Sandbox (utilisez les identifiants sandbox fournis par PayPal).

Personnalisation et images:
- Remplacez les URLs `https://via.placeholder.com/600x400?text=...` dans `js/script.js` par les chemins vers vos images, idéalement placées dans `assets/images/`.
- Mettez à jour les prix dans `js/script.js` si besoin.

Déploiement (GitHub Pages):
1. Assurez-vous d'avoir poussé la branche `shop-page` sur GitHub.
2. Allez dans : Settings → Pages → Source : sélectionnez la branche `shop-page` et le dossier `/ (root)`.
3. Enregistrez. GitHub Pages publiera votre site à une URL du type `https://BMcompte.github.io/RePhone/`.

Test local :
- Ouvrez un serveur local simple pour tester (certaines fonctions nécessitent un serveur HTTP):
  - Python 3: `python -m http.server 8000`
  - ouvrez `http://localhost:8000` dans votre navigateur.

Sécurité:
- Ne mettez jamais de clés secrètes (ex: Stripe secret key) dans ce dépôt public.

Ajout futur de Stripe :
- Vous avez demandé d'ajouter Stripe plus tard — j'ai préparé l'interface pour n'utiliser que PayPal aujourd'hui. Nous pourrons intégrer Stripe Payment Links (sans serveur) ou Stripe Checkout (nécessitera un petit backend) ultérieurement.

Support:
Si vous voulez que j'ajoute des images d'exemple dans `assets/images/` (upload depuis vous), ou que je crée les liens Stripe plus tard, dites-le et je le fais.