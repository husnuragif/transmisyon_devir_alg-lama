 # SCADA Transmission Revolution Calculator

A retro SCADA/ADAMView-style web application for calculating transmission revolution based on user input parameters. This version is built with simple HTML, CSS, and JavaScript—no frameworks or build tools required.

## Features
- **Inputs:**
  - Wheel Gear (numeric)
  - Norton Gear (numeric)
  - Wheel Ratio (auto-calculated)
  - Gear Ratio (selectable from dropdown)
  - Plate (text/numeric)
  - Seed Spacing (numeric)
  - Date/Time (auto-updating)
- **Output:**
  - Transmission Revolution = Wheel Ratio × Gear Ratio (auto-calculated)
- **Buttons:**
  - RECORD: Save the current values to a record list
  - RESET: Reset all fields to default values
- **Extras:**
  - Responsive design for mobile and desktop
  - Retro SCADA/ADAMView look (gray, green, red, blocky UI)

## How to Use
1. Open `public/index.html` in your web browser.
2. Enter values for Wheel Gear, Norton Gear, Plate, and Seed Spacing.
3. Select a Gear Ratio from the dropdown.
4. The Wheel Ratio and Transmission Revolution will be calculated automatically.
5. Click **RECORD** to save the current values to the record list below.
6. Click **RESET** to clear all fields and start over.

## File Structure
- `public/index.html` — Main HTML file for the app UI
- `public/style.css` — SCADA-style CSS for layout and colors
- `public/script.js` — Handles all calculations, time updates, and button logic

## No Build Needed
Just open `index.html` directly in your browser. No installation or server required.

## Screenshot
![screenshot](screenshot.png)

---

**Created for demonstration and educational purposes.**