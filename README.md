# Installation

## Development
docker-compose build
docker-compose up

## Production
docker-compose -f prod.docker-compose.yml down
docker-compose -f prod.docker-compose.yml build
docker-compose -f prod.docker-compose.yml up

or

chmod +x restart.prod.sh
./restart.prod.sh

# Technical Stack
- React
- TypeScript
- Node.js
- MongoDB
- Docker