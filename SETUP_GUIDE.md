# DESN Application Setup Guide for Windows

This guide will help you set up and run the DESN application on your Windows PC. No prior experience with React, Node.js, or GitHub required!

## Table of Contents

1. [Prerequisites - Installing Required Software](#prerequisites)
2. [Cloning the Project](#cloning-the-project)
3. [Setting Up the Backend (Java)](#backend-setup)
4. [Setting Up the Frontend (React)](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, you'll need to install the following software on your Windows PC:

### 1. Install Git

Git is a version control system that lets you download and manage code from GitHub.

1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use all default settings (just keep clicking "Next")
4. When complete, open **Command Prompt** or **PowerShell** and verify installation:
   ```
   git --version
   ```
   You should see something like `git version 2.x.x`

### 2. Install Java 21

The backend runs on Java 21 (Long Term Support version).

1. Download Java 21 from: https://adoptium.net/temurin/releases/?version=21
   - Select **Windows** as Operating System
   - Select **x64** as Architecture
   - Download the **.msi** installer
2. Run the installer
3. **CRITICAL:** During installation, make sure to check these options:
   - ✅ **"Set JAVA_HOME variable"** - This is REQUIRED!
   - ✅ **"Add to PATH"** - This should be checked by default
4. Complete the installation
5. **Close any open Command Prompt/PowerShell windows** and open a **NEW** one
6. Verify Java is installed:
   ```
   java -version
   ```
   You should see `openjdk version "21.x.x"`
   
7. **IMPORTANT:** Verify JAVA_HOME is set:
   
   **In PowerShell:**
   ```powershell
   echo $env:JAVA_HOME
   ```
   
   **In Command Prompt:**
   ```cmd
   echo %JAVA_HOME%
   ```
   
   Should show something like: `C:\Program Files\Eclipse Adoptium\jdk-21.0.8-hotspot`
   
   **If it's blank or not set, see the troubleshooting section below!**

### 3. Install Node.js

Node.js runs the frontend React application.

1. Download Node.js from: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows Installer (.msi) for 64-bit
2. Run the installer
3. Use all default settings
4. After installation, open a **new** Command Prompt and verify:
   ```
   node --version
   npm --version
   ```
   You should see version numbers for both commands

### 4. Install a Code Editor (Optional but Recommended)

Visual Studio Code is a free, beginner-friendly code editor.

1. Download from: https://code.visualstudio.com/
2. Install with default settings
3. You can open the project in VS Code later for editing files

---

## Cloning the Project

Now let's download the project code from GitHub.

### Step 1: Create a Workspace Folder

1. Open **File Explorer**
2. Navigate to a location where you want to store the project (e.g., `C:\Users\YourName\Projects`)
3. Create a new folder called `Projects` if it doesn't exist

### Step 2: Open Command Prompt

1. Hold **Shift** and **Right-click** inside the `Projects` folder
2. Select **"Open PowerShell window here"** or **"Open Command window here"**

### Step 3: Clone the Repository

In the command window, type:

```
git clone https://github.com/JordisGithub/desn.git
```

This will download all the project files into a new folder called `desn`.

### Step 4: Navigate into the Project

```
cd desn
```

You're now inside the project folder!

---

## Backend Setup

The backend is a Java Spring Boot application that provides APIs for the frontend.

### Step 1: Navigate to Backend Folder

```
cd backend
```

### Step 2: Build the Backend

This compiles the Java code and downloads necessary dependencies (this may take a few minutes the first time).

**IMPORTANT:** If you're using **PowerShell** (the default in Windows 11), you MUST type `.\` before the command!

**On Windows PowerShell (most common):**

```powershell
.\mvnw.cmd clean package -DskipTests
```

**On Windows Command Prompt:**

```cmd
mvnw.cmd clean package -DskipTests
```

> **Note:** The `.\` tells PowerShell to run a file in the current directory. Without it, you'll get an error saying the command is not recognized.

Wait for it to complete. You should see `BUILD SUCCESS` at the end.

### Step 3: Go Back to Project Root

```
cd ..
```

---

## Frontend Setup

The frontend is a React application built with Vite.

### Step 1: Install Dependencies

From the project root (the `desn` folder), run:

```
npm install
```

This downloads all the JavaScript libraries needed for the frontend. It may take 2-5 minutes.

Wait for it to complete without errors.

---

## Running the Application

You'll need **TWO** separate command windows - one for backend, one for frontend.

### Step 1: Start the Backend

1. Open a **new** Command Prompt or PowerShell window
2. Navigate to the backend folder:

   ```
   cd C:\Users\YourName\Projects\desn\backend
   ```

   (Replace `YourName` with your actual username)

3. Start the backend server:

   **IMPORTANT:** Remember to use `.\` if you're in PowerShell!

   **On PowerShell (most common):**

   ```powershell
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   ```

   **On Command Prompt:**

   ```cmd
   mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   ```

4. Wait for the backend to start. You'll see messages in the console. When you see:

   ```
   Started ProxyApplication in X.XXX seconds
   ```

   The backend is ready! **Keep this window open.**

5. The backend runs on: **http://localhost:8080**

### Step 2: Start the Frontend

1. Open a **second** Command Prompt or PowerShell window (keep the first one running!)
2. Navigate to the project root:

   ```
   cd C:\Users\YourName\Projects\desn
   ```

3. Start the frontend development server:

   ```
   npm run dev
   ```

4. Wait for it to start. You'll see:

   ```
   ➜  Local:   http://localhost:5173/
   ```

5. The frontend runs on: **http://localhost:5173**

### Step 3: Open the Application

1. Open your web browser (Chrome, Edge, or Firefox)
2. Go to: **http://localhost:5173**
3. You should see the DESN website!

**🎉 Congratulations! The application is now running!**

---

## Using the Application

### Default Test Accounts

The application comes with pre-configured test accounts:

**Admin Account:**

- Username: `admin`
- Password: `admin123`
- Can access: Admin Dashboard with all data

**Member Account:**

- Username: `member`
- Password: `member123`
- Can access: Member Dashboard with favorites and event registrations

### Sample Data Included

The application includes sample data:

- 6 Resources/Publications
- 3 Events
- 2 Membership Applications
- 2 Volunteer Applications
- 3 Donation Transactions

---

## Stopping the Application

When you're done working:

1. In the **frontend** command window: Press `Ctrl + C`, then type `Y` and press Enter
2. In the **backend** command window: Press `Ctrl + C`, then type `Y` and press Enter

Both servers will stop.

---

## Troubleshooting

### "mvnw.cmd is not recognized" or "The term 'mvnw.cmd' is not recognized"

**This is the most common error!** You're using PowerShell and forgot the `.\` prefix.

**Solution:** Add `.\` before the command:

```powershell
.\mvnw.cmd clean package -DskipTests
```

**Why?** In PowerShell, you must use `.\` to run executables in the current directory. Command Prompt doesn't need this.

**How to tell which one you're using:**
- PowerShell prompt looks like: `PS C:\Users\YourName\Projects\desn\backend>`
- Command Prompt looks like: `C:\Users\YourName\Projects\desn\backend>`

### "mvn not found in PATH — using Dockerized Maven" or "'docker' is not recognized"

**This error means:** The Maven wrapper can't find Java or Maven, so it's trying to use Docker (which you also don't have).

**Root Cause:** Your `JAVA_HOME` environment variable is not set correctly.

---

#### QUICK FIX (Temporary - Works Immediately!)

If you need to get running RIGHT NOW, you can set JAVA_HOME temporarily in your current PowerShell window:

1. First, check what Java version you have:
   ```powershell
   java -version
   ```
   **You MUST have Java 21!** If you see Java 17 or another version, that's the problem.

2. Find ALL Java installations on your system:
   ```powershell
   where.exe java
   ```
   This might show multiple paths. Look for one with **`jdk-21`** in the path.
   
   Example output:
   ```
   C:\Program Files\Eclipse Adoptium\jdk-21.0.8-hotspot\bin\java.exe
   C:\Program Files\Java\jdk-17.0.5\bin\java.exe  ← OLD VERSION, don't use this!
   ```

3. Set JAVA_HOME to point to Java 21 ONLY:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.8-hotspot"
   ```
   **Important:** 
   - Remove the `\bin\java.exe` part - only use the path up to the `jdk-21.x.x-hotspot` folder!
   - Make sure it's the Java 21 path, NOT Java 17 or any other version!

4. Verify it's set correctly:
   ```powershell
   echo $env:JAVA_HOME
   ```
   Should show the Java 21 path.

5. Verify Java 21 is being used:
   ```powershell
   & "$env:JAVA_HOME\bin\java.exe" -version
   ```
   Should show `openjdk version "21.x.x"`

6. Now run the Maven command:
   ```powershell
   .\mvnw.cmd clean package -DskipTests
   ```

**Note:** This only works in the current PowerShell window. When you close it, you'll need to do this again. For a permanent fix, see the solution below.

**If you have multiple Java versions:** The old Java 17 might be first in your PATH. The temporary JAVA_HOME setting above will override it, but for a permanent fix, you should either:
- Set JAVA_HOME permanently in system environment variables (see PERMANENT FIX below)
- Or uninstall the old Java 17 version

---

#### PERMANENT FIX (Recommended)

**Solution:**

1. First, verify Java is installed:
   ```powershell
   java -version
   ```
   If this works, Java is installed but `JAVA_HOME` isn't set.

2. Find your Java installation path:
   - It's usually: `C:\Program Files\Eclipse Adoptium\jdk-21.0.x-hotspot`
   - Or check in: `C:\Program Files\Java\`

3. Set the `JAVA_HOME` environment variable:
   - Press **Windows Key** and search for "Environment Variables"
   - Click **"Edit the system environment variables"**
   - Click **"Environment Variables"** button
   - Under **"System variables"**, click **"New"**
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-21.0.8-hotspot` (use your actual path)
   - Click **OK** on all windows

4. **IMPORTANT:** Close ALL PowerShell/Command Prompt windows and open a NEW one

5. Verify it's set:
   ```powershell
   echo $env:JAVA_HOME
   ```
   Should show your Java path.

6. Now try the Maven command again:
   ```powershell
   cd C:\Users\YourName\Projects\desn\backend
   .\mvnw.cmd clean package -DskipTests
   ```

### "java -version" shows Java 17 (or wrong version) but I installed Java 21

**Problem:** You have multiple Java versions installed, and the system is using the old one.

**Solution:**

1. Find all Java installations:
   ```powershell
   where.exe java
   ```

2. Check which version each path points to:
   ```powershell
   "C:\Program Files\Eclipse Adoptium\jdk-21.0.8-hotspot\bin\java.exe" -version
   ```

3. **Option A - Set JAVA_HOME to override (Recommended):**
   - Follow the "PERMANENT FIX" section above to set JAVA_HOME to the Java 21 path
   - This will make Maven use Java 21 even if Java 17 is in PATH

4. **Option B - Uninstall old Java (Clean approach):**
   - Go to Windows Settings → Apps → Installed Apps
   - Search for "Java" or "JDK"
   - Uninstall any Java 17 or older versions
   - Keep only Java 21

5. After fixing, verify:
   ```powershell
   echo $env:JAVA_HOME
   java -version
   ```
   Both should point to Java 21.

### "Command not found" or "'git' is not recognized"

- You need to close and reopen your Command Prompt after installing software
- Or restart your computer to refresh environment variables

### "Port 8080 is already in use"

Another program is using port 8080. To find and stop it:

1. Open Command Prompt as Administrator
2. Run: `netstat -ano | findstr :8080`
3. Note the PID (Process ID) number at the end
4. Run: `taskkill /PID <number> /F` (replace `<number>` with the actual PID)

### "Port 5173 is already in use"

Similar to above, but use port 5173 instead of 8080.

### Backend won't start - "JAVA_HOME not set"

1. Open **System Properties** → **Advanced** → **Environment Variables**
2. Under **System Variables**, click **New**
3. Variable name: `JAVA_HOME`
4. Variable value: `C:\Program Files\Eclipse Adoptium\jdk-21.x.x-hotspot` (check your actual path)
5. Click OK and restart Command Prompt

### Frontend shows blank page or errors

1. Make sure the backend is running first
2. Try clearing browser cache (Ctrl + Shift + Delete)
3. Check browser console for errors (Press F12)

### "npm install" fails

1. Make sure you have internet connection
2. Try running as Administrator
3. Delete the `node_modules` folder and try again

### General Tips

- Always keep both command windows open while using the app
- If something goes wrong, stop both servers (Ctrl + C) and restart them
- The backend must start successfully before the frontend will work properly

---

## Next Steps

Once you have the application running:

1. **Explore the code**: Open the project in Visual Studio Code to see the files
2. **Learn the structure**:
   - `backend/src/main/java/` - Java backend code
   - `src/` - React frontend code
   - `src/components/` - Reusable UI components
   - `src/views/` - Main pages
3. **Make changes**: Try editing files and see the changes refresh automatically in the browser!
4. **Read the docs**: Check the `docs/` folder for detailed documentation about features

---

## Getting Help

If you run into issues:

1. Check the console output in both command windows for error messages
2. Check the `README.md` file for additional information
3. Review documentation in the `docs/` folder
4. Ask your team for help!

---

## Quick Reference

### Daily Development Workflow

1. Open TWO PowerShell or Command Prompt windows
2. Window 1 - Backend:
   
   **PowerShell:**
   ```powershell
   cd C:\Users\YourName\Projects\desn\backend
   .\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   ```
   
   **Command Prompt:**
   ```cmd
   cd C:\Users\YourName\Projects\desn\backend
   mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
   ```

3. Window 2 - Frontend:
   ```
   cd C:\Users\YourName\Projects\desn
   npm run dev
   ```
4. Open browser to: http://localhost:5173
5. When done: Press `Ctrl + C` in both windows

> **Remember:** If using PowerShell, always add `.\` before `mvnw.cmd`!

### Useful Commands

**Check if Git is installed:**

```
git --version
```

**Check if Java is installed:**

```
java -version
```

**Check if Node is installed:**

```
node --version
npm --version
```

**Update project with latest changes from GitHub:**

```
git pull
```

**See what files you've changed:**

```
git status
```

---

**Welcome to the DESN project! Happy coding! 🚀**
