# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-17T04:11:56.950Z

## Scenario: Landing page title and core content remain unchanged
1. Navigate to http://localhost:5173
2. Assert page contains "TestingQA"
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline"

## Scenario: Run Tests button is present and clickable
1. Navigate to http://localhost:5173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: Dashboard renders with correct structure after login
1. Navigate to http://localhost:5173
2. Click "Open operations console"
3. Assert page contains "Simulate a real QA control room."
4. Assert page contains "Audit checkout release gate"

## Scenario: Login form renders with correct heading and container
1. Navigate to http://localhost:5173
2. Click "Sign In"
3. Assert page contains "Sign In"
4. Assert element with id "app" exists

## Scenario: Task board displays seeded tasks correctly
1. Navigate to http://localhost:5173
2. Click "Open operations console"
3. Assert page contains "Audit checkout release gate"
4. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the release"
