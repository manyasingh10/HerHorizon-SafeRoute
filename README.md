# HerHorizon

### The Shelter Nobody Could Find in Time

HerHorizon is a safety-focused web application designed to help a person in an emergency quickly find nearby shelters, check available beds, access safer transportation, share location with trusted contacts, and use emergency safety tools.

The application is designed with a calculator-style interface as the initial screen so that the safety features are not immediately visible.

---

## Features

### 🔢 Disguised Calculator

The application initially opens as a normal calculator.

- Basic calculator operations
- Calculator-style interface
- Hidden SafeRoute access
- Custom stealth passcode
- Passcode stored locally in the browser
- Quick exit back to the calculator screen

---

### 🏠 Emergency Shelters

Users can view available shelters and their information.

The shelter interface includes:

- Available beds
- Family units
- Shelter location
- Security information
- Distance from the user's location
- Accessibility information
- Pet-friendly shelters
- Nearby and farther shelter options
- Bed reservation / temporary hold

The application includes sample shelter data for demonstration.

---

### 📍 GPS Location

HerHorizon can use the browser's GPS functionality to determine the user's current location.

The GPS section provides:

- Latitude
- Longitude
- Accuracy
- Live GPS status
- Automatic pickup location
- Location refresh
- Map centering

If GPS is unavailable, the application can continue using the last known/sample location.

---

### 🗺️ Safety Map

The map interface uses Leaflet.

It can display:

- User location
- Shelter locations
- Guard kiosks
- Safety corridors
- Direct routes
- Location accuracy radius

The application also provides an offline/fallback state when the map service is unavailable.

---

### 🚗 Safe Transportation

Users can select a shelter and request a safe ride.

The transportation system includes:

- Shelter destination selection
- Safe ride request
- Driver verification
- Single matching PIN
- Driver PIN display
- Passenger verification
- Free ride/voucher flow
- Transit simulation

The same verification PIN is displayed to the passenger and driver for matching.

---

### 👥 Trusted Guardians

Users can view trusted contacts such as:

- Family members
- Advocates
- Escort units

Available actions include:

- Call
- Ping
- Location sharing

---

### 🆘 Emergency / SOS

The SOS system provides an emergency interface containing:

- Current coordinates
- GPS accuracy
- Battery information
- Emergency broadcast

The interface also contains additional emergency tools such as:

- Silent beacon
- Siren
- Visual strobe
- Fake call
- Guardian broadcast

---

### 💬 Support Chat

The support section provides a simple emergency support chat interface.

It can help users with:

- Shelter requests
- Transportation
- Counseling
- Callback requests
- Emergency support

The interface also provides quick-action buttons for common requests.

---

### 🛡️ Safety & Privacy

The project focuses on minimizing the visibility of help-seeking activity.

The interface includes:

- Calculator-style disguise
- Stealth passcode
- Quick exit
- Silent emergency tools
- Disguised callback functionality
- Location sharing with trusted contacts

> **Important:** This project is a prototype/demo. The current implementation should not be treated as a production-grade secure or anonymous emergency service.

---

# Project Structure

```text
HerHorizon/
│
├── frontend/
│   ├── index.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── src/
│       ├── state.js
│       ├── calculator.js
│       ├── ui.js
│       ├── gps.js
│       ├── map.js
│       ├── shelters.js
│       ├── transit.js
│       ├── support.js
│       ├── admin.js
│       ├── stealth.js
│       └── safety.js
│
├── backend/
│   ├── herhorizon.py
│   ├── requirements.txt
│   └── ...
│
├── assets/
│   └── icons/
│
├── README.md
└── .gitignore
# 🔐 THE CORE INNOVATION — DISCREET DISGUISE

Unlike a normal shelter directory, our platform is designed to **hide the sensitive purpose of the service during ordinary inspection of the device**.

Instead of presenting itself as:

> ❌ "Domestic Violence Shelter Finder"

the visible experience can resemble an ordinary utility such as:

> **Daily Planner / Travel Assistant / Personal Organizer**

The protected assistance functionality is accessed through a discreet interaction.

### Example

```text
┌─────────────────────────────┐
│       DAILY PLANNER         │
│                             │
│  Today's Tasks              │
│                             │
│  □ College                  │
│  □ Shopping                 │
│  □ Travel                   │
│  □ Personal Tasks           │
│                             │
│          [Continue]         │
└──────────────┬──────────────┘
               │
               │ Discreet Entry
               ▼
