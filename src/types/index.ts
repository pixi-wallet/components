export interface WalletContent2020 {
    "@context"?: string | string[]
    id: string
    type: string[] | string
    name: string
    image?: string
    description?: string
    tags?: [string]
    controller?: string
    correlation?: string[]
    [name: string]: any
}

export interface QueryContent2020 {
    type: string
    credentialQuery: any
}