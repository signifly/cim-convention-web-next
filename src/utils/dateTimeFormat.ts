export class dtf {
  date: Date

  constructor(date: string) {
    this.date = new Date(date)
  }

  getDay() {
    return this.date.toLocaleDateString('en-US', {
      weekday: 'long',
      timeZone: 'UTC',
    })
  }
  getMonth() {
    return this.date.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC',
    })
  }
  getDate() {
    return this.date.toLocaleDateString('en-US', {
      day: 'numeric',
      timeZone: 'UTC',
    })
  }
}
