```
const path = require('path');
```

path.sep 

* <string>

提供平台特有的路径片段分隔符：

* Windows 上的 \。
* POSIX 上是 / 。

例如,在POSIX上：

```
'foo/bar/baz'.split(path.sep);//['foo','bar','baz']
```

例如，Windows上：

```
'foo\\bar\\baz'.split(path.sep);//['foo','bar','baz']
```

在 Windows 上，正斜杠（`/`）和反斜杠（`\`）都被接受为路径片段分隔符。 但是， `path` 方法只添加反斜杠（`\`）。