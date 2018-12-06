workflow "Workflow" {
  on = "push"
  resolves = [
    "Test",
    "Lint",
  ]
}

action "Install" {
  uses = "docker://cypress/browsers:chrome69"
  runs = "npm"
  args = "install"
}

action "Test" {
  uses = "docker://cypress/browsers:chrome69"
  needs = ["Install"]
  args = "run test:ci"
  runs = "npm"
}

action "Lint" {
  uses = "docker://cypress/browsers:chrome69"
  needs = ["Install"]
  runs = "npm"
  args = "run lint"
}
