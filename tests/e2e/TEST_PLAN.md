# MindFlayer — Auto-Generated Test Plan

> Generated on 2026-04-18T04:20:38.097Z

## Scenario: Landing page title and core branding remain unchanged  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "TestingQA"  

## Scenario: Original "Run Tests" button functionality is preserved  
1. Navigate to http://127.0.0.1:4173  
2. Click "Run Tests"  

## Scenario: Dashboard renders with correct task data (seed tasks intact)  
1. Navigate to http://127.0.0.1:4173  
2. Click "Open operations console"  
3. Assert page contains "Audit checkout release gate"  

## Scenario: Login view renders with correct structure and target element  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains "Sign In"  

## Scenario: HTML structure uses correct root container ID  
1. Navigate to http://127.0.0.1:4173  
2. Assert page contains `<div id="app"`
