workflow "Workflow" {
  on = "push"
  resolves = ["Test"]
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
