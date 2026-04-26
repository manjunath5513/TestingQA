# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-26T01:51:20.823Z

## Scenario: Landing page title and core branding remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  

## Scenario: Original "Run Tests" button is present and functional  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  
3. Assert page contains "Tests queued successfully."  

## Scenario: Dashboard renders with correct task data (seeded release gate task)  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  
4. Assert page contains "Review the checkout smoke pack, confirm payment widget telemetry, and prepare the rollback note before the"  

## Scenario: Login view uses correct container ID and preserves original structure  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "Sign In"  
3. Assert page contains `<div class="login-form">` (via DOM inspection if needed, but prefer visible text)  
4. Assert page contains "TestingQA demo target" (eyebrow text from new landing) — *Note: This is ambiguous; prefer asserting original "Sign In" text which was present in original login.js*  

## Scenario: Dashboard renders without broken JSX tags (fix unbalanced tags)  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains at least one task row (e.g., "Audit checkout release gate")  
4. Assert page does not contain visible raw HTML like `</div></div></div>` or mismatched closing tags
