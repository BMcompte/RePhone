# RePhone — shop-page (améliorations)

Cette branche `shop-page` contient une page de boutique améliorée pour vendre des iPhone reconditionnés.

Principales améliorations apportées:
- Présentation plus professionnelle (header, cartes produits améliorées, badges, animation au survol)
- Images d'aperçu depuis Unsplash (source libre) pour un rendu visuel attractif. Remplacez-les par vos images dans `assets/images/` pour la production.
- Styles CSS revus et responsive
- Modal PayPal conservé (Smart Buttons). Remplacez `REPLACE_WITH_PAYPAL_CLIENT_ID` dans `index.html` par votre Client ID PayPal.

Remarques:
- Les images actuelles sont chargées dynamiquement depuis Unsplash via `https://source.unsplash.com/800x600/?iphone,13` etc. Vous pouvez remplacer ces URLs dans `js/script.js` par des chemins locaux (assets/images/...).
- Pour déployer via GitHub Pages: Settings → Pages → Source: `shop-page` branch, folder `/ (root)`.

Prochaine étape si vous le souhaitez:
- Je peux remplacer les images par vos fichiers si vous les téléversez ici ou via l'upload GitHub. (Option 3A)
- Intégrer Stripe ultérieurement (Payment Links ou Stripe Checkout with server).

---
