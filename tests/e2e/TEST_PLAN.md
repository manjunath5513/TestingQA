# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-18T15:05:00.977Z

## Scenario: Landing page title and core branding remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  

## Scenario: Original "Run Tests" button is present and clickable  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  

## Scenario: Dashboard renders with correct task data (seeded release gate task)  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  

## Scenario: Login view renders with correct structure and target element  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "Sign In"
