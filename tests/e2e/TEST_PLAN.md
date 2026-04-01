# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-01T16:30:10.831Z

## Scenario: Landing page displays correct title and heading
1. Navigate to http://localhost:5173
2. Assert page contains "TestingQA"

## Scenario: Landing page includes expected descriptive paragraph
1. Navigate to http://localhost:5173
2. Assert page contains "A sample application for validating SentinelQA automated testing pipeline. This page serves as the test target for end-to-end browser tests."

## Scenario: Run Tests button is present and functional
1. Navigate to http://localhost:5173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: System status message is initially correct
1. Navigate to http://localhost:5173
2. Assert page contains "System ready. No tests running."
