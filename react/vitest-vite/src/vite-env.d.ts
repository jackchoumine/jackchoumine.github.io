/// <reference types="vite/client" />
import { Assertion } from 'vitest'

declare module 'vitest' {
  interface Assertion {
    toBeNullish(): void
    toBePaginationRes(): void
  }
}
