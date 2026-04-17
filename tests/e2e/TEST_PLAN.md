# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-17T09:51:46.679Z

## Scenario: Landing page title and core content remain unchanged
1. Navigate to http://localhost:5173
2. Assert page contains "TestingQA"

## Scenario: Run Tests button works as expected
1. Navigate to http://localhost:5173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: Dashboard renders with correct structure and seeded tasks
1. Navigate to http://localhost:5173
2. Click "Open operations console"
3. Assert page contains "Audit checkout release gate"
4. Assert page contains "Simulate a real QA control room."

## Scenario: Login form renders with correct heading and structure
1. Navigate to http://localhost:5173
2. Click "Sign In"
3. Assert page contains "Sign In"
