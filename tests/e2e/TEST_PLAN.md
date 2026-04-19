# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-19T11:15:18.335Z

## Scenario: Landing page title and core content remain unchanged  
1. Navigate to http://127.0.0.1:6000/  
2. Assert page contains "TestingQA"  
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline"  

## Scenario: Run Tests button is present and clickable  
1. Navigate to http://127.0.0.1:6000/  
2. Click "Run Tests"  
3. Assert page contains "Tests queued successfully."  

## Scenario: Login form renders with correct heading and content  
1. Navigate to http://127.0.0.1:6000/  
2. Click "Open operations console"  
3. Assert page contains "Sign In"  
4. Assert page contains "TestingQA demo target"  

## Scenario: Dashboard renders with seeded tasks correctly  
1. Navigate to http://127.0.0.1:6000/  
2. Click "Open operations console"  
3. Click "Sign In" (using seeded credentials if visible)  
4. Assert page contains "Audit checkout release gate"  
5. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"
