workflow "Workflow" {
  on = "push"
  resolves = [
    "docker://cypress/browsers:chrome69",
  ]
}

action "docker://cypress/browsers:chrome69" {
  uses = "docker://cypress/browsers:chrome69"
  runs = "npm"
  args = "run test:ci"
}
