workflow "Workflow" {
  on = "push"
  resolves = [
    "Test:Unit",
    "Test:E2E",
    "Lint",
  ]
}

action "Install" {
  uses = "docker://cypress/browsers:chrome69"
  runs = "npm"
  args = "install"
}

action "Test:E2E" {
  uses = "docker://cypress/browsers:chrome69"
  needs = ["Install"]
  args = "run test:ci"
  runs = "npm"
}

action "Test:Unit" {
  uses = "docker://cypress/browsers:chrome69"
  needs = ["Install"]
  args = "run test:unit"
  runs = "npm"
}

action "Lint" {
  uses = "docker://cypress/browsers:chrome69"
  needs = ["Install"]
  runs = "npm"
  args = "run lint"
}