┌─────────────────────────────┐
│       TRAVEL ASSISTANCE     │
│                             │
│  Nearby assistance          │
│  Available places           │
│  Transport options          │
│  Emergency support          │
└─────────────────────────────┘
```

The **visible identity** is neutral, while the protected workflow provides access to assistance.

---

# 🕵️ What Does "Discreet" Mean?

The project considers multiple layers of exposure.

### 1. Neutral App Identity

The application should avoid sensitive branding such as:

* "Domestic Violence"
* "Women's Shelter"
* "Emergency Shelter"

Instead, the visible identity can use a neutral utility concept.

---

### 2. Neutral App Icon

The icon should not visually indicate:

* Domestic violence
* Abuse
* Shelters
* Emergency services

It should resemble an ordinary utility application.

---

### 3. Neutral Landing Page

The first screen should not immediately display:

> "Find a Domestic Violence Shelter"

Instead, it presents a normal-looking utility interface.

---

### 4. Neutral Page Metadata

Sensitive terminology should be avoided in visible:

* Page titles
* Favicon
* Interface labels
* Notifications
* Non-essential URLs
* Search parameters

---

### 5. Minimal Local Data

The application should avoid unnecessarily storing:

* Shelter searches
* Exact locations
* Route history
* Sensitive user profiles
* Search history inside the application

Temporary information can be cleared when no longer required.

---

# ⚠️ Important Privacy Limitation

A web application **cannot guarantee that absolutely no trace exists on a monitored device**.

For example, the application cannot fully control:

* Browser history
* DNS/network logs
* Device monitoring software
* Screenshots
* Keyboard monitoring
* ISP/network records
* Operating-system backups

Therefore, our technical goal is:

> **To minimize application-generated traces and prevent the application's visible interface from revealing the sensitive purpose during ordinary inspection.**

This makes the privacy claim realistic and technically defensible.

---

# 🏠 REAL-TIME SHELTER AVAILABILITY

Once the user discreetly enters the assistance workflow, the system can show participating shelters based on current availability.

### Example

```text
Nearby Assistance

┌─────────────────────────────┐
│ Location A                  │
│ Beds: AVAILABLE             │
│ Distance: 3.2 km            │
│ Status: OPEN                │
│                             │
│       [View Options]        │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Location B                  │
│ Beds: LIMITED               │
│ Distance: 5.1 km            │
│ Status: OPEN                │
│                             │
│       [View Options]        │
└─────────────────────────────┘
```

Shelter information should come from **authorized participating organizations**.

---

# 🗺️ SAFER TRANSPORT OPTIONS

Finding a shelter is only part of the problem.

The platform also helps the user understand available transport options.

Possible options include:

* 🚕 Verified transport partners
* 🚌 Public transportation
* 🚗 Emergency transportation
* 🚶 Walking options where appropriate
* 📍 Trusted pickup locations

The system can consider:

* Distance
* Available transport
* Time
* User-selected constraints

---

# 🆘 EMERGENCY SUPPORT

A quick-access emergency section can provide:

* Emergency service information
* Trusted contacts
* Partner organizations
* Immediate safety guidance
* Relevant helplines

The emergency workflow should require as few steps as practical.

---

# 🔄 COMPLETE USER FLOW

```text
                 USER
                   │
                   ▼
        ┌─────────────────────┐
        │   Neutral Interface │
        │   "Daily Utility"   │
        └──────────┬──────────┘
                   │
             Discreet Entry
                   │
                   ▼
        ┌─────────────────────┐
        │ Protected Assistance│
        │      Interface      │
        └──────────┬──────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
   Shelter Search       Transport Search
          │                  │
          ▼                  ▼
   Current Availability  Safer Options
          │                  │
          └────────┬─────────┘
                   ▼
           Emergency Support
                   │
                   ▼
              SAFE ARRIVAL
```

---

# 🧠 WHY THIS IS DIFFERENT

A traditional shelter directory answers:

> **"Where are shelters?"**

Our system aims to answer:

> **"Where might I be able to go right now, and how can I get there while minimizing the risk created by searching for help?"**

The innovation is therefore not just a database of shelters.

It combines:

### **Disguise + Availability + Transport + Privacy**

---

# 🏗️ SYSTEM ARCHITECTURE

```text
                         USER
                          │
                          ▼
                ┌──────────────────┐
                │  Neutral Frontend│
                │   Discreet UI    │
                └────────┬─────────┘
                         │
                   Secure Request
                         │
                         ▼
                ┌──────────────────┐
                │     BACKEND      │
                │  Flask/FastAPI   │
                └───────┬───┬──────┘
                        │   │
             ┌──────────┘   └──────────┐
             ▼                         ▼
     ┌───────────────┐        ┌────────────────┐
     │ Shelter DB    │        │ Transport/Map  │
     │               │        │ Service        │
     └───────┬───────┘        └───────┬────────┘
             │                        │
             └───────────┬────────────┘
                         ▼
                ┌──────────────────┐
                │ Assistance Engine│
                └──────────────────┘
