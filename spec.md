# Sarthi Cab

## Current State
A cab booking website for 'Sarthi Parivar' with One Way, Round Trip, Local booking forms. One Way form has vehicle selection (Hatchback/Sedan/SUV) with auto distance and fare calculator. Text says 'Sarthi Parivar' and 'Maharashtra'.

## Requested Changes (Diff)

### Add
- Rate Card section inside the One Way booking tab, displayed prominently above or within the form:
  - Shows 3 vehicle options as selectable cards: Hatchback (₹13/km, 3+1 seating, 3 bags), Sedan (₹15/km, 4+1 seating, 4 bags), SUV (₹20/km, 6+1 seating, 6 bags)
  - Clicking a vehicle card selects it (updates vehicleType in form)
  - Add-on options below vehicle cards (checkboxes/toggles that add to final fare):
    - Extra Luggage: ₹150 per extra bag (with a number input for how many extra bags)
    - Pet Allowed: ₹399 (checkbox)
    - Confirmed Car 2022 and Above: ₹150 (checkbox)
  - Fare display updates dynamically to include selected add-ons

### Modify
- One Way rates: hatchback 13/km, sedan 15/km, suv 20/km (update all places in code: handleOneWaySubmit, fare display section, fare preview inline)
- 'Sarthi Parivar' → 'Sarthi Cab' everywhere (nav header, page title, footer copyright, WhatsApp message, admin panel heading, alt text, testimonials, etc.)
- 'Maharashtra' → 'Bharat' in all text (line 1027 area and footer area line 2224)

### Remove
- Nothing removed

## Implementation Plan
1. Replace all 'Sarthi Parivar' with 'Sarthi Cab' in App.tsx
2. Replace 'Maharashtra' with 'Bharat' in App.tsx
3. Update One Way per-km rates to hatchback:13, sedan:15, suv:20 in all 3 places they appear
4. Add state for add-ons in oneWayForm: extraBags (number), petAllowed (bool), confirmedCar (bool)
5. Replace the vehicle type Select dropdown in One Way form with clickable rate cards showing vehicle, rate, seating, bags
6. Add add-on checkboxes below rate cards
7. Update fare calculation in fare preview and handleOneWaySubmit to add: extraBags×150 + (petAllowed ? 399 : 0) + (confirmedCar ? 150 : 0)
8. Validate and build
