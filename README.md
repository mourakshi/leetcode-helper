# 🔍 LeetCode AI Helper - Chrome Extension

<p align="center">
  ![image](https://github.com/user-attachments/assets/20e5c6d5-ec50-4421-bc76-8ab4989e3d8e)

  <br>
  <em>Your AI-powered LeetCode companion right in the browser</em>
</p>

![Chrome Web Store](https://img.shields.io/badge/Chrome_Extension-v1.0-blue?logo=google-chrome)
![License](https://img.shields.io/badge/License-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

## ✨ Features

**Smart Integration**
- 🎯 Auto-detects LeetCode problems
- 🤖 Gemini AI-powered solutions
- 📝 Detailed explanations with complexity analysis

**User Experience**
- 🖱️ One-click solution generation
- 🔒 Secure API key management
- 🎨 Clean, intuitive interface

## 🚀 Installation

### Prerequisites
- Google Chrome (latest version recommended)
- [Gemini API key](https://ai.google.dev/)

### Quick Setup
```
git clone https://github.com/your-repo/LeetCodeAIHelper.git
cd LeetCodeAIHelper
```
1. Open Chrome and navigate to chrome://extensions

2. Enable Developer mode (top-right toggle)

3. Click Load unpacked and select the cloned folder

4. Pin the extension from Chrome's toolbar

## 🛠️ Usage

### 🔧 First-Time Configuration

1. **Access Options**  
   Right-click the extension icon in your toolbar and select `Options`  
   *(or click the extension icon then the gear ⚙️ button)*

2. **Enter API Key**  
   ```plaintext
   ┌───────────────────────────────────────┐
   │  🔑 Gemini API Key:                   │
   │  ┌─────────────────────────────────┐  │
   │  │                                 │  │
   │  └─────────────────────────────────┘  │
   │                                       │
   │  [✔️ Save Settings]    [❌ Cancel]     │
   └───────────────────────────────────────┘
   Get your key from Google AI Studio
   ```
3. Save Settings

-Click Save Settings

-Look for the green confirmation toast:
✅ Settings saved successfully!

## 🧠 Getting AI Solutions
![deepseek_mermaid_20250709_35a225](https://github.com/user-attachments/assets/b4453e47-0b3e-494d-94d2-f3efa7766e80)

## 🐛 Troubleshooting

### Common Issues and Solutions

| Symptom               | Solution Steps                                                                 | Additional Notes                                                                 |
|-----------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **❌ API Key Errors**  | 1. Verify key at [Google AI Studio](https://ai.google.dev/)<br>2. Update in extension options<br>3. Reload extension | 🔑 Key should start with `AIza...` |
| **🔍 Problem Not Detected** | 1. Ensure URL matches `leetcode.com/problems/...`<br>2. Refresh page (Ctrl+F5)<br>3. Login to LeetCode | Works on all problem types (easy/medium/hard) |
| **🌀 Extension Crashes** | 1. Disable/re-enable extension<br>2. Clear browser cache<br>3. [Reinstall extension](#installation) | Try Chrome's `Reset settings` if persistent |

```mermaid
graph LR
    A[Issue Occurred] --> B{Type?}
    B -->|API| C[Check Key]
    B -->|Detection| D[Verify URL]
    B -->|Crash| E[Reinstall]
    C --> F[Update Key]
    D --> G[Refresh]
    E --> H[Clear Cache]
```
## 🧩 File Structure



