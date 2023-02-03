export interface listItemInterface {
    image: string,
    id: string,
    content: string,
    address: string,
    title: string
}

export interface listInterface {
    meetups: Array<listItemInterface>
}