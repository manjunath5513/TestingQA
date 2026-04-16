# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-16T10:10:01.533Z

## Scenario: Landing page title and core content remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline"  

## Scenario: Run Tests button is present and clickable  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  
3. Assert page contains "Tests queued successfully."  

## Scenario: Dashboard route renders with correct structure and original task data  
1. Navigate to http://127.0.0.1:4173/#/dashboard  
2. Assert page contains "Audit checkout release gate"  
3. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"  

## Scenario: Login view renders with original heading and structure  
1. Navigate to http://127.0.0.1:4173/#/login  
2. Assert page contains "Sign In"  
3. Assert page contains `<div class="login-form">` (via DOM inspection or fallback text match)  

## Scenario: Router preserves original root path behavior  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "System ready. No tests running."
