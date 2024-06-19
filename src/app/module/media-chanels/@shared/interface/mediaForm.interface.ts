export interface MediaFormInterface {
  id: string
  name: string
  link: string
  subscribe: number
  payout: 'CPM' |'CPH'
  stream: number
  price: number
  vip: boolean
}