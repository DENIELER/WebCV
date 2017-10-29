# My web CV

To build project:

```
yanr build
```

Sometimes on MacOS, during the build, it is throwing `Unexpected token` error from `gulp-ng-annotate`, to resolve it run:

```
rm -rf ./.tmp/
rm -rf ./dist/
```

and try again.
