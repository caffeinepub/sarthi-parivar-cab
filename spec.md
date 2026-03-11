# Sarthi Parivar Cab

## Current State
Booking form has One Way, Round Trip, Local tabs. Fleet section shows 5 vehicles with rates. No fare estimation feature exists.

## Requested Changes (Diff)

### Add
- Vehicle type selector in One Way and Round Trip forms
- Distance (km) input field in One Way and Round Trip forms
- Live fare estimate card that auto-calculates and shows breakdown
- One Way rates per vehicle type
- Round Trip rates per vehicle type with 300km/day minimum + ₹400/day driver allowance
- "Toll & Parking extra" note in all fare estimates

### Modify
- Fleet section rates updated to match new pricing
- One Way Sedan rate: ₹15/km
- Round Trip Sedan rate: ₹12/km, 300km/day average, ₹400/day driver allowance
- Other vehicles scaled proportionally

### Remove
- Nothing removed

## Implementation Plan
1. Add vehicle rate tables (one way and round trip per vehicle)
2. Add vehicle selector + distance input to One Way form
3. Add vehicle selector + distance input to Round Trip form (distance auto-fills based on days × 300km)
4. Add live fare estimate card below each form showing: base fare, driver allowance (RT only), total, toll note
5. Update fleet section display rates to match new pricing
