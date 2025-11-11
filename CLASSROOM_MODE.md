# 🏫 Mode Classe - Chat Collaboratif

Guide pour utiliser le chat collaboratif avec plusieurs étudiants sur le même réseau local.

## 🎯 Objectif

Permettre à plusieurs étudiants dans la même pièce de chatter ensemble via **un seul serveur WebSocket**.

---

## 📋 Prérequis

- Tous les étudiants sont sur le **même réseau WiFi**
- TON ordinateur (formateur) héberge le serveur
- Les étudiants peuvent accéder à ton IP locale

---

## 🚀 Configuration en 3 étapes

### Étape 1 : Trouver ton adresse IP locale

**Sur macOS/Linux** :
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# ou
hostname -I
```

**Sur Windows** :
```bash
ipconfig
```

**Exemple de résultat** :
```
192.168.1.100
```

---

### Étape 2 : Configurer l'URL du serveur Socket.IO

**Option A : Variable d'environnement (recommandé)**

Ajouter dans `.env` ou `.env.local` :
```env
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:3001
```

Remplace `192.168.1.100` par **ton IP locale**.

**Option B : Modifier directement le code**

Dans `app/collaborative-chat/page.tsx` :
```typescript
const SOCKET_URL = 'http://192.168.1.100:3001'; // Ton IP
```

---

### Étape 3 : Autoriser les connexions externes dans le serveur Socket.IO

Le serveur est déjà configuré pour accepter les connexions depuis le réseau local :

```typescript
// server.ts (ligne ~245)
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    // Ajouter ton IP :
    // origin: '*', // Accepte toutes les origines (pour le dev)
  },
});
```

Pour le mode classe, tu peux utiliser `origin: '*'` (permissif) :

```typescript
const io = new Server(httpServer, {
  cors: {
    origin: '*', // ⚠️ Uniquement en développement local
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
```

---

## 🖥️ Lancement en mode classe

### Sur TON ordinateur (formateur)

1. **Lancer les deux serveurs** :
```bash
npm run dev:all
```

2. **Vérifier que les serveurs sont démarrés** :
   - Next.js : `http://192.168.1.100:3000` ✅
   - Socket.IO : `http://192.168.1.100:3001` ✅

3. **Obtenir ton IP locale** :
```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

4. **Communiquer l'URL aux étudiants** :
```
http://192.168.1.100:3000/collaborative-chat
```

---

### Sur les ordinateurs des étudiants

1. **Ouvrir le navigateur**
2. **Aller sur l'URL fournie** :
```
http://192.168.1.100:3000/collaborative-chat
```
3. **Choisir un pseudo** et rejoindre le chat
4. **Chatter avec les autres étudiants** en temps réel !

---

## 📊 Architecture en mode classe

```
┌─────────────────────────────────────┐
│  TON PC (192.168.1.100)             │
│                                      │
│  ├─ Next.js (port 3000)              │
│  └─ Socket.IO (port 3001)            │
└─────────────────────────────────────┘
              │
              │ WiFi Local
              │
    ┌─────────┼─────────┬─────────┐
    │         │         │         │
┌───▼───┐ ┌──▼────┐ ┌──▼────┐ ┌──▼────┐
│ PC 1  │ │ PC 2  │ │ PC 3  │ │ PC 4  │
│Alice  │ │ Bob   │ │ Carol │ │ Dave  │
└───────┘ └───────┘ └───────┘ └───────┘
```

**Un seul serveur Socket.IO**, **plusieurs clients connectés**.

---

## ✅ Tests

### Test 1 : Connexion
- Chaque étudiant peut rejoindre le chat ✅
- La liste des utilisateurs se met à jour ✅

### Test 2 : Messages
- Les messages d'un étudiant apparaissent chez les autres ✅
- Les messages sont en temps réel (< 100ms) ✅

### Test 3 : IA
- Mentionner `@chatbot` déclenche une réponse IA ✅
- La réponse IA est visible par tous ✅

### Test 4 : Typing indicator
- L'indicateur "en train d'écrire..." fonctionne ✅

---

## 🔧 Dépannage

### Problème 1 : Les étudiants ne peuvent pas se connecter

**Cause** : Firewall bloque le port 3000 ou 3001

**Solution** :
```bash
# macOS : Autoriser les connexions entrantes
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node

# Windows : Autoriser Node.js dans le pare-feu Windows
```

### Problème 2 : CORS error dans le navigateur

**Cause** : Le serveur Socket.IO refuse la connexion

**Solution** : Modifier `server.ts` :
```typescript
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Accepte toutes les origines
  },
});
```

### Problème 3 : Les étudiants voient "Déconnecté"

**Cause** : Mauvaise URL ou serveur Socket.IO non démarré

**Vérifications** :
1. Le serveur Socket.IO tourne bien (voir logs)
2. L'URL est correcte (`http://TON_IP:3001`)
3. Le port 3001 est accessible

