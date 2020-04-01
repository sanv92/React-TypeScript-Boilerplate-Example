const enzyme = require('enzyme')
const React16Adapter = require('enzyme-adapter-react-16')
const { cleanup } = require('@testing-library/react')

require('jest-styled-components')
require('regenerator-runtime/runtime')

afterEach(cleanup)

enzyme.configure({
  adapter: new React16Adapter(),
  disableLifecycleMethods: true,
})
