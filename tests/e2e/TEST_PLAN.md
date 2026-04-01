# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-01T16:46:35.400Z

## Scenario: Verify landing page renders with correct title and heading
1. Navigate to http://localhost:5173
2. Assert page contains "TestingQA"
3. Assert page contains "A sample application for validating SentinelQA automated testing pipeline. This page serves as the test target for end-to-end browser tests."

## Scenario: Verify Run Tests button exists and is clickable
1. Navigate to http://localhost:5173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: Verify system status message is initially correct
1. Navigate to http://localhost:5173
2. Assert page contains "System ready. No tests running."
