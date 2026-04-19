# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-19T10:50:50.470Z

## Scenario: Landing page title and core content remain unchanged  
1. Navigate to http://127.0.0.1:5600/  
2. Assert page contains "TestingQA"  
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline"  

## Scenario: Run Tests button is present and clickable  
1. Navigate to http://127.0.0.1:5600/  
2. Click "Run Tests"  
3. Assert page contains "Tests queued successfully."  

## Scenario: Dashboard renders with correct seeded task structure  
1. Navigate to http://127.0.0.1:5600/  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  
4. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"  

## Scenario: Login form heading and content remain correct  
1. Navigate to http://127.0.0.1:5600/  
2. Click "Sign In"  
3. Assert page contains "Sign In"  
4. Assert page does not contain "Simulate a real QA control room."
