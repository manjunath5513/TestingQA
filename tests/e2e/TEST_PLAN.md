# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-26T06:54:55.202Z

## Scenario: Landing page title and core branding remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  

## Scenario: Original Run Tests button is present and clickable  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  
3. Assert page contains "Tests queued successfully."  

## Scenario: Dashboard renders with correct seeded task data  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  
4. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"  

## Scenario: Login view uses correct container ID and renders without broken JSX  
1. Navigate to http://127.0.0.1:4173  
2. Click "Sign In"  
3. Assert element with id="app" exists  
4. Assert page contains "Sign In"
