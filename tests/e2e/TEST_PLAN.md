# SentinelQA — Auto-Generated Test Plan

> Generated on 2026-04-02T09:17:04.751Z

## Scenario: Verify Architecture page renders correctly

1. Navigate to http://localhost:5173/architecture
2. Assert page contains "Architecture — MindFlayer"
3. Assert page contains "Auto-generated architecture diagram"

## Scenario: Verify Explorer page renders correctly

1. Navigate to http://localhost:5173/explorer
2. Assert page contains "Explorer — MindFlayer"
3. Assert page contains "Interactive dependency graph with comments and code snippets"

## Scenario: Verify Hotspots page renders correctly

1. Navigate to http://localhost:5173/hotspots
2. Assert page contains "Hotspots — MindFlayer"
3. Assert page contains "Git change frequency heatmap"

## Scenario: Verify File Tree page renders correctly

1. Navigate to http://localhost:5173/tree
2. Assert page contains "File Tree — MindFlayer"
3. Assert page contains "Hierarchical codebase file tree with comments and code snippets"

## Scenario: Verify API routes are functional

1. Navigate to http://localhost:5173/api/agent/axon/architecture
2. Assert response status is 200
3. Navigate to http://localhost:5173/api/agent/axon/graph
4. Assert response status is 200
5. Navigate to http://localhost:5173/api/agent/axon/tree
6. Assert response status is 200
7. Navigate to http://localhost:5173/api/agent/hotspots
8. Assert response status is 200
