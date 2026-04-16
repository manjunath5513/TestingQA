# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-16T08:40:51.255Z

## Scenario: Landing page loads with correct title and heading
1. Navigate to http://127.0.0.1:4173
2. Assert page contains "TestingQA"

## Scenario: Landing page displays expected descriptive paragraph
1. Navigate to http://127.0.0.1:4173
2. Assert page contains "A sample application for validating SentinelQA automated testing pipeline. This page serves as the test target for end-to-end browser tests."

## Scenario: Run Tests button is present and functional
1. Navigate to http://127.0.0.1:4173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: System status message is initially correct
1. Navigate to http://127.0.0.1:4173
2. Assert page contains "System ready. No tests running."

## Scenario: Authentication page route is accessible and contains login form
1. Navigate to http://127.0.0.1:4173/auth
2. Assert page contains "a login form"
