#!/bin/bash

# Récupérer le port à partir de .env ou utiliser 3000 par défaut
port=$(grep -E '^NEXT_PUBLIC_APP_PORT=' .env | cut -d '=' -f2)

# Si la variable d'environnement n'est pas définie, utiliser 3000 par défaut
if [ -z "$port" ]; then
  port=3000
fi

# Fonction pour vérifier la disponibilité du port
check_port() {
  local port_to_check=$1
  lsof -i :$port_to_check > /dev/null 2>&1
}

# Trouver un port disponible en incrémentant
while check_port $port; do
  ((port++))
done

# Définir la variable d'environnement et démarrer l'application Next.js
PORT=$port next dev
