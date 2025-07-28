# Smart Email Assistant

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-purple.svg)](https://vitejs.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-green.svg)](https://developer.chrome.com/docs/extensions/)

An intelligent email composition and reply generation system powered by AI. This project consists of a Chrome extension, a React-based frontend, and a Spring Boot backend that work together to provide smart email assistance.

## 🚀 Features

- **AI-Powered Email Generation**: Generate intelligent email replies and compositions using Google's Gemini AI
- **Chrome Extension Integration**: Seamless integration with Gmail through a modern Chrome extension with popup interface
- **Automatic Email Detection**: Smart detection and extraction of email content from Gmail
- **Multiple Tone Options**: Choose from different writing tones (formal, casual, friendly, etc.)
- **Modern Web Interface**: Clean and intuitive React frontend with Material-UI components and Vite build system
- **RESTful API**: Robust Spring Boot backend with REST endpoints
- **Real-time Processing**: Fast email generation with loading states and error handling
- **Cross-Platform**: Works across different email platforms and browsers
- **Secure API Key Management**: Safe handling of API credentials with template-based configuration

## 🏗️ Architecture

The project follows a microservices architecture with three main components:

```
Smart Email Assistant/
├── email-writer-backend/     # Spring Boot REST API
├── email-writer-frontend/    # React Web Application
└── email-writer-extension/   # Chrome Extension
```

### Backend (Spring Boot)
- **Technology**: Java 21, Spring Boot 3.5.4
- **Features**: RESTful API, CORS support, Lombok integration
- **Endpoints**: Email generation and health check APIs

### Frontend (React)
- **Technology**: React 19.1.0, Vite 7.0.4, Material-UI 7.2.0
- **Features**: Modern UI components, responsive design, routing, styled-components
- **Build System**: Vite for fast development and optimized builds
- **Styling**: Material-UI with emotion and styled-components integration
- **HTTP Client**: Axios for API communication

### Chrome Extension
- **Technology**: Vanilla JavaScript, Manifest V3, React components
- **Features**: Gmail integration, content script injection, popup interface with React
- **Capabilities**: Email content detection, tone selection, real-time generation
- **Permissions**: Active tab access, storage, scripting for Gmail integration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Java 21** or higher
- **Node.js** (v18 or higher) 
- **npm** or **yarn**
- **Maven** (for Spring Boot backend)
- **Google Chrome** (for extension testing)
- **Gemini API Key** (from Google AI Studio)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Minulck/Smart-Email-Assistant.git
cd Smart-Email-Assistant
```

### 2. Backend Setup (Spring Boot)
```bash
cd email-writer-backend

# IMPORTANT: Configure API Keys first (see Configuration section below)

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

### API Keys Setup (IMPORTANT)
Before running the backend, you need to configure your API keys:

1. **Navigate to the backend resources folder**:
   ```bash
   cd email-writer-backend/src/main/resources
   ```

2. **Copy the template file**:
   ```bash
   cp api-keys.properties.template api-keys.properties
   ```

3. **Edit the `api-keys.properties` file** and replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key:
   ```properties
   # API Configuration
   gemini.api.key=YOUR_ACTUAL_GEMINI_API_KEY_HERE
   ```

4. **Important Security Notes**:
   - The `api-keys.properties` file is already added to `.gitignore` and will not be committed to version control
   - Never commit your actual API keys to the repository
   - Keep your API keys secure and do not share them publicly

### Backend Configuration
The backend configuration can be found in `email-writer-backend/src/main/resources/application.properties`:

```properties
spring.application.name=email-writer
spring.config.import=optional:classpath:api-keys.properties
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
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
  "description": "AI Powered Email Composition",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": ["activeTab", "storage", "scripting"],
  "host_permissions": ["http://localhost:8000/*", "*://mail.google.com/*"],
  "action": {
    "default_title": "Email Writer Assistant",
    "default_popup": "popup.html"
  }
}
```

## 📚 API Documentation

### Email Generation Endpoint

**POST** `/api/email/generate`

Generate an intelligent email reply based on the provided context and tone preference.

**Request Body:**
```json
{
  "subject": "Email subject",
  "content": "Original email content", 
  "context": "Additional context for generation",
  "tone": "formal" // Options: formal, casual, friendly, professional
}
```

**Response:**
```json
{
  "generatedReply": "AI-generated email content based on input parameters"
}
```

**GET** `/api/email/hello`

Health check endpoint that returns a simple greeting.

**Response:**
```json
{
  "message": "Hello from Email Writer API!"
}
```

## 🎯 Usage

### Using the Chrome Extension
1. **Install the extension** following the setup instructions above
2. **Navigate to Gmail** in Chrome
3. **Click on the Smart Email Assistant extension icon** in the toolbar
4. **The popup interface will open** with the following features:
   - Automatic detection of current email content
   - Tone selection dropdown (formal, casual, friendly, etc.)
   - Generate button to create AI-powered replies
   - Copy functionality to transfer generated content to Gmail
5. **Select your preferred tone** and click "Generate Reply"
6. **Copy the generated content** and paste it into your Gmail compose window

### Using the Web Interface
1. **Start the backend and frontend** servers as described in the setup section
2. **Open your browser** and go to `http://localhost:5173`
3. **Use the React frontend** to interact with the email generation features
4. **Input email content** and select desired tone
5. **Generate and refine** email replies using the AI capabilities

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
│   │   │       ├── application.properties
│   │   │       ├── api-keys.properties.template
│   │   │       └── api-keys.properties (created by user)
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── target/
├── email-writer-frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
├── email-writer-extension/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── content.css
│   ├── popup.html
│   ├── popup-app.jsx
│   ├── index.html
│   └── assets/
│       └── index-C4djW0Rs.js
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

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing [Issues](https://github.com/Minulck/Smart-Email-Assistant/issues)
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 🔄 Version History

- **v1.0.0** - Initial release with:
  - Basic email generation functionality using Gemini AI
  - Chrome extension with popup interface
  - React frontend with Material-UI components
  - Spring Boot backend with REST API
  - Automatic email detection from Gmail
  - Multiple tone options for email generation
  - Secure API key management

---

**Happy Emailing!** 📧✨
