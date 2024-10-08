# TravelPal

**TravelPal** is a web application that helps users explore nearby locations based on latitude and longitude. It features various filters such as food, entertainment, and more, allowing users to find exactly what they are looking for. The project utilizes a React frontend and a Spring Boot backend, and it integrates with the Google Maps API to fetch and display location data.

## Features
- **Search by Location**: Enter latitude and longitude to get a list of nearby places.
- **Filter by Category**: Narrow down results using filters like food, lodging, attractions, etc.
- **Google Maps Integration**: Leverages the Google Maps API to get real-time location data.
- **Responsive UI**: The interface adapts to different screen sizes, providing a seamless experience on any device.

---

## Setup & Installation

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (version 20 or higher)
- **npm** (version 10 or higher)
- **Java** (version 17 or higher)
- **Maven** (version 3.6 or higher)
- **Google Maps API key** (from [Google Cloud Platform](https://cloud.google.com/maps-platform/))

### Installation Instructions

#### Frontend (React)

1. Clone the repository (Or install from Releases and unzip):
    ```bash
    git clone https://github.com/rmmhm/TravelPal.git
    cd TravelPal/src/main/app
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. If running locally, create a `.env` file in the frontend directory and add the following. This will connect the backend to the frontend
    ```
    REACT_APP_SERVER_URL=http://localhost:8080
    ```

4. Start the React development server:
    ```bash
    npm start
    ```

#### Backend (Spring Boot)

1. Navigate to the root project directory:
    ```bash
    cd TravelPal/
    ```

2. Install backend dependencies and compile the project:
    ```bash
    mvn clean install
    ```

3. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```