```

---

# 👥 USER ROLES

## 👤 User

Can:

* Access the discreet interface
* Find participating shelters
* Check availability
* View transport options
* Access emergency resources

No unnecessary personal account should be required for basic discovery.

---

## 🏠 Shelter Administrator

Can securely:

* Log in
* Update available beds
* Update shelter status
* Update operating information

---

## 🛠️ System Administrator

Can:

* Verify participating organizations
* Manage shelter accounts
* Control permissions
* Monitor system health

---

# 🗄️ SHELTER DATABASE

Example structure:

```text
Shelter
│
├── Shelter ID
├── Organization
├── Approximate Location
├── Capacity
├── Available Beds
├── Operating Status
├── Eligibility Information
└── Last Updated
```

Sensitive shelter information should only be exposed where appropriate and where doing so does not create security risks for residents.

---

# 🔐 SECURITY & PRIVACY

Privacy is a **core architecture requirement**, not an additional feature.

### Data Minimization

Collect only information required for the service.

### Secure Communication

Use HTTPS/TLS for communication.

### Role-Based Access

Only authorized organizations can modify shelter availability.

### Secure Authentication

Administrative accounts should use secure authentication and password hashing.

### No Sensitive Information in URLs

Sensitive search terms, personal information, and exact locations should not be unnecessarily placed in URLs.

### Minimal Logging

Avoid storing sensitive searches or location history unless there is a clearly defined operational reason and appropriate safeguards.

---

# 💻 TECHNOLOGY STACK

## Frontend

* HTML
* CSS
* JavaScript
* React.js *(optional)*

## Backend

* Python
* Flask / FastAPI

## Database

* PostgreSQL / MySQL

## Maps

* OpenStreetMap
* Leaflet / MapLibre

## Security

* HTTPS
* Secure sessions
* Password hashing
* Role-Based Access Control

---

# 📱 PROTOTYPE SCREENS

The hackathon prototype can contain:

### Screen 1 — Neutral Interface

```text
┌────────────────────────┐
│    PERSONAL PLANNER    │
│                        │
│ Today's Schedule       │
│ □ College              │
│ □ Shopping             │
│ □ Travel               │
│                        │
│       [Continue]       │
└────────────────────────┘
```

### Screen 2 — Assistance

```text
┌────────────────────────┐
│   TRAVEL ASSISTANCE    │
│                        │
│ Nearby Options         │
│                        │
│ ● Available            │
│ ● Limited              │
│                        │
│ [View Options]         │
└────────────────────────┘
```

### Screen 3 — Shelter Availability

```text
┌────────────────────────┐
│    AVAILABLE OPTIONS   │
│                        │
│ Location A             │
│ Available              │
│ 3.2 km                 │
│                        │
│ Location B             │
│ Limited                │
│ 5.1 km                 │
└────────────────────────┘
```

### Screen 4 — Transport

```text
┌────────────────────────┐
│   TRANSPORT OPTIONS    │
│                        │
│ 🚕 Verified Transport  │
│ 🚌 Public Transport    │
│ 🚗 Emergency Transport │
│                        │
│ [Continue]             │
└────────────────────────┘
```

---

# 🌍 TARGET USERS

The system is designed primarily for:

* Domestic violence survivors
* People trying to leave unsafe situations
* Vulnerable individuals seeking emergency accommodation
* NGOs
* Shelter organizations
* Social workers
* Emergency-support organizations

---

# 🎯 IMPACT

The project aims to reduce:

* ⏱️ Time spent searching for help
* ❓ Uncertainty about shelter availability
* 🚶 Unnecessary travel between unavailable shelters
* 🔎 Exposure created by obvious shelter searches
* 📱 Dependence on scattered information

---

# 🚀 FUTURE SCOPE

## 🤖 AI-Assisted Route Information

AI could help organize available transport and route information based on user-selected requirements.

---

## 📱 Mobile Application

A dedicated mobile application could provide faster access to the service.

---

## 🌐 Multi-City Network

Connect verified shelters across multiple cities and states.

---

## 🗣️ Multilingual Support

Support regional languages to improve accessibility.

---

## 📡 Limited-Connectivity Support

Provide essential information during poor network conditions.

---

## 🤝 NGO & Shelter Network

Build a verified network of:

```text
Shelters
   +
NGOs
   +
Transport Partners
   +
Emergency Support Organizations
```

---

# ⚠️ REAL-WORLD DEPLOYMENT

This hackathon prototype is not a replacement for professional emergency services.

A real deployment would require partnerships with:

* Verified shelters
* NGOs
* Transport providers
* Emergency organizations
* Relevant authorities

Shelter availability must be maintained by authorized organizations because incorrect information could create serious safety risks.

The system must also carefully protect shelter locations and resident information.

---

# 🏆 HACKATHON VALUE PROPOSITION

### The Problem

> **"I need somewhere safe to go, but I don't know where I can actually go right now."**

### The Solution

> **A discreet platform that connects people with participating shelters that may have current availability, along with transport and emergency-support information.**

### The Innovation

> **We don't only solve the problem of finding a shelter. We address the risk that searching for help can itself reveal someone's situation.**

---

# 🔥 ONE-LINE PITCH

> **"Find a safe place without making the search itself unsafe."**

---

# 🎯 VISION

### **No one should lose critical hours searching for a safe place when they are trying to escape danger.**

**The Shelter Nobody Could Find in Time** aims to make emergency shelter discovery **faster, more discreet, privacy-conscious, and connected to real-world support.**
