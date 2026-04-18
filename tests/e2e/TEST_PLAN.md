# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-18T04:52:08.471Z

## Scenario: Launch the TestingQA control surface
1. Navigate to http://127.0.0.1:4173
2. Assert page contains "TestingQA"
3. Click "Open operations console"
4. Assert page contains "Sign In"

## Scenario: Sign in with the seeded admin account
1. Navigate to http://127.0.0.1:4173#/login
2. Type "admin@test.com" into "Email"
3. Type "admin123" into "Password"
4. Click "Sign In"
5. Assert page contains "Audit checkout release gate"

## Scenario: Verify the post-login operations view
1. Navigate to http://127.0.0.1:4173#/console
2. Assert page contains "Create work item"
3. Assert page contains "Activity feed"
