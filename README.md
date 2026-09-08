
# Cloud Resume Challenge

My implementation of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/) — a serverless, cloud-native resume site built with AWS, automated with GitHub Actions, and containerized with Docker.

---

## Overview

What began as a static resume website evolved into a fully serverless application featuring:

- Global CDN delivery
- A live visitor counter
- Automated CI/CD pipelines
- Multi-stage Docker builds

---

## Architecture

```text
                         ┌──────────────────┐
                         │     GitHub       │
                         │   Source Code    │
                         └────────┬─────────┘
                                  │
                           GitHub Actions
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                 Build & Deploy          Docker Build
                     │                         │
                     ▼                         ▼
                    S3                    Docker Hub
                     │
                     ▼
                CloudFront
                     │
                     ▼
           zakariahanani.com
                     │
              Visitor Counter
                     │
                     ▼
                 API Gateway
                     │
                     ▼
                  Lambda
                     │
                     ▼
                DynamoDB
```

### AWS Services

| Service            | Role                                      |
|--------------------|-------------------------------------------|
| **Amazon S3**      | Hosts the static website assets           |
| **Amazon CloudFront** | Global CDN + HTTPS termination         |
| **API Gateway**    | Exposes the visitor-counter REST endpoint |
| **AWS Lambda**     | Serverless backend logic                  |
| **DynamoDB**       | Persists the visitor count                |
| **Route 53 / DNS** | Domain configuration & routing            |

---

## CI/CD Pipeline

Every push to the main branch triggers two independent workflows:

**Website Deployment**
```text
Git push
   ↓
GitHub Actions
   ↓
Build React application
   ↓
Sync build artifacts to S3
   ↓
CloudFront serves the updated site
```

**Container Publishing**
```text
Git push
   ↓
GitHub Actions
   ↓
Docker multi-stage build
   ↓
Push image to Docker Hub
```

---

## Docker

The portfolio is packaged with a multi-stage Dockerfile:

1. **Build stage** – Node.js compiles the React + TypeScript + Vite application  
2. **Runtime stage** – Nginx serves only the production static files  

The final image is lean, containing nothing but the compiled assets and Nginx.

---

## Tech Stack

| Layer       | Technologies                          |
|-------------|---------------------------------------|
| **Frontend**    | React · TypeScript · Vite             |
| **Cloud**       | S3 · CloudFront · API Gateway · Lambda · DynamoDB |
| **DevOps**      | GitHub Actions · Docker · Docker Hub  |
| **Version Control** | Git · GitHub                      |

---

## Documentation

Detailed implementation notes, architecture decisions, and lessons learned are available in:

**[cloud-resume-challenge.md](./cloud-resume-challenge.md)**

---

## Live Site

**[https://zakariahanani.com](https://zakariahanani.com)**
```
