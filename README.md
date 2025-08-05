# Smart Email Assistant

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-purple.svg)](https://vitejs.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-green.svg)](https://developer.chrome.com/docs/extensions/)

📧 A powerful AI-powered email assistant that integrates with Gmail to help you write better emails. This project includes:

- A Chrome Extension that adds an "AI Reply" button directly in Gmail
- A standalone web application for composing emails
- A Spring Boot backend that handles the AI processing using Google's Gemini AI

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

#### 2.1 Basic Setup
```bash
# Navigate to backend directory
cd email-writer-backend

# For Windows
mvnw.cmd clean install
# For Unix/Linux/MacOS
./mvnw clean install
```

#### 2.2 Configure Environment Variables

1. Set up environment variables for Gemini AI:

On Windows (PowerShell):
```powershell
$env:GEMINI_API_KEY="your-actual-api-key-here"
$env:GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
```

On Windows (Command Prompt):
```cmd
set GEMINI_API_KEY=your-actual-api-key-here
set GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

On Unix/Linux/MacOS:
```bash
export GEMINI_API_KEY="your-actual-api-key-here"
export GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
```

For permanent setup:
- Windows: Add these variables in System Properties > Environment Variables
- Unix/Linux/MacOS: Add to `~/.bashrc` or `~/.zshrc`

#### 2.3 Run the Backend
```bash
# For Windows
mvnw.cmd spring-boot:run
# For Unix/Linux/MacOS
./mvnw spring-boot:run

# The backend will start on http://localhost:8080
```

#### 2.4 Verify Installation
```bash
# Test the health endpoint
curl http://localhost:8080/api/email/hello
# Should return: "hello world"
```

### 3. Frontend Setup (React)

#### 3.1 Basic Setup
```bash
# Navigate to frontend directory
cd email-writer-frontend

# Install dependencies
npm install

# Create development build
npm run build

# Start development server
npm run dev

# The frontend will start on http://localhost:5173
```

#### 3.2 Environment Setup (Optional)
Create `.env.local` for environment variables:
```bash
# Windows
copy nul .env.local
# Unix/Linux/MacOS
touch .env.local
```

Add the following variables if needed:
```properties
VITE_API_URL=http://localhost:8080
```

#### 3.3 Verify Installation
1. Open `http://localhost:5173` in your browser
2. You should see the email composition interface
3. Try generating an email to test the connection to the backend

### 4. Chrome Extension Setup

#### 4.1 Building the Extension
```bash
# Navigate to extension directory
cd email-writer-extension

# Install dependencies
npm install

# Build the extension
npm run build
```

#### 4.2 Installing in Chrome Development Mode
1. **Open Chrome** and navigate to `chrome://extensions/`
2. **Enable "Developer mode"** by toggling the switch in the top right corner
3. **Click "Load unpacked"** button that appears after enabling developer mode
4. **Select the extension folder**:
   - If you built the extension: Select the `dist` folder inside `email-writer-extension`
   - If using directly: Select the `email-writer-extension` folder
5. The extension will be installed and you'll see its icon in your Chrome toolbar

#### Updating the Extension
1. After making changes to the extension code:
   ```bash
   cd email-writer-extension
   npm run build
   ```
2. Go to `chrome://extensions/`
3. Find the Smart Email Assistant extension
4. Click the refresh icon (🔄) to reload the extension

#### Troubleshooting
- If the extension doesn't appear, make sure all files in `manifest.json` are present
- Check Chrome's developer console for any errors
- Try removing and re-adding the extension if updates aren't showing
- Ensure the backend server is running for the extension to work properly

## 🔧 Configuration

### Environment Variables Setup (IMPORTANT)

The backend uses environment variables for configuration. Here's how to set them up:

#### Local Development Setup

1. **Required Environment Variables**:
   ```properties
   GEMINI_API_KEY=your-actual-api-key-here
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   ```

2. **Setting Environment Variables**:

   **Windows (PowerShell)**:
   ```powershell
   $env:GEMINI_API_KEY="your-actual-api-key-here"
   $env:GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
   ```

   **Windows (Command Prompt)**:
   ```cmd
   set GEMINI_API_KEY=your-actual-api-key-here
   set GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   ```

   **Unix/Linux/MacOS**:
   ```bash
   export GEMINI_API_KEY="your-actual-api-key-here"
   export GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
   ```

3. **Permanent Setup**:

   **Windows**:
   - Open System Properties (Win + Pause/Break)
   - Click "Environment Variables"
   - Add under "System variables" or "User variables"

   **Unix/Linux/MacOS**:
   - Add to your shell's configuration file:
     ```bash
     # Add to ~/.bashrc or ~/.zshrc
     export GEMINI_API_KEY="your-actual-api-key-here"
     export GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
     ```

4. **Important Security Notes**:
   - Never commit your actual API keys to the repository
   - Keep your API keys secure and do not share them publicly
   - Consider using a key management service in production

### Backend Configuration

The backend is configured through environment variables and application properties.

#### application.properties
Located at `email-writer-backend/src/main/resources/application.properties`:
```properties
spring.application.name=email-writer
server.port=8080

# These values are replaced by environment variables
gemini.api.url=${GEMINI_API_URL}
gemini.api.key=${GEMINI_API_KEY}
```

#### Docker Configuration
If using Docker, you can pass environment variables in the docker run command:
```bash
docker run -e GEMINI_API_KEY="your-key" -e GEMINI_API_URL="your-url" -p 8080:8080 email-writer-backend
```

Or using docker-compose:
```yaml
services:
  backend:
    build: ./email-writer-backend
    environment:
      - GEMINI_API_KEY=your-key
      - GEMINI_API_URL=your-url
    ports:
      - "8080:8080"
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

#### Extension Features
The extension adds several features to Gmail:

1. **AI Reply Button**: 
   - Appears in Gmail's compose window
   - Click to generate AI-powered responses
   - Supports multiple email tones

2. **Popup Interface**:
   - Access via the extension icon in Chrome toolbar
   - Features:
     - Email content detection
     - Tone selection (formal, casual, friendly, etc.)
     - One-click generation
     - Copy to clipboard functionality

#### Usage Steps
1. Open Gmail in Chrome
2. Start composing or replying to an email
3. Use the extension in two ways:
   - Click the "AI Reply" button in Gmail's compose toolbar
   - Or use the extension popup from Chrome's toolbar
4. Select your preferred tone
5. Click "Generate Reply"
6. Review and edit the generated content as needed

#### Tips for Best Results
- Ensure the backend server is running
- Check Chrome's console (F12) if the button doesn't appear
- Allow up to 5 seconds for AI generation
- Review and customize generated content before sending

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
