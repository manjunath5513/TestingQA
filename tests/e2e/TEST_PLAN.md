# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-18T15:06:00.873Z

## Scenario: Verify landing page title and content

1. Navigate to `/`
2. Assert page contains "TestingQA"
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline."
4. Assert page contains "Run Tests"
5. Assert page contains "System ready. No tests running."

## Scenario: Verify login form heading and content

1. Navigate to `/login`
2. Assert page contains "Sign In"
3. Assert page contains "TestingQA demo target"

## Scenario: Verify dashboard renders correctly

1. Navigate to `/dashboard`
2. Assert page contains the expected dashboard structure and content based on the ORIGINAL `src/views/dashboard.js` logic

## Scenario: Verify operations console button is present and clickable

1. Navigate to `/`
2. Assert page contains "Simulate a real QA control room."
3. Click "Open operations console"
4. Assert operations console opens correctly

## Scenario: Verify run tests button is present and clickable

1. Navigate to `/`
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."
