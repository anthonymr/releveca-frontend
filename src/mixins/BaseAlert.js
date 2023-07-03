function clearAlerts() {
  if(this.errors) this.errors = [];
  if(this.infos) this.infos = [];
  if(this.warnings) this.warnings = [];
  if(this.oks) this.oks = [];
}

export { clearAlerts };