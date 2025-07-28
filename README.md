# Smart Email Assistant

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue.svg)](https://mui.com/)

An intelligent email composition and reply generation system powered by AI. This project consists of a Chrome extension, a React-based frontend, and a Spring Boot backend that work together to provide smart email assistance.

## 🚀 Features

- **AI-Powered Email Generation**: Generate intelligent email replies and compositions
- **Chrome Extension Integration**: Seamless integration with Gmail through a Chrome extension
- **Modern Web Interface**: Clean and intuitive React frontend with Material-UI components
- **RESTful API**: Robust Spring Boot backend with REST endpoints
- **Cross-Platform**: Works across different email platforms and browsers

## 🏗️ Architecture

The project follows a microservices architecture with three main components:

```
Smart Email Assistant/
├── email-writer-backend/     # Spring Boot REST API
├── email-writer-frontend/    # React Web Application
├── email-writer-extension/   # Chrome Extension
└── Hello World Extension/    # Sample Extension
```

### Backend (Spring Boot)
- **Technology**: Java 21, Spring Boot 3.5.4
- **Features**: RESTful API, CORS support, Lombok integration
- **Endpoints**: Email generation and health check APIs

### Frontend (React)
- **Technology**: React 19.1.0, Vite, Material-UI
- **Features**: Modern UI components, responsive design, routing
- **Styling**: Material-UI with styled-components

### Chrome Extension
- **Technology**: Vanilla JavaScript, Manifest V3
- **Features**: Gmail integration, content script injection
- **Permissions**: Active tab access, storage, scripting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Java 21** or higher
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Maven** (for Spring Boot backend)
- **Google Chrome** (for extension testing)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Minulck/Smart-Email-Assistant.git
cd Smart-Email-Assistant
```

### 2. Backend Setup (Spring Boot)
```bash
cd email-writer-backend

# Install dependencies and run
./mvnw spring-boot:run
# OR on Windows
mvnw.cmd spring-boot:run

# The backend will start on http://localhost:8080
```

### 3. Frontend Setup (React)
```bash
cd email-writer-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# The frontend will start on http://localhost:5173
```

### 4. Chrome Extension Setup
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `email-writer-extension` folder
4. The extension will be installed and ready to use

## 🔧 Configuration

### Backend Configuration
The backend configuration can be found in `email-writer-backend/src/main/resources/application.properties`:

```properties
# Add your configuration here
server.port=8080
# Configure other properties as needed
```

### Frontend Configuration
The frontend uses Vite for development. Configuration can be found in `vite.config.js`:

```javascript
// Vite configuration
export default defineConfig({
  plugins: [react()],
  // Add other configurations
})
```

### Extension Configuration
The extension configuration is in `manifest.json`:

```json
{
  "name": "Email Writer Assistant",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": ["activeTab", "storage", "scripting"],
  "host_permissions": ["http://localhost:8000/*", "*://mail.google.com/*"]
}
```

## 📚 API Documentation

### Email Generation Endpoint

**POST** `/api/email/generate`

Generate an intelligent email reply based on the provided context.

```json
{
  "subject": "Email subject",
  "content": "Original email content",
  "context": "Additional context for generation"
}
```

**GET** `/api/email/hello`

Health check endpoint that returns a simple greeting.

## 🎯 Usage

### Using the Chrome Extension
1. Navigate to Gmail in Chrome
2. Click on the Smart Email Assistant extension icon
3. The extension will inject helpful controls into the Gmail interface
4. Use the AI-powered features to generate email replies

### Using the Web Interface
1. Open your browser and go to `http://localhost:5173`
2. Use the React frontend to interact with the email generation features
3. The interface provides a clean way to test and use the AI capabilities

## 🧪 Testing

### Backend Tests
```bash
cd email-writer-backend
./mvnw test
```

### Frontend Tests
```bash
cd email-writer-frontend
npm run test
```

## 📁 Project Structure

```
Smart-Email-Assistant/
├── email-writer-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/email/writer/
│   │   │   │   ├── EmailWriterApplication.java
│   │   │   │   └── replygenerte/
│   │   │   │       ├── EmailGeneratorController.java
│   │   │   │       ├── EmailGeneratorService.java
│   │   │   │       └── EmailRequest.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── target/
├── email-writer-frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── email-writer-extension/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   └── content.css
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the frontend library
- Material-UI for the component library
- Chrome Extensions API documentation

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing [Issues](https://github.com/Minulck/Smart-Email-Assistant/issues)
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 🔄 Version History

- **v1.0.0** - Initial release with basic email generation functionality
- More versions coming soon...

---

**Happy Emailing!** 📧✨
