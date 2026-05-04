# 💻 macOS Desktop Portfolio

This is a **React-based** portfolio engineered to mimic the **macOS** desktop environment. It uses a custom WindowWrapper component to display content (like the resume) in movable, resizable application windows, complemented by a Dock and Menu Bar for authentic navigation and styling.

### ✨ Key Features

* **Authentic macOS UI:** Custom styling for the Dock, Menu Bar, and window chrome (traffic light controls).
* **Multiple Theme Support:** Seamlessly switch between Light, Dark, and System themes. The System theme automatically adapts to your device's appearance preferences, ensuring optimal viewing comfort at any time of day while maintaining the authentic macOS aesthetic across all theme modes.
* **Draggable & Resizable Windows:** Content components are wrapped in a custom HOC (`WindowWrapper`), allowing users to move and manage application windows like a real OS.
* **Resume Viewer:** Integrates `react-pdf` to display the resume document directly within a dedicated desktop application window.
* **Dynamic Navigation:** The Dock acts as the main navigation hub, launching specific content windows (About, Projects, Contact, etc.).
* **Responsive Design:** Maintains desktop fidelity while remaining usable on smaller screens.

### 🖼️ Screenshots

![Screenshot of the macOS themed portfolio showing open windows and the dock.](/preview.png)


### 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React.js | Core library for building the single-page application. |
| **Styling** | [Tailwind CSS / Styled Components / etc.] | Used for rapid, utility-first styling and achieving the macOS aesthetic. |
| **PDF Viewing** | `react-pdf` | Library for rendering PDF documents. |
| **Icons** | `lucide-react` | Modern, simple, and customizable open-source icons. |
| **Window Mgmt** | `react-draggable` / `react-rnd` | Libraries for handling drag and resize functionality (if applicable). |

### 🚀 Getting Started

Follow these steps to set up the project locally.

#### Prerequisites

* Node.js (v18+)
* npm or yarn

#### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adnan-bhaldar/My-Portfolio.git
    cd My-Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will now be running on `http://localhost:5173` (or similar).

### 📂 File Structure

Key files and folders to note:

```

My-Portfolio/ 
├── node_modules/ 
├── public/
│     ├── files/
│     │     └── resume.pdf 
│     ├── icons/ 
│     ├── images/  
│     ├── macbook.png 
│     └── vite.svg  
├── src/ 
│     ├── assets/ 
│     ├── components/ 
│     │      ├── Dock.jsx 
│     │      ├── Home.jsx 
│     │      ├── index.js 
│     │      ├── NavBar.jsx  
│     │      ├── Welcome.jsx 
│     │      └── WindowControls.jsx 
│     ├── constants/ 
│     │      └── index.js 
│     ├── hoc/ 
│     │      └── WindowWrapper.jsx 
│     ├── hooks/
│     │      └── useTheme.js 
│     ├── store/ 
│     │      ├── location.js 
│     │      └── window.js
│     ├── windows/ 
│     │      ├── Contact.jsx 
│     │      ├── Finder.jsx 
│     │      ├── Image.jsx 
│     │      ├── index.js 
│     │      ├── Photos.jsx 
│     │      ├── Resume.jsx 
│     │      ├── Safari.jsx 
│     │      ├── Terminal.jsx 
│     │      └── Test.jsx
│     ├── App.jsx 
│     ├── index.css 
│     └── main.jsx 
├── .gitignore 
├── README.md
├── index.html 
├── jsconfig.json 
├── tailwind.config.js
├── package.json 
├── package-lock.json 
├── preview.png 
└── vite.config.js 

```
