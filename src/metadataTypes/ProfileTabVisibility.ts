type Visibility = "DefaultOff" | "DefaultOn" | "Hidden"
export default interface ProfileTabVisibility {
	tab: string[]
	visibility: Visibility[]
}
