# Full Stack Orchestration Project — Spring Boot + React + MySQL

Projet Full Stack réalisé avec :
- Spring Boot 3 / Java 21
- ReactJS / Axios
- MySQL 8
- Docker & Kubernetes (Minikube)

---

# Auteur
- Soulaiman Bouali

---

# Déploiement avec Kubernetes (Minikube) - RECOMMANDÉ

Cette méthode est la plus robuste pour l'orchestration demandée.

### 1. Démarrer Minikube
```bash
minikube start
```

### 2. Construire les images DIRECTEMENT dans Minikube
C'est la méthode la plus fiable pour que Kubernetes trouve vos images sans avoir besoin d'un Registry.

```bash
# Se placer à la racine du projet
# Construire l'image du Backend
minikube image build -t backend-k8s ./tp_global

# Construire l'image du Frontend
minikube image build -t frontend-k8s ./frontend
```

### 3. Déployer les composants
```bash
kubectl apply -f k8s/
```
*Attendez que tous les pods soient en état "Running"* : `kubectl get pods`

### 4. Accéder à l'application
Une fois que les pods sont en état "Running", lancez cette commande :

```bash
minikube service frontend-service
```
L'application s'ouvrira dans votre navigateur. La liaison avec le backend est désormais automatique grâce à un **Proxy React** configuré pour communiquer avec le service `backend-service` à l'intérieur du cluster.

---

# Déploiement avec Docker Compose (Alternative)

```bash
docker compose up --build
```
- Frontend : `http://localhost:3000`
- Backend : `http://localhost:9090`

---

# Structure du projet
- `k8s/` : Manifests Kubernetes (Deployments & Services)
- `frontend/` : Application React (Port 3000)
- `tp_global/` : API Spring Boot (Port 8082)
- `docker-compose.yml` : Configuration Docker standard