
format:
	./node_modules/.bin/prettier --write **/*.ts

format-check:
	./node_modules/.bin/prettier --check **/*.ts

build:
	eslint src/**/*.ts
	./node_modules/.bin/tsc -p .

package:
	./node_modules/.bin/ncc build --source-map --license licenses.txt