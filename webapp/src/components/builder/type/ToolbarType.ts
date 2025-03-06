export interface AddonType {
	name: string,
	icon: any,
	group: string,
	component?: any,
	classes?:any
}

export interface AddonCategoryType {
	category: string,
	title:string,
	addons: AddonType[]

}

export interface Tool {
	name: string,
	icon: any,
	type:string,
	categories?: AddonCategoryType[]
}

export interface ToolbarType {
	coordinate?: {
		x: number,
		y: number
	},
	tools?: Tool[]
}