**Test rapide** :
```bash
# Depuis un autre PC du réseau
curl http://192.168.1.100:3001/socket.io/
# Devrait retourner "0" si le serveur fonctionne
```

### Problème 4 : Latence élevée (> 1 seconde)

**Cause** : Réseau WiFi saturé ou trop de clients

**Solutions** :
- Utiliser une connexion Ethernet (câble) pour ton PC
- Limiter le nombre de clients (< 20 recommandé)
- Utiliser un réseau WiFi dédié (pas le WiFi public)

---

## 🎓 Scénarios pédagogiques

### Scénario 1 : Démo en direct
1. **Formateur** : Projeter ton écran avec le chat
2. **Étudiants** : Se connectent depuis leurs PC
3. **Démo** : Montrer le temps réel, l'IA, les indicateurs

### Scénario 2 : Exercice collaboratif
1. **Étudiants** : Se connectent par groupes (2-3)
2. **Exercice** : Poser des questions à l'IA via @chatbot
3. **Débrief** : Discuter des réponses de l'IA

### Scénario 3 : Debugging collectif
1. **Un étudiant** rencontre un bug
2. **Autres étudiants** peuvent voir les messages d'erreur
3. **Formateur** peut intervenir dans le chat

---

## 📈 Scalabilité

### Combien d'étudiants maximum ?

| Nombre d'étudiants | Performance | Recommandation |
|-------------------|-------------|----------------|
| 1-10              | ✅ Excellent | Idéal |
| 10-20             | ✅ Bon | OK pour une classe |
| 20-50             | ⚠️ Moyen | Possible mais risque de lag |
| 50+               | ❌ Difficile | Nécessite un serveur dédié |

**Limite pratique** : ~20 étudiants sur un PC de développement.

### Pour plus de 20 étudiants

**Option 1 : Déployer sur un serveur dédié**
- Vercel (limité pour WebSocket)
- Railway (supporte WebSocket)
- Render (supporte WebSocket)
- VPS (DigitalOcean, AWS, etc.)

**Option 2 : Créer plusieurs rooms**
```typescript
// server.ts
socket.join('room1'); // Groupe A
socket.join('room2'); // Groupe B

io.to('room1').emit('message:new', message); // Seulement room1
```

---

## 🔒 Sécurité

### ⚠️ Important

Le mode classe est **uniquement pour le développement local**.

**NE PAS** :
- ❌ Exposer le serveur sur Internet sans sécurité
- ❌ Utiliser `origin: '*'` en production
- ❌ Stocker des données sensibles dans les messages

**Pour la production** :
- ✅ Authentification des utilisateurs
- ✅ HTTPS et WSS (WebSocket sécurisé)
- ✅ Rate limiting
- ✅ Validation stricte des inputs
- ✅ CORS configuré correctement

---

## 📝 Checklist avant le cours

- [ ] Trouver ton IP locale
- [ ] Configurer `NEXT_PUBLIC_SOCKET_URL` dans `.env`
- [ ] Tester que le serveur démarre (`npm run dev:all`)
- [ ] Tester la connexion depuis un autre appareil sur le réseau
- [ ] Vérifier que le firewall autorise les connexions
- [ ] Préparer l'URL à communiquer aux étudiants
- [ ] Tester avec 2-3 appareils avant le cours

---

## 🚀 Alternative : Mode individuel

Si le réseau local ne fonctionne pas, chaque étudiant peut :

1. **Cloner le repo** sur son PC
2. **Lancer son propre serveur** (`npm run dev:all`)
3. **Ouvrir plusieurs onglets** pour simuler plusieurs utilisateurs

**Avantage** : Chacun expérimente individuellement
**Inconvénient** : Pas de collaboration réelle entre étudiants

---

## 🎯 Conclusion

Le mode classe permet une **expérience collaborative réelle** :
- ✅ Temps réel entre plusieurs utilisateurs
- ✅ IA partagée et visible par tous
- ✅ Expérience proche d'une vraie application de chat

C'est **parfait pour montrer** :
- Comment fonctionnent les WebSocket
- L'architecture client-serveur
- La synchronisation en temps réel
- L'intégration IA dans une app collaborative

**Bon cours ! 🎓**
