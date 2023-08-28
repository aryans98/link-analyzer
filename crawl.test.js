const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL protocol', () => {
  const input = 'https://aryan-sindhav.netlify.app/path'
  const actual = normalizeURL(input)
  const expected = 'aryan-sindhav.netlify.app/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://aryan-sindhav.netlify.app/path/'
  const actual = normalizeURL(input)
  const expected = 'aryan-sindhav.netlify.app/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://Aryan-sindhav.netlify.app/path'
  const actual = normalizeURL(input)
  const expected = 'aryan-sindhav.netlify.app/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://Aryan-sindhav.netlify.app/path'
  const actual = normalizeURL(input)
  const expected = 'aryan-sindhav.netlify.app/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://aryan-sindhav.netlify.app'
  const inputBody = '<html><body><a href="https://aryan-sindhav.netlify.app"><span>Aryan-sindhav.netlify.app></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://aryan-sindhav.netlify.app/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://aryan-sindhav.netlify.app'
  const inputBody = '<html><body><a href="/path/one"><span>Aryan-sindhav.netlify.app></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://aryan-sindhav.netlify.app/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://aryan-sindhav.netlify.app'
  const inputBody = '<html><body><a href="/path/one"><span>Aryan-sindhav.netlify.app></span></a><a href="https://other.com/path/one"><span>Aryan-sindhav.netlify.app></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://aryan-sindhav.netlify.app/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://aryan-sindhav.netlify.app'
  const inputBody = '<html><body><a href="path/one"><span>Aryan-sindhav.netlify.app></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
