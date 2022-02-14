In order for this to work the way I _really_ want parsing is required; which would mean passing some input script to a parsing stage and then operating on that... not that the end of the world but in that case I might as well use another language; or at least it's not interesting to me

The other options would be, https://github.com/tc39/proposal-pipeline-operator/issues/84 which muddies up the syntax I want, it would have to look like:

```javascript
const x = sh.ls('something') |> sh.grep(#, 'args')
```

Which doesn't feel or look like what I want (which is something that looks more like command line usage)

If using the f# proposal the passing of the reference can be omitted as long as functions are always returned, but then we would shift the syntax burden to calling the returned function at the end:
```javascript
const x = sh.ls('/path') |> sh.grep('args')()
```

Not the worst, especically if it returns a promise, it could be 
```javascript
const x = await sh() |> sh () |> sh()()
```

Not sure how the streaming would work, my first thought is that some big object would have to be built up using closures or something and then when finally called it could all be executed?...this one is a head sracther and I'm not sure it's possible or at least possible in away that's maintainble

I think ultimatley the way to get this to play nice with streams/ promises is to either 

a) encapsulate the whole thing as an object and self reference (chain) methods so that there's a clear hiearachy of commands
b) let the user handle the piping

```javascript
// a could look lik

const x = sh.ls('/path').grep().other().foo()

// b would be like 

require('stream/pipeline')

const x = await pipeline(
  sh.ls('/path'),
  sh.grep(),
  ...
)
```

That last one isn't too bad, seems like the easiest one to maintain



-----------

shell scripting via javascript

<sub>ssvjs pronouced "savage"</sub>


`idea.js` is the basic idea

