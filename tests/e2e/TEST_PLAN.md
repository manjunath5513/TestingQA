# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-26T10:29:52.669Z

## Scenario: Verify landing page title and content

1. Navigate to `/`
2. Assert page contains "TestingQA"
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline."
4. Assert page contains "Run Tests" button
5. Assert page contains "System ready. No tests running." status message

## Scenario: Verify dashboard renders correctly

1. Navigate to `/dashboard`
2. Assert page contains "Dashboard Overview" heading
3. Assert page does not have any broken JSX tags or unbalanced HTML elements

## Scenario: Verify login view container ID

1. Navigate to `/login`
2. Assert page uses `output` as the container ID for the login form

## Scenario: Verify "Run Tests" button functionality

1. Navigate to `/`
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully." status message

## Scenario: Verify operations console opening from landing page

1. Navigate to `/`
2. Assert page contains "Simulate a real QA control room."
3. Click "Open operations console"
4. Assert navigation to the operations console route (e.g., `/operations`)
