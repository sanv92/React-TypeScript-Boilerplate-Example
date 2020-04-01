import React, { ReactElement } from 'react'

type Hook = { [key: string]: Function }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const composeHooks = (hooks: Hook) => (Component) => {
  if (!Component) {
    throw new Error('Component must be provided to compose')
  }

  if (!hooks) {
    return Component
  }

  return (properties: JSX.IntrinsicAttributes): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const hooksObject = typeof hooks === 'function' ? hooks(properties) : hooks

    // Flatten values from all hooks to a single object
    const hooksProperties = Object.entries(hooksObject).reduce(
      (accumulator, [hookKey, hook]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        let hookValue = hook()

        if (Array.isArray(hookValue) || typeof hookValue !== 'object') {
          hookValue = { [hookKey]: hookValue }
        }

        Object.entries(hookValue).forEach(([key, value]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const duplicate = accumulator[key] ? value : properties[key]

          if (typeof duplicate !== 'undefined') {
            // eslint-disable-next-line no-console
            console.warn(
              `prop '${key}' exists, overriding with value: '${duplicate}'`,
            )
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          accumulator[key] = value
        })

        return accumulator
      },
      {},
    )

    return <Component {...hooksProperties} {...properties} />
  }
}
