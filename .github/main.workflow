workflow "Workflow" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@6309cd9"
  runs = "install"
}

action "Test" {
  uses = "actions/npm@6309cd9"
  runs = "run test:ci"
  needs = ["Install"]
}
