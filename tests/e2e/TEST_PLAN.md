# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-17T10:24:50.220Z

## Scenario: Landing Page Displays Correct Title and Heading
1. Navigate to http://localhost:5173
2. Assert page contains "TestingQA"

## Scenario: Landing Page Includes Expected Descriptive Paragraph
1. Navigate to http://localhost:5173
2. Assert page contains "A sample application for validating SentinelQA automated testing pipeline. This page serves as the test target for end-to-end browser tests."

## Scenario: Run Tests Button is Present and Functional
1. Navigate to http://localhost:5173
2. Click "Run Tests"
3. Assert page contains "Tests queued successfully."

## Scenario: System Status Message is Initially Correct
1. Navigate to http://localhost:5173
2. Assert page contains "System ready. No tests running."

## Scenario: Authentication Page Contains Login Form
1. Navigate to http://localhost:5173/auth
2. Assert page contains "a login form"
