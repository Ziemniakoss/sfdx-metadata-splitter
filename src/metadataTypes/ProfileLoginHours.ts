type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
export default interface ProfileLoginHours {
	weekdayStart: Weekday[]
	weekdayEnd: Weekday[]

}
