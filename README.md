## Getting Started

First, run the development server:

Create .env file with variables in .env.example.

### With docker

```bash
docker-compose -f docker-compose-dev.yml up -d
```

Open terminal in docker container and apply migrations:

```bash
npx prisma migrate dev
```

### Without docker

```bash
yarn
# and
npx prisma migrate dev
# and
yarn dev
```

### Create user code

```bash
Make request to:

POST/collaborator

Body

{
    name: string // optional
}

Return

An object containing:

{
    id: string
    name: string
    active: boolean
    code: string // User code. Require to register
}
```
