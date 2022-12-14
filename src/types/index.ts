// テーブル行
export type TableCardRow = {
    id: any
    cols: any[]
    item: any
}

// 入力フィールド
export type InputField = {
    type: 'text' | 'number' | 'date' | 'select'
    propName: string
    label: string
    value: any
    required: boolean
    options?: NameType[]
}

// 名称マスタタイプ
export type NameType = {
    id: number
    name: string
}

// 獣医タイプ
export type Vet = {
    id: number
    firstName: string
    lastName: string
    specialties: VetSpeciality[],
    new: boolean
}

// 獣医の専門タイプ
export type VetSpeciality = {
    id: number
    name: string
    new: boolean
}

// 訪問タイプ
export type Visit = {
    id?: number
    date?: Date
    description?: string
    visitedTimestamp?: number
    pet?: Pet
    new: boolean
}

// ペットタイプ
export type Pet = {
    id: number
    birthDate: Date
    name: string
    type: PetType
    owner?: Owner
    visits?: Visit[]
    new: boolean
}

// ペット種別タイプ
export type PetType = {
    id: number
    name: string
    new: boolean
}

// オーナータイプ
export type Owner = {
    id: number
    firstName: string
    lastName: string
    address: string
    city: string
    telephone: string
    pets?: Pet[]
    new: boolean
}

// ユーザータイプ
export type User = {
    id?: string
    userId: string
    name: string
    email: string
}
