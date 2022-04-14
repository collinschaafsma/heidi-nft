export type ClaimJSONResponse = {
  data?: {
    transactionHash: string
  }
  errors?: Array<{ message: string }>
}
