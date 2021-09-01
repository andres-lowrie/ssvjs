#!/usr/bin/env node

const handler = {
  get (_, cmd, _) {
    return (...args) => {
      console.log(`exec '${prop}' with the args '${args}'`)
    }
  }
}

// expose this
const proxy = new Proxy({}, handler)

// use like this
sh = proxy

// use f# pipes to complete the shell scripting circle
const x =
  sh.ls('-la', 'path/somewhere/')
  |> (_, sh.grep('-irg', 'stuff', _))
  |> (_, sh.grep('-v', 'morethings', _))

// get rid of syntax noise like this
sh = sh.usingPartials()

const y =
  sh.ls('-al', 'path/to/somwhere')()
  |> sh.grep('irg', 'stuff')
  |> sh.grep('-v', 'morething')

console.log(y)

// perhaps, a straight shell integreation like this?
const [cmd, ...args] = process.argv.slice(2)
out = proxy[cmd](...args)

// perhaps configurable to consolidate nosie in one place ?
const sh = mkSh({
  streaming: true, // when set to false, use blocking shell out
  useEnv: true
})

// easy to test shell scripts without doing weird shit?
const sh = mkSh({}, (runner = (...args) => noop))

// Output is what is expected
const OutputShape = {
  raw: {
    stdout,
    stderr,
    status,
  },
  // but has some niceities that allow for more modern feel
  out,
  err,
  ok,
  failed,
}

// which then allows for things like 
//
if (sh.stat('some/file/that/may/or/maynot/exist').ok) {
  // do something knowing that it's there
}

// and the output can always be parsed into something that's not a string?
JSON.parse(sh.grep('-i', {E: `\.txt$`}).out)
