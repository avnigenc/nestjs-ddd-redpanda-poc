# NestJS and Redpanda Sample Project

This project demonstrates how to create a simple data processing application using NestJS and Redpanda.

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- Docker (for running Redpanda)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/avnigenc/nestjs-ddd-redpanda-poc.git
    cd nestjs-ddd-redpanda-poc
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up Redpanda:**
   Ensure Docker is running, then start a Redpanda container:
    ```bash
    docker compose up -d
    ```

### Running the Application

1. **Start the NestJS application:**
    ```bash
    npm run start:dev
    ```

2. The application should now be running at `http://localhost:3000`.
3. The RedPanda console should now be running at: `http://localhost:8080/topics`

### Usage

- The application listens to a Redpanda topic and processes incoming messages.
- You can interact with the application through the provided REST API.

### Example Endpoints

- `POST /credits`: Sends a message to a Redpanda topic (credit.created).
- `DELETE /credits/{id}`: Sends a message to a Redpanda topic (credit.deleted).
