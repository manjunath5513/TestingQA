# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-26T10:34:39.933Z

## Mandatory Test Suite: QA Console Regression Flow

## Scenario: Landing page opens the operations console
1. Navigate to http://127.0.0.1:4173
2. Assert page contains "Simulate a real QA control room."
3. Click "Open operations console"
4. Assert page contains "Sign In"

## Scenario: Sign in and open the task board
1. Navigate to http://127.0.0.1:4173
2. Click "Open operations console"
3. Fill "admin@test.com" into "Email"
4. Fill "admin123" into "Password"
5. Click "Sign In"
6. Assert page contains "Release Command Center"
7. Assert page contains "Audit checkout release gate"

## Scenario: Create a task and review reports
1. Navigate to http://127.0.0.1:4173
2. Click "Open operations console"
3. Fill "admin@test.com" into "Email"
4. Fill "admin123" into "Password"
5. Click "Sign In"
6. Fill "Investigate staging checkout regression" into "Task title"
7. Fill "Capture the checkout flow and confirm the redirect after payment." into "Task description"
8. Click "Create task"
9. Assert page contains "Task created"
10. Click "Release reports"
11. Assert page contains "Regression outlook"
12. Click "Dispatch lab"
13. Assert page contains "Release dispatch actions"
14. Click "Back to task board"
15. Click "Mark complete"
16. Assert page contains "Task completed"

## Scenario: Landing page title and core branding remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  

## Scenario: Original "Run Tests" button is present and clickable  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  

## Scenario: Dashboard renders with correct seeded task data  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  
4. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"  

## Scenario: Login view uses correct container ID `app`  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "Sign In"  
3. Assert element with id="app" exists  

## Scenario: Dashboard renders without broken JSX tags (unbalanced tags fixed)  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page renders without visible layout collapse or missing task rows  
4. Assert page contains at least one task with status badge (e.g., "pending", "in_progress", or "completed")
