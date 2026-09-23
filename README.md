# HerHorizon – SafeRoute

## 🛡️ About the Project

**HerHorizon – SafeRoute** is a discreet safety web application designed to help people in unsafe domestic situations find **nearby shelters, safe transportation, emergency support, and trusted contacts** without attracting attention.

The application is disguised as a **normal calculator**. A user can enter a secret code to discreetly access the safety portal.

---

## 🚨 Problem Statement

### The Shelter Nobody Could Find in Time

A person trying to leave an unsafe domestic situation may lose critical time because they do not know:

* Which nearby shelter has available beds
* Which route is safer
* How to arrange safe transportation
* How to quickly contact trusted people
* How to share their location during an emergency

HerHorizon brings these features together in one discreet platform.

---

## 💡 Solution

HerHorizon provides a discreet **SafeRoute portal** with:

* 🏠 Real-time shelter availability
* 📍 GPS location tracking
* 🗺️ Interactive map
* 🚗 Safe transport and escort simulation
* 🆘 SOS emergency button
* 👥 Trusted guardians
* 💬 Support chat
* 📡 Location broadcasting
* 🔐 Secret access code
* 🧮 Calculator disguise
* 📞 Fake call feature
* 🚨 Siren and visual strobe
* 🛡️ Admin shelter management

---

## 🔐 Discreet Access

The application initially appears as a **calculator**.

The user can enter a secret code to unlock the SafeRoute portal.

Example:

```text
999
```

The secret code can also be changed and stored locally.

To quickly return to the calculator disguise:

```text
Escape
```

or use the disguise/exit button.

---

## ✨ Main Features

### 1. Shelter Finder

Displays nearby shelters with information such as:

* Shelter name
* Location
* Available beds
* Family units
* Security information
* Distance
* Accessibility options

---

### 2. GPS & Location

The application can use the browser's GPS to show:

* Current latitude
* Current longitude
* GPS accuracy
* Live location
* Last known location

Users can also load a sample location for demonstration.

---

### 3. Interactive Map

The map displays:

* User location
* Shelters
* Guardian/patrol locations
* Safe corridors
* Direct routes
* Radius filters

The application also provides a fallback message if the map is unavailable.

---

### 4. Safe Transportation

Users can select a shelter and request safe transportation.

A **single verification PIN** is generated and shared between the passenger and driver.

The ride confirmation interface displays:

```text
Ride Confirmed
Driver Verification Completed
Matching PIN
```

---

### 5. SOS Emergency

The SOS feature provides emergency information such as:

* Current coordinates
* GPS accuracy
* Battery level
* Emergency broadcast

The system can simulate broadcasting the SOS to guardians and patrol support.

---

### 6. Trusted Guardians

The application includes trusted contacts such as:

* Family members
* Advocates
* Safety patrol/escort units

Location updates can be broadcast to these contacts.

---

### 7. Support Chat

The support section provides quick assistance through:

* Emergency support
* Shelter-related help
* Transport assistance
* Quick questions
* Support resources

---

### 8. Safety Tools

HerHorizon includes discreet safety tools such as:

* Fake calculator interface
* Fake call
* Emergency siren
* Visual strobe
* Location broadcasting
* Quick exit

---

## 🏗️ Project Structure

```text
HerHorizon/
│
├── frontend/
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── src/
│       ├── state.js
│       ├── calculator.js
│       ├── stealth.js
│       ├── gps.js
│       ├── map.js
│       ├── shelters.js
│       ├── transit.js
│       ├── support.js
│       ├── admin.js
│       ├── safety.js
│       └── ui.js
│
├── assets/
│   └── .getkeep
│
├── README.md
└── .gitignore
```

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Leaflet.js
* Browser Geolocation API
* Web Audio API
* Speech Synthesis API
* Local Storage

---

## 📂 JavaScript Modules

| File            | Purpose                                   |
| --------------- | ----------------------------------------- |
| `state.js`      | Stores application state and data         |
| `calculator.js` | Calculator and secret-code access         |
| `stealth.js`    | Siren, strobe and fake-call features      |
| `gps.js`        | GPS and location handling                 |
| `map.js`        | Interactive map and markers               |
| `shelters.js`   | Shelter listing and filtering             |
| `transit.js`    | Safe transportation and escort simulation |
| `support.js`    | Support chat and assistance               |
| `admin.js`      | Shelter availability management           |
| `safety.js`     | SOS emergency functionality               |
| `ui.js`         | Tabs, navigation and map fallback         |

---

## ▶️ How to Run

### Option 1 – Simple Frontend

Open:

```text
frontend/index.html
```

in a browser.

### Option 2 – Local Server

Using VS Code, install **Live Server** and open:

```text
frontend/index.html
```

with Live Server.

A local server is recommended because some browser features, especially GPS, work better through a server.

---

## 🔄 Application Flow

```text
        ┌─────────────────┐
        │   Calculator    │
        │     Screen      │
        └────────┬────────┘
                 │
          Secret Code
                 │
                 ▼
        ┌─────────────────┐
        │   SafeRoute     │
        │     Portal      │
        └────────┬────────┘
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
    Shelters    GPS       SOS
       │         │         │
       ▼         ▼         ▼
     Map      Location   Guardians
       │
       ▼
  Safe Transport
       │
       ▼
  Shelter Arrival
```

---

## 🎯 Target Users

The system is designed primarily for people who need discreet access to:

* Emergency shelters
* Safe transportation
* Location sharing
* Trusted contacts
* Emergency assistance

---

## 🔮 Future Scope

Possible future improvements include:

* Real-time shelter database
* Verified shelter organizations
* Live transport availability
* Mobile application
* Secure user authentication
* Encrypted emergency communication
* Multi-language support
* AI-assisted safest-route suggestions
* Weather and traffic alerts
* Integration with emergency services
* Multi-city and multi-state support

---

## ⚠️ Prototype Disclaimer

This project is a **hackathon prototype**.

Shelter availability, GPS data, transportation, guardians, and emergency broadcasts shown in the current prototype may be simulated or locally stored.

A production version would require verified shelter organizations, secure databases, privacy protections, reliable emergency-service integrations, and appropriate safety testing.

---

## 👩‍💻 Project

**Project Name:** HerHorizon – SafeRoute
**Theme:** Safety & Technology
**Type:** Hackathon Prototype
**Platform:** Web Application

---

## ❤️ Vision

> **A safe way out should never depend on knowing where to look.**

HerHorizon aims to make critical safety information easier to access **discreetly, quickly, and securely**